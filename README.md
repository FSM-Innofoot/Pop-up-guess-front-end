# FSM Score Predictor

Mobile-first campaign page for Football Shirt Market.  
Users scan a QR code, predict the final score of a match, and enter a shirt auction.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the prediction form loads immediately.

## Routes

| Route     | Description                        |
|-----------|------------------------------------|
| `/`       | Prediction form (landing page)     |
| `/thanks` | Confirmation after submission      |

## Project Structure

```
src/
  app/
    actions.ts          ← Server Action: validates + stores prediction, redirects
    layout.tsx          ← Root layout (fonts, Header, Footer)
    page.tsx            ← / → renders PredictionForm
    PredictionForm.tsx  ← Client component (useActionState form)
    thanks/
      page.tsx          ← /thanks → confirmation page
  components/
    Header.tsx / .module.css
    Footer.tsx / .module.css
    Card.tsx / .module.css
    Button.tsx / .module.css
    Input.tsx / .module.css
    FormError.tsx / .module.css
  lib/
    types.ts            ← Prediction interface
    predictions.ts      ← Data layer (swap this for a real DB/API)
data/
  predictions.json      ← Auto-created on first submission (git-ignored)
```

## Replacing the mock storage

Edit `src/lib/predictions.ts` — the `submitPrediction(prediction: Prediction)` function  
is the single integration point. Replace the file-system logic with:
- A Postgres/MySQL/MongoDB call
- A Supabase insert
- An API POST to your backend

The Server Action in `src/app/actions.ts` calls it and stays unchanged.

## npm Scripts

| Script           | Purpose                              |
|------------------|--------------------------------------|
| `npm run dev`    | Start development server (port 3000) |
| `npm run build`  | Production build                     |
| `npm run start`  | Start production server              |
| `npm run lint`   | Run ESLint                           |
| `npm run format` | Run Prettier on all src files        |

## Brand

Colors, typography, and layout follow the FSM / InnoFoot house-style guide.

- Primary: `#237061`
- Supporting: `#2FAF8A`, `#4E9E84`
- Heading font: Barlow Condensed Bold (closest Google Fonts match for Klein Condensed Bold)
- Body font: DM Sans (closest match for Open Sauce)
