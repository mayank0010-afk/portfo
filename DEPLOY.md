# Publishing Mayank Sahani's Portfolio as a Public Website

This project is already a standalone Vite + React + TypeScript website pre-configured for **Vercel** (`vercel.json`) and **Netlify** (`netlify.toml`). Anyone in the world will be able to open it via your live URL.

---

## Option A — Publish on Vercel (Recommended, ~2 minutes)

1. **Export or Push to GitHub**
   - Download the project files (or export directly to GitHub) and push them to a repository under your GitHub account (for example, `https://github.com/mayank0010-afk/portfolio`).
2. **Import into Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub.
   - Click **Add New → Project** and select your portfolio repository.
   - Vercel automatically detects Vite and reads `vercel.json`:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
3. **Click Deploy**
   - Within ~60 seconds, Vercel gives you a live HTTPS public link such as `https://mayank-sahani.vercel.app`.
   - Every future `git push` automatically rebuilds and updates your live site.

> **CLI alternative (optional):** Run `npm install && npx vercel --prod` locally from the project folder.

---

## Option B — Publish on Netlify (GitHub or Instant Drag-and-Drop)

### Via GitHub Auto-Deploy
1. Push your project to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Pick your repository — Netlify automatically reads `netlify.toml` (`npm run build` → `dist`) and publishes your live HTTPS URL (for example, `https://mayanksahani.netlify.app`).

### Via Instant Drag-and-Drop (No Git Needed)
1. Run `npm install && npm run build` locally in the project folder.
2. Open [app.netlify.com/drop](https://app.netlify.com/drop) and drag the generated `dist/` folder directly onto the page.

---

## Connecting a Custom Domain (e.g., `mayanksahani.dev`)

Once your portfolio is live on Vercel or Netlify, attaching a custom domain takes ~5 minutes and includes free automatic HTTPS/SSL:

1. **Buy a Domain**: Purchase your domain from a registrar such as Namecheap, Porkbun, Cloudflare Registrar, or Google Domains / Squarespace.
2. **Add the Domain in Your Host Dashboard**:
   - **Vercel**: Open your project → **Settings → Domains** → enter `mayanksahani.dev` (and `www.mayanksahani.dev`).
   - **Netlify**: Open your site → **Domain management → Add a domain** → enter `mayanksahani.dev`.
3. **Set DNS Records at Your Registrar** (exact values are shown inside Vercel/Netlify):
   - **For Vercel**:
     - Apex (`@`): `A` record pointing to `76.76.21.21`
     - Subdomain (`www`): `CNAME` record pointing to `cname.vercel-dns.com`
   - **For Netlify**:
     - Apex (`@`): `A` record pointing to `75.2.60.5`
     - Subdomain (`www`): `CNAME` record pointing to `<your-site-name>.netlify.app`
4. **Wait for SSL Provisioning**: DNS propagates typically in 5–30 minutes; HTTPS activates automatically.
5. **Update Your Sitemap Domain**: Replace `https://mayanksahani.dev/` inside `public/sitemap.xml` with your actual domain and redeploy.

---

## Post-Launch Recruiter Verification Checklist

- Open your live URL in an incognito browser on desktop and mobile to verify the 3D black-hole opening screen and **Enter the Universe** transition.
- Test **Resume → Print / Save PDF** and **Download .txt**.
- Paste your live URL into the **LinkedIn Post Inspector** (`https://www.linkedin.com/post-inspector/`) so LinkedIn caches your golden-amber cosmic preview card cleanly before adding the link to your profile and resume.
