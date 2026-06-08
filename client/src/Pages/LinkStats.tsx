import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getLinkStats, type LinkStats as LinkStatsData } from "../api";

const DEVICE_COLORS = ["#9333ea", "#c084fc", "#e9d5ff", "#6b21a8"];

function formatDay(value: string | number | undefined) {
  if (value == null) return "";
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function LinkStats() {
  const { id } = useParams<{ id: string }>();
  const [stats, setStats] = useState<LinkStatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    getLinkStats(Number(id))
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "An error occurred");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">Link analytics</span>
        <Link
          to="/dashboard"
          className="text-sm font-medium text-purple-600 transition hover:underline dark:text-purple-400"
        >
          Back to dashboard
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center gap-8 px-4 py-12">
        <div className="w-full max-w-3xl">
          {isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading stats...</p>}

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          {!isLoading && !error && stats && (
            stats.total === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white px-4 py-12 text-center dark:border-gray-700 dark:bg-gray-900">
                <p className="text-sm text-gray-500 dark:text-gray-400">No clicks yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="rounded-lg border border-gray-200 bg-white px-6 py-5 dark:border-gray-700 dark:bg-gray-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total clicks</p>
                  <p className="text-3xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
                </div>

                <section className="rounded-lg border border-gray-200 bg-white px-6 py-5 dark:border-gray-700 dark:bg-gray-900">
                  <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Clicks over time</h2>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats.byDay}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                        <XAxis dataKey="day" tickFormatter={formatDay} fontSize={12} />
                        <YAxis allowDecimals={false} fontSize={12} />
                        <Tooltip labelFormatter={(label) => formatDay(label as string)} />
                        <Line type="monotone" dataKey="count" stroke="#9333ea" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <section className="rounded-lg border border-gray-200 bg-white px-6 py-5 dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Top referrers</h2>
                    {stats.topReferrers.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No referrer data yet.</p>
                    ) : (
                      <ul className="flex flex-col gap-2">
                        {stats.topReferrers.map((row) => (
                          <li
                            key={row.referrer ?? "direct"}
                            className="flex items-center justify-between gap-3 text-sm"
                          >
                            <span className="truncate text-gray-700 dark:text-gray-300">
                              {row.referrer ?? "Direct / unknown"}
                            </span>
                            <span className="shrink-0 font-medium text-gray-900 dark:text-white">{row.count}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>

                  <section className="rounded-lg border border-gray-200 bg-white px-6 py-5 dark:border-gray-700 dark:bg-gray-900">
                    <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Device breakdown</h2>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stats.deviceBreakdown}
                            dataKey="count"
                            nameKey="device_type"
                            outerRadius={80}
                            label={({ payload }) => `${payload.device_type} (${payload.count})`}
                          >
                            {stats.deviceBreakdown.map((entry, index) => (
                              <Cell key={entry.device_type} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </section>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
