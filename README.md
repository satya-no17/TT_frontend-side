# Trackly 🚀

> **Stay Consistent. Build Momentum.**

Trackly is a productivity web app that helps you track daily tasks, monitor goals, and build habits that actually stick — simple, focused, and designed for real progress.

🔗 **Live Demo:** [trackly-kappa-coral.vercel.app](https://trackly-kappa-coral.vercel.app)

![Trackly Screenshot](https://github.com/user-attachments/assets/999326c4-5330-49b2-9d80-4c69372a0886)

---

## Features

- ✅ **Daily Task Tracking** — Mark tasks as complete and see your daily progress at a glance
- 🎯 **Goal Management** — Set and track daily, monthly, and yearly goals with visual progress bars
- 📊 **Progress Dashboard** — See all your progress in one clean, focused view
- 💡 **Daily Motivation** — Get a fresh motivational quote every time you open the app
- 🔐 **Auth System** — Register and login securely; sessions persisted via localStorage
- 📱 **Responsive Design** — Works seamlessly on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Deployment | [Vercel](https://vercel.com) |
| Language | JavaScript (93.5%) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/satya-no17/TT_frontend-side.git
cd TT_frontend-side

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
TT_frontend-side/
├── app/                  # Next.js App Router pages
│   ├── dashboard/        # Main dashboard page
│   ├── tasks/            # Tasks management page
│   └── components/       # Shared components (LoadingPage, etc.)
├── components/
│   └── ui/               # shadcn/ui components
├── utils/                # Utility functions
│   ├── login.js          # Login API call
│   ├── register.js       # Register API call
│   ├── retrieveData.js   # Fetch dashboard data
│   └── logout.js         # Logout helper
├── lib/                  # Helper libraries
└── public/               # Static assets (logo, etc.)
```

---

## How It Works

1. **Register / Login** — Create an account or log in with your username and password
2. **Dashboard** — View your daily tasks, goal progress, and motivation for the day
3. **Tasks Page** — Manage your daily tasks and goals, mark them as complete
4. **Progress Tracking** — Daily, monthly, and yearly goals are tracked with live progress bars

---

## Deployment

This project is deployed on **Vercel**. To deploy your own fork:

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js and deploys instantly

---

## Author

Built by **Satya** — [@satya-no17](https://github.com/satya-no17)

---

## License

This project is open source and available under the [MIT License](LICENSE).