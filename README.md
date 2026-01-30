# Resume

This project generates a server-side rendered resume web page in English or French, using data from a GitHub Gist containing a `resume.json` file.

## Features

- Fetch resume data from a GitHub Gist.
- Support for English and French versions.
- Server-side rendering for SEO and performance.

## Setup

1. Clone and install:

```bash
git clone https://github.com/Naedri/resume.git
cd resume
npm install
```

2. Add `.env` file with your Gist IDs:

```env
VITE_GIST_ID_EN=your_english_gist_id
VITE_GIST_ID_FR=your_french_gist_id
```

3. Run:

```bash
npm run build
npm run preview
```

## Gist Structure

Your Gist must include a `resume.json` file, of which the type is defined by the [`ResumeSchema`](./src/types/index.d.ts) interface.
