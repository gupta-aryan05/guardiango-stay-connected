# 🛡️ GuardianGo

### Your journey. Your check-in. Your safety.

GuardianGo is an AI-powered personal safety companion designed to help people stay connected to their trusted contacts while travelling alone, commuting, or navigating unfamiliar situations.

It combines **real-time location, safety check-ins, emergency actions, and AI-assisted risk awareness** into a single safety-focused application.

---

## 🚨 Problem

During a vulnerable situation, a person may not have enough time or ability to manually ask for help.

Traditional safety apps often depend on the user pressing an SOS button.

**GuardianGo focuses on the question:**

> *What happens when the user cannot respond quickly?*

---

## 💡 Solution

GuardianGo provides a safety journey system where users can:

* Start a safety journey
* Share their current location
* Set a check-in timer
* Confirm that they are safe
* Detect missed check-ins
* Access emergency actions
* Share their last known location
* Contact a trusted person
* Use AI-powered safety intelligence

---

## ✨ Key Features

### 🗺️ Safety Journey

* Set destination
* Select journey duration
* Add a trusted contact
* Track current location
* Live safety countdown
* Persistent journey state

### 📍 Real-Time Location

* Uses the browser's Geolocation API
* Displays current latitude and longitude
* Generates a Google Maps location link
* Handles location permission errors

### ⏱️ Safety Check-In

* Live countdown timer
* **I'm Safe** check-in
* Timer resets after confirmation
* Missed check-in detection

### 🚨 Emergency Support

* Emergency alert interface
* Call trusted contact
* Prepare SMS emergency message
* Copy emergency message
* Share last known location
* Google Maps location access

### 🤖 AI Safety Intelligence

GuardianGo can be extended with AI-powered context analysis to evaluate signals such as:

* Journey progress
* Missed check-ins
* Time of travel
* Location context
* User safety responses

The goal is to provide **context-aware safety recommendations**, rather than simply acting as an SOS button.

---

## 🔄 How It Works

```text
Start Journey
      ↓
Set Destination & Trusted Contact
      ↓
Enable Location
      ↓
Safety Countdown Starts
      ↓
      ├── User Checks In
      │       ↓
      │   Timer Resets
      │
      └── Check-In Missed
              ↓
       Emergency State
              ↓
     Trusted Contact Actions
        ↓       ↓       ↓
      Call     SMS    Location
```

---

## 🧠 AI Vision

Future versions of GuardianGo can introduce:

* AI-based risk assessment
* Context-aware safety recommendations
* Voice safety assistant
* Smart check-ins
* Hands-free safety activation
* Discreet safety mode
* Automatic escalation
* Community safety reports
* Offline safety support

The architecture is designed to allow these capabilities to be added without replacing the core safety journey.

---

## 🛠️ Technology

* **React**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Browser Geolocation API**
* **Browser Speech APIs**
* **Local Storage**
* **Gemini AI** for AI-powered features
* **Google Maps** for location visualization

---

## 🔐 Safety & Privacy

GuardianGo does not claim to automatically send emergency SMS/calls unless a real communication service confirms delivery.

Location information is handled through browser/device permissions and should only be shared when the user chooses to do so.

GuardianGo is a safety-support tool and **not a replacement for emergency services**.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/gupta-aryan05/GuardianGo.git
cd GuardianGo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available locally through the URL shown by Vite.

---

## 🌍 Deployment

GuardianGo can be deployed using platforms such as:

* Google Cloud Run
* Vercel
* Netlify

For the hackathon, **Google Cloud Run** can be used for production deployment.

---

## 🎯 Hackathon

**Theme:** Safety Net

GuardianGo addresses personal safety by combining:

> **Journey Monitoring + Location + Check-ins + AI + Emergency Support**

The goal is simple:

### **Stay connected when it matters most.**

---

## 👨‍💻 Developer

**Aryan Gupta**

Computer Science Student | AI Enthusiast | Full-Stack Web Development

---

## 📄 License

This project was created as a hackathon project.
