import { asyncHandler } from "../utils/asyncHandler.js";
import toBase64 from "../utils/shortcode.js"
import IsValidURL from "../utils/validateUrl.js";
import { ApiResponse } from "../utils/apiResponse.js";
import client from "../db.js";
import { UAParser } from "ua-parser-js";
import cache from "../utils/cache.js";

const BASE_URL = "https://https://shortlink-production-0995.up.railway.app";

const shortenURL = asyncHandler(async (req, res) => {
    const { link } = req.body;
    if (!IsValidURL(link)) {
      res.status(400).json(new ApiResponse(false, "invalid url"));
      return;
    }

    const selectQuery = "SELECT * from links";
    const selectResults = await client.query(selectQuery);
    var newUrl = toBase64(1000 + selectResults.rowCount);

    const query = `INSERT INTO links (user_id, short_code, original_url) VALUES ($1 , $2, $3)`;
    await client.query(query, [req.user.id,newUrl, link]);

    res
      .status(201)
      .json(
        new ApiResponse(true, "Created shorted link", {
          originalUrl: link,
          updated: `${BASE_URL}/${newUrl}`,
        }),
      );
});

function logClick(linkId, req){
    const referrer = req.headers['referer'];
    let ua = UAParser(req.headers['user-agent']);

    const insertQuery = 'INSERT INTO clicks (link_id, referrer, device_type) VALUEs ($1, $2, $3)';
    client.query(insertQuery, [linkId, referrer, ua.device.type ?? 'desktop']).catch(err => console.error('click insert failed:', err.message));

}

const accessLink = asyncHandler(async (req, res) => {
    const { link } = req.params;
    const cacheKey = `link:${link}`;

    const cached = await cache.get(cacheKey);
    if(cached){
      const { id, original_url} = JSON.parse(cached);
      logClick(id, req);
      console.log(`Found cached!`);
      return res.redirect(original_url);
    }

    const query = `SELECT id,original_url from links WHERE short_code = $1 AND is_active = true`;
    const result = await client.query(query, [link]);

    if (result.rowCount == 0) {
      return res.status(404).json(new ApiResponse(false, "invalid url"));
    }
    
    const row = result.rows[0];
    await cache.set(cacheKey, JSON.stringify(row), "EX",3600)

    logClick(row.id, req);
    res.redirect(result.rows[0].original_url);
});
 
const getAllUserLinks = asyncHandler(async (req, res) => {
    const user_id = req.user.id;

    const query = 'SELECT * FROM links WHERE user_id= $1';
    const result = await client.query(query, [user_id]);
    if(result.rowCount == 0){
      res.status(404).json(new ApiResponse(false, "no url found"));
      return;
    }

    res.status(200).json(new ApiResponse(true, "Fetch All URL", {links: result.rows}))
})

const deleteShortenLink = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;

    const linkResult = await client.query('SELECT short_code FROM links WHERE id = $1 AND user_id = $2',[id, user_id]);

    const query = `DELETE from links WHERE user_id = $1 and id=$2`
    const result = await client.query(query, [user_id, id]);

    if(linkResult.rowCount > 0){
      await Promise.all([
        cache.del(`link:${linkResult.rows[0].short_code}`),
        cache.del(`stats:${id}`)
      ]);
    }
    
    res.status(201).json(new ApiResponse(true, "Deleted successfully!", {result: result}))
})

const getLinkStats = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id;
  const cacheKey = `stats:${id}`;

  const cached = await cache.get(cacheKey);
  if(cached){
    return res.status(200).json(new ApiResponse(true, 'Found link stats data!', JSON.parse(cached)));
  }

  const checkOwnerQuery = 'SELECT id FROM links WHERE id = $1 AND user_id = $2';
  const checkOwnerResult = await client.query(checkOwnerQuery, [id, user_id]);

  if(checkOwnerResult.rowCount == 0){
      res.status(404).json(new ApiResponse(false, "no data found"));
      return;
  };

 const result = await Promise.all([
    client.query('SELECT COUNT(*) AS total FROM clicks WHERE link_id=$1', [id]),
    client.query(`SELECT date_trunc('day', clicked_at) AS day, COUNT (*) AS count FROM clicks WHERE link_id= $1 GROUP BY day ORDER BY day`, [id]),
    client.query(`SELECT referrer, COUNT(*) AS count FROM clicks WHERE link_id=$1 GROUP BY referrer ORDER BY count DESC LIMIT 5`, [id]),
    client.query(`SELECT device_type, COUNT(*) AS count FROM clicks WHERE link_id=$1 GROUP BY device_type`,[id])
  ]);

  const data = {
    total: parseInt(result[0].rows[0].total, 10),
    byDay: result[1].rows,
    topReferrers: result[2].rows,
    deviceBreakdown: result[3].rows,
  }

  await cache.set(cacheKey, JSON.stringify(data), "EX", 300)
  res.status(200).json(new ApiResponse(true, "Found link stats data!", data))
})

export {
  shortenURL,
  accessLink,
  getAllUserLinks,
  deleteShortenLink,
  getLinkStats
};