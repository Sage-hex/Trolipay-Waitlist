# Frontend Setup

## Environment Variables
Create a `.env` file and configure:

- `VITE_API_BASE_URL=`
- `VITE_WAITLIST_WEBAPP_URL=`

For Google Sheets lead capture, set `VITE_WAITLIST_WEBAPP_URL` to your Google Apps Script Web App `/exec` URL.

Example:

```bash
VITE_WAITLIST_WEBAPP_URL=https://script.google.com/macros/s/AKfycb.../exec
```

If this variable is missing, waitlist submissions are saved in browser localStorage under `waitlist_submissions_v1`.

## Run
```bash
npm install
npm run dev
```
