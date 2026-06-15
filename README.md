<div align="center">

# 🔗 Shortlink

**Turn long, unwieldy URLs into clean, shareable links — with real-time click analytics.**

A full-stack URL shortener with user authentication, a link management dashboard, and per-link analytics (device type, referrer, click history).

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=flat-square)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white&style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white&style=flat-square)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white&style=flat-square)

![Shortlink landing page](docs/screenshot-landing.png)

</div>

---

## ✨ Features

- **Instant link shortening** — paste any URL and get a clean short link in milliseconds
- **Click analytics** — track every click by device type, referrer, and time
- **User dashboard** — manage, view, and organize all your shortened links in one place
- **Authentication** — secure sign up / sign in powered by Supabase Auth
- **Fast redirects** — Redis-cached link resolution for near-instant redirects
- **Rate limiting** — built-in API protection against abuse

## 🛠️ Tech Stack

### Frontend (`client/`)
| Tech | Purpose |
|------|---------|
| **React 19** + **TypeScript** | UI framework |
| **Vite 8** | Build tooling (with Rolldown + React Compiler) |
| **Tailwind CSS v4** | Styling |
| **React Router v7** | Client-side routing |
| **Recharts** | Analytics charts |
| **Axios** | API requests |
| **Supabase JS** | Authentication |

### Backend (`server/`)
| Tech | Purpose |
|------|---------|
| **Node.js** + **Express 5** | REST API |
| **PostgreSQL** (via `pg`), hosted on **Supabase** | Primary database |
| **Supabase Auth** | User/session management |
| **Redis** (via `ioredis`) | Link-resolution caching |
| **express-rate-limit** | API rate limiting |
| **ua-parser-js** | Device/click analytics |

## 📁 Project Structure

```
client/   React + Vite frontend
server/
  controllers/   Request handlers (link shortening, redirects, stats)
  routes/        Express route definitions
  middleware/     Auth (Supabase) and rate limiting
  utils/          Shortcode generation, caching, validation, API responses
  db.js           Postgres (Supabase) connection
