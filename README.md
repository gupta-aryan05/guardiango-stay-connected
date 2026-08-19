# GuardianGo: Stay Connected

Build a working React web app called GuardianGo for the hackathon theme Safety Net.

Create ONLY the Phase 1 MVP. Keep the code simple, modular, and easy to extend later. Do not add AI, authentication, database, community features, or unnecessary APIs yet.

Core flow:

Landing page with GuardianGo – Your journey. Your check-in. Your safety.

Start Safe Journey button.

Journey setup:

Destination

Duration: 15/30/45/60 minutes

Trusted contact name, email, phone

Use the browser's real Geolocation API.

Active journey dashboard showing:

Journey status

Live countdown

Current location

Google Maps "View Location" link

I'm Safe button

Emergency button

Clicking I'm Safe resets the timer.

If timer expires, show CHECK-IN MISSED and emergency warning.

Emergency panel should show:

Trusted contact

Last known location

Timestamp

Google Maps link

Copy Emergency Message button

Email option using mailto: if email exists.

Save active journey state in localStorage so refresh doesn't immediately lose it.

Handle denied/unavailable location gracefully.

Make it responsive, clean, professional and hackathon-ready.

Do not fake SMS/calls or claim an alert was actually sent.

Test the complete flow:
Start Journey → GPS → Countdown → I'm Safe → Timer Reset → Missed Check-in → Emergency Alert → Location Link.

Prioritize working functionality over animations and extra features.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ce6fc7d7-5c8e-45ad-92b6-408e487759c7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
