import express from 'express';
import { accessLink, deleteShortenLink, getAllUserLinks, getLinkStats, shortenURL } from '../controllers/linkController.js';
import { requireAuth } from '../middleware/auth.js';
import { createLinkLimiter } from '../middleware/rateLimiter.js';

const linkRoutes = express.Router();

linkRoutes.post('/api/link', requireAuth, createLinkLimiter, shortenURL);
linkRoutes.get('/:link', accessLink);
linkRoutes.get('/api/link', requireAuth, getAllUserLinks)
linkRoutes.get('/api/link/:id/stats', requireAuth, getLinkStats);
linkRoutes.delete('/api/link/:id', requireAuth, deleteShortenLink);

export default linkRoutes;``