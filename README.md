# Pizza Recs — CMS Setup

## What's in here

```
pizzarecs-cms/
├── public/
│   ├── index.html          ← the main site (loads pizzerias dynamically)
│   ├── pizzerias/
│   │   ├── manifest.json   ← auto-generated list of all pizzeria IDs
│   │   ├── bianco.json     ← one file per pizzeria
│   │   └── ...
│   └── admin/
│       ├── index.html      ← Decap CMS admin UI
│       └── config.yml      ← CMS schema (fields, cities, ratings)
├── build.js                ← regenerates manifest.json on each deploy
└── netlify.toml            ← Netlify config
```

---

## Setup steps

### 1. Push to GitHub
Create a new GitHub repo and push this folder:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/pizzarecs.git
git push -u origin main
```

### 2. Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and log in
2. Click **Add new site → Import an existing project**
3. Connect your GitHub repo
4. Build settings are already in `netlify.toml` — just click **Deploy**

### 3. Enable Netlify Identity
1. In your Netlify site dashboard, go to **Site configuration → Identity**
2. Click **Enable Identity**
3. Under **Registration**, set to **Invite only** (so only you can log in)
4. Under **Services → Git Gateway**, click **Enable Git Gateway**

### 4. Invite yourself
1. Still in Identity, click **Invite users**
2. Enter your email address
3. Check your email and accept the invite — this sets your CMS password

### 5. Access the admin
Go to `https://your-site.netlify.app/admin`
Log in with your email and password.

---

## Using the CMS

- **Add a pizzeria**: Click **New Pizzeria**, fill in the form, hit **Publish**
- **Edit a pizzeria**: Find it in the list (filter by city or rating), click to edit
- **Delete a pizzeria**: Open it, click the **Delete** button at the top

Every save triggers a Netlify deploy (~30 seconds). The manifest regenerates automatically via `build.js` so new pizzerias appear on the site.

---

## Fields reference

| Field | Notes |
|-------|-------|
| ID | URL slug — no spaces, e.g. `pizzeria-bianco` |
| City | Dropdown — Los Angeles, New York, Chicago, Detroit, The US, Rest of the World |
| Rating | Dropdown — World Class through Solid Pick, plus Old-school Institution |
| Icons | Multi-select — pick Whole Pies and/or Slices, plus style tags |
| Teaser | 1–2 sentences shown on the list page |
| Review | Full review — wrap paragraphs in `<p>` tags |
| Update Date | Format: `Jan 2026` |
| Further Reading | Add as many outlet + URL pairs as you like |
| Photos | URLs only for now — Google Maps auto-fetch coming later |
