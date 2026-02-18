# Resume

This project generates a resume web page.

## Features

- [x] Fetch resume data from GitHub Gists containing a `resume.json` file.
- [x] Support both English and French versions.
- [x] Single page application is available in the [`main`](https://github.com/Naedri/resume/tree/main) branch and server-side rendering is available in the [`feat/ssr`](https://github.com/Naedri/resume/tree/feat/ssr) branch.
- [x] Send telemetry to a provided endpoint.

## Setup

1. Clone and install:

```bash
git clone https://github.com/Naedri/resume.git
cd resume
npm install
```

2. Add an `.env` file containing the following:

```env
# required
VITE_GIST_ID_EN=your_english_gist_id
VITE_GIST_ID_FR=your_french_gist_idw
# optional
VITE_RESUME_NAME=John Doe
VITE_DOCUMENT_TITLE=John Doe
VITE_DOCUMENT_LANG=en
VITE_TELEMETRY_URL=http://localhost:3000/api/telemetry
```

3. Run:

```bash
npm run build
npm run start
```

### Alternative with container

Build then run the docker image:

```sh
export $(cat .env | xargs)
docker build \
  --build-arg VITE_GIST_ID_EN \
  --build-arg VITE_GIST_ID_FR \
  --build-arg VITE_RESUME_NAME \
  -t localhost/resume_image .
docker run -p 5173:5173 -e PORT=5173 --rm localhost/resume_image
```

## Gist Structure

Your gist must include a [`resume.json`](./src/types/gist.d.ts) file, of which the type is defined by the [JSON Resume schema](https://jsonresume.org/schema).
Supported attributes are the following :

- [x] `basics`
- [x] `work`
- [ ] `volunteer`
- [x] `education`
- [ ] `awards`
- [ ] `certificates`
- [ ] `publications`
- [x] `skills`
- [x] `languages`
- [ ] `interests`
- [ ] `references`
- [x] `projects`
