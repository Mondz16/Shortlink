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

const CHART_COLORS = ["#9333EA", "#C084FC", "#818CF8", "#6D28D9"];

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
      <nav className="app-nav">
        <div className="flex items-center gap-2.5">
          <div
            className="feature-icon"
            style={{ width: '30px', height: '30px', borderRadius: '8px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>Link analytics</span>
        </div>
        <Link
          to="/dashboard"
          className="btn btn-ghost btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Dashboard
        </Link>
      </nav>

      <main className="flex flex-1 flex-col items-center px-4 py-10">
        <div className="fade-in-up w-full max-w-3xl">

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <span className="spinner" style={{ width: '24px', height: '24px' }} />
            </div>
          )}

          {error && (
            <div
              className="rounded-lg px-4 py-3 text-sm"
              style={{ background: 'var(--error-bg)', color: 'var(--error)' }}
            >
              {error}
            </div>
          )}

          {!isLoading && !error && stats && (
            stats.total === 0 ? (
              <div className="card flex flex-col items-center gap-3 py-16 text-center" style={{ borderStyle: 'dashed' }}>
                <div className="feature-icon" style={{ opacity: 0.5 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>No clicks yet</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                    Share your short link to start tracking clicks.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">

                {/* Total clicks — gradient card */}
                <div className="stat-card-accent scale-in p-6">
                  <p style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Total clicks
                  </p>
                  <p style={{ fontSize: '48px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    {stats.total.toLocaleString()}
                  </p>
                </div>

                {/* Clicks over time */}
                <section className="card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                  <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
                    Clicks over time
                  </h2>
                  <div style={{ height: '220px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats.byDay}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis
                          dataKey="day"
                          tickFormatter={formatDay}
                          fontSize={11}
                          tick={{ fill: 'var(--text-tertiary)' }}
                          axisLine={{ stroke: 'var(--border)' }}
                          tickLine={false}
                        />
                        <YAxis
                          allowDecimals={false}
                          fontSize={11}
                          tick={{ fill: 'var(--text-tertiary)' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          labelFormatter={(label) => formatDay(label as string)}
                          contentStyle={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: 'var(--text)',
                            boxShadow: 'var(--shadow-md)',
                          }}
                          itemStyle={{ color: 'var(--accent)' }}
                          cursor={{ stroke: 'var(--accent)', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="var(--accent)"
                          strokeWidth={2.5}
                          dot={false}
                          activeDot={{ r: 4, fill: 'var(--accent)', stroke: 'var(--surface)', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                {/* Referrers + Devices */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                  {/* Top referrers */}
                  <section className="card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                      Top referrers
                    </h2>
                    {stats.topReferrers.length === 0 ? (
                      <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                        No referrer data yet.
                      </p>
                    ) : (
                      <ul className="flex flex-col gap-2.5">
                        {stats.topReferrers.map((row) => (
                          <li
                            key={row.referrer ?? "direct"}
                            className="flex items-center justify-between gap-3"
                          >
                            <span
                              className="truncate"
                              style={{ fontSize: '13px', color: 'var(--text-secondary)' }}
                            >
                              {row.referrer ?? "Direct / unknown"}
                            </span>
                            <span
                              className="chip"
                              style={{ fontFamily: 'var(--font-mono)', flexShrink: 0 }}
                            >
                              {row.count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>

                  {/* Device breakdown */}
                  <section className="card p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px' }}>
                      Device breakdown
                    </h2>
                    <div style={{ height: '200px', width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stats.deviceBreakdown}
                            dataKey="count"
                            nameKey="device_type"
                            outerRadius={75}
                            innerRadius={36}
                            paddingAngle={3}
                            label={({ payload }) =>
                              `${(payload as { device_type: string; count: number }).device_type} (${(payload as { device_type: string; count: number }).count})`
                            }
                            labelLine={{ stroke: 'var(--text-tertiary)' }}
                          >
                            {stats.deviceBreakdown.map((entry, index) => (
                              <Cell
                                key={entry.device_type}
                                fill={CHART_COLORS[index % CHART_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              background: 'var(--surface)',
                              border: '1px solid var(--border)',
                              borderRadius: '8px',
                              fontSize: '12px',
                              color: 'var(--text)',
                              boxShadow: 'var(--shadow-md)',
                            }}
                          />
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
