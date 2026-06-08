import axios from "axios";
import { supabase } from "./supabase";

export async function shortenLinkUrl(url: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/link`,
    { link: url },
    {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    },
  );

  return response.data;
}

export type UserLink = {
  id: number;
  user_id: string;
  short_code: string;
  original_url: string;
  is_active: boolean;
};

export async function getUserLinks(): Promise<UserLink[]> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/link`, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    return response.data.data.links;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return [];
    }
    throw err;
  }
}

export type ClicksByDay = {
  day: string;
  count: string;
};

export type ReferrerCount = {
  referrer: string | null;
  count: string;
};

export type DeviceCount = {
  device_type: string;
  count: string;
};

export type LinkStats = {
  total: number;
  byDay: ClicksByDay[];
  topReferrers: ReferrerCount[];
  deviceBreakdown: DeviceCount[];
};

export async function getLinkStats(id: number): Promise<LinkStats> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/link/${id}/stats`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  return response.data.data;
}

export async function deleteLink(id: number) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/link/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  return response.data;
}
