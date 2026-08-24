# Raj Sakariya — Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind CSS portfolio site with a working
contact form (Nodemailer via a serverless API route).

## Run locally

```bash
npm install
cp .env.local.example .env.local   # then fill in real values, see below
npm run dev
```

Open http://localhost:3000

## Contact form email setup

The form posts to `/app/api/contact/route.ts`, which sends mail with Nodemailer
through Gmail. You need a **Google App Password** (not your normal Gmail
password):

1. Turn on 2-Step Verification on the Gmail account: https://myaccount.google.com/security
2. Go to https://myaccount.google.com/apppasswords
3. Create an app password (name it e.g. "portfolio"), copy the 16-character code
4. In `.env.local`:
   ```
   EMAIL_USER=youraddress@gmail.com
   EMAIL_PASS=the16charapppassword
   TO_EMAIL=sakariyaraj890@gmail.com
   ```

## Deploy to Vercel

See the step-by-step in the chat response, or:

```bash
npm install -g vercel
vercel
```

Then add `EMAIL_USER`, `EMAIL_PASS`, `TO_EMAIL` as Environment Variables in the
Vercel project settings, and redeploy.
