# Professional Portfolio

A React, Vite, Tailwind CSS, and Framer Motion single-page portfolio.

## Customize content and media

`src/content.js` is the single source of truth for visible content, social links, the resume path, education, contact details, and the form endpoint. Replace the bracketed placeholders there before publishing.

Place media in `public/assets/` and retain the paths referenced by `src/content.js`:

- `profile/` for the profile image
- `projects/`, `experience/`, and `achievements/` for carousel and rail media
- `resume.pdf` for the downloadable resume
- `og-preview.png` for the default social sharing image

For the contact form, replace `content.contact.formEndpoint` with a Formspree endpoint. The component sends JSON with `name`, `email`, and `message`.

Update `content.meta.title`, `description`, `siteUrl`, and `image` with the public site details. Match the values in `index.html` when publishing, because static HTML metadata is used by social crawlers.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with:

```bash
npm run build
```

## Deploy

### GitHub Pages (Automated via GitHub Actions)

Pushes to the `main` branch automatically build and deploy the portfolio to GitHub Pages using the workflow located at `.github/workflows/deploy.yml`.

- **Live URL**: https://harshvardhan2024.github.io/Harshvardhan-Portfolio.io/
- **Settings**: Repository Settings > Pages > Build and deployment Source is set to **GitHub Actions**.
