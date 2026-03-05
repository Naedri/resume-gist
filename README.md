# Resume Gist

Powered by data retrieved from GitHub gists, this project generates a web-based resume that tracks when it is accessed, helping you decide when to follow up on your applications.

## Features

- [x] Fetch resume data from GitHub gists containing a `resume.json` file.
- [x] Support both English and French versions.
- [x] Single page application is available in the [`main`](https://github.com/Naedri/resume-gist/tree/main) branch and server-side rendering is available in the [`feat/ssr`](https://github.com/Naedri/resume-gist/tree/feat/ssr) branch.
- [x] Send telemetry to a provided endpoint.

## Setup

1. Clone and install:

```bash
git clone https://github.com/Naedri/resume-gist.git
cd resume-gist
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
VITE_TELEMETRY_URL=https://yolofunyolo.provider.co/functions/v1/resume-gist
VITE_TELEMETRY_HEADER_KEY=sb_publishable_789456123_000
```

3. Run:

```bash
npm run build
npm run preview
```

### Alternative with container

Build then run the docker image:

```sh
export $(cat .env | xargs)
docker build \
  --build-arg VITE_GIST_ID_EN \
  --build-arg VITE_GIST_ID_FR \
  --build-arg VITE_RESUME_NAME \
  --build-arg VITE_DOCUMENT_TITLE \
  --build-arg VITE_DOCUMENT_LANG \
  --build-arg VITE_TELEMETRY_URL \
  --build-arg VITE_TELEMETRY_HEADER_KEY \
  -t localhost/resume_image .
docker run -p 4173:4173 -e PORT=4173 --rm localhost/resume_image
```

## Telemetry

Current implementation is compatible with [Supabase server-side functions](https://supabase.com/docs/guides/functions).
To send data to another database service provider, additional `TelemetryService` and `TelemetryConsumer` will need to be implemented in [telemetry.ts](./src/utils/telemetry.ts).

### Setup

If you plan to use Supabase, you will need first to create the pqSQL data table that will store telemetry data ([`01_create_table.sql`](https://gist.github.com/Naedri/02a2d08b2003422ae361e6adb1ddb94a#file-01_create_table-sql)) then create the edge functions that will validate the event data and perform associated database operations ([`02_telemetry_edge_function.ts`](https://gist.github.com/Naedri/02a2d08b2003422ae361e6adb1ddb94a#file-02_telemetry_edge_function-ts)).

## Theming

The project uses colors from the [Dracula theme](https://github.com/dracula/dracula-theme). You can customize them by editing the CSS variables in the [`global.css`](https://github.com/Naedri/resume-gist/blob/main/src/styles/global.css) file.

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
