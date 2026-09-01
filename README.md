# 🏠 WayZ - Smart Home Problem Solver

**Report • Connect • Resolve**

*An AI-powered platform for reporting household issues and connecting with professional repair services*


## 🎯 Overview

**WayZ** is an intelligent  problem management platform that harnesses the power of AI to help you identify, analyze, and resolve everyday home issues. Whether it's a leaky faucet, broken appliance, or structural concern, WayZ provides smart solutions and connects you with vetted professionals in your area.

### 🌟 Why WayZ?
- ⚡ **Instant AI Analysis** - Get intelligent insights about your household problems
- 🗺️ **Location-Based Services** - Find nearby professionals with ease
- 💰 **Cost Estimation** - Know repair expenses before committing
- 📱 **User-Friendly** - Intuitive interface designed for everyone
- 🔒 **Secure & Private** - Your data is protected with enterprise-grade security

---

## ✨ Features


### 🔐 Authentication & Profiles
- Secure user registration and login
- Supabase-powered authentication
- User profile management
- Session persistence

### 📝 Issue Reporting
- Intuitive problem reporting form
- Category-based classification
- Detailed description support
- Timestamp tracking


### 🤖 AI-Powered Analysis
- OpenAI integration for smart insights
- Repair action suggestions
- Cost estimation
- Solution recommendations

### 🗺️ Interactive Maps
- Leaflet-based visualization
- Real-time location tracking
- Nearby services discovery
- Google Maps integration

### 📊 Dashboard & Tracking
- Comprehensive issue dashboard
- Recent issues overview
- Issue statistics
- User profile card

### 🔧 Service Discovery
- Locate nearby professionals
- Service provider information
- Distance-based sorting
- Quick action buttons


### 🎨 Beautiful UI
- Dark theme with emerald accents
- Responsive design
- Smooth animations
- Accessible components

### ⚙️ Settings & Preferences
- User settings management
- Account preferences
- Theme customization
- Quick logout option

## 🛠️ Tech Stack


| Category | Technologies |
|----------|---------------|
| **Frontend Framework** | ![Next.js](https://img.shields.io/badge/-Next.js%2016-000?style=for-the-badge&logo=next.js) ![React](https://img.shields.io/badge/-React%2019-61dafb?style=for-the-badge&logo=react) |
| **Language** | ![TypeScript](https://img.shields.io/badge/-TypeScript%205-3178c6?style=for-the-badge&logo=typescript) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06b6d4?style=for-the-badge&logo=tailwindcss) ![PostCSS](https://img.shields.io/badge/-PostCSS-dd3735?style=for-the-badge&logo=postcss) |
| **UI Components** | ![Radix UI](https://img.shields.io/badge/-Radix%20UI-161618?style=for-the-badge) ![shadcn](https://img.shields.io/badge/-shadcn-000?style=for-the-badge) ![Lucide](https://img.shields.io/badge/-Lucide%20Icons-f1f5f9?style=for-the-badge) |
| **Maps & Location** | ![Leaflet](https://img.shields.io/badge/-Leaflet-199900?style=for-the-badge&logo=leaflet) ![Google Maps](https://img.shields.io/badge/-Google%20Maps-4285f4?style=for-the-badge&logo=googlemaps) |
| **Forms & Validation** | ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-ec5990?style=for-the-badge) ![Zod](https://img.shields.io/badge/-Zod-3068ad?style=for-the-badge) |
| **Animations** | ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055ff?style=for-the-badge) |
| **Notifications** | ![React Hot Toast](https://img.shields.io/badge/-React%20Hot%20Toast-313131?style=for-the-badge) |
| **Backend & Database** | ![Supabase](https://img.shields.io/badge/-Supabase-3ecf8e?style=for-the-badge&logo=supabase) |
| **AI & ML** | ![OpenAI](https://img.shields.io/badge/-OpenAI-412991?style=for-the-badge&logo=openai) |
| **Development** | ![ESLint](https://img.shields.io/badge/-ESLint-4b3a63?style=for-the-badge&logo=eslint) ![Node.js](https://img.shields.io/badge/-Node.js%2018-339933?style=for-the-badge&logo=node.js) |

</div>

---

## 📁 Project Structure

```
WayZ/
├── 📂 app/                           # Next.js App Router
│   ├── 📂 auth/                      # 🔐 Authentication Module
│   │   ├── signup/page.tsx           # User registration
│   │   └── page.tsx                  # Auth redirect
│   ├── 📂 dashboard/                 # 📊 Main Dashboard
│   │   └── page.tsx                  # Dashboard hub
│   ├── 📂 report/                    # 📝 Issue Reporting
│   │   └── page.tsx                  # Report submission
│   ├── 📂 issues/                    # 📋 Issue History
│   │   └── page.tsx                  # Issues listing
│   ├── 📂 assistant/                 # 🤖 AI Assistant
│   │   └── page.tsx                  # AI chat/assistance
│   ├── 📂 settings/                  # ⚙️ User Settings
│   │   └── page.tsx                  # Settings panel
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home redirect
│   └── globals.css                   # Global styles
├── 📂 components/                    # React Components
│   ├── 📂 auth/                      # Auth components
│   │   ├── auth-layout.tsx
│   │   └── signup-form.tsx
│   ├── Map.tsx                       # 🗺️ Static map
│   ├── LiveMap.tsx                   # 🗺️ Live map
│   ├── AIAnalysis.tsx                # 🤖 Analysis display
│   └── NearbyServices.tsx            # 🔧 Services list
├── 📂 lib/                           # Utilities
│   └── supabase.ts                   # Supabase client
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
└── next.config.js                    # Next.js config
```

---

## 🚀 Installation

### 📋 Prerequisites
- **Node.js** 18.x or higher
- **npm**, yarn, pnpm, or bun
- **Git** for version control

### 📦 Setup Steps

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/Dhakshitha08/WayZ.git
cd WayZ
```

#### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

#### 3️⃣ Environment Configuration
Create a `.env.local` file in the root directory:

```env
# 🗄️ Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 🗺️ Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# 🤖 OpenAI API
OPENAI_API_KEY=your_openai_api_key
```

#### 4️⃣ Start Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

#### 5️⃣ Open in Browser
Navigate to **[http://localhost:3000](http://localhost:3000)** 🌐

---

## 💡 Usage Guide

### Getting Started

```
1. 📝 Sign Up → Create your WayZ account
   ↓
2. 🔓 Login → Access your personalized dashboard
   ↓
3. 📋 Report Issue → Describe your household problem
   ↓
4. 🤖 Get AI Analysis → Receive smart recommendations
   ↓
5. 🔧 Find Services → Connect with professionals
   ↓
6. ✅ Resolve Issue → Complete your repair
```

### Main Dashboard Features

| Feature | Description | Icon |
|---------|-------------|------|
| **Dashboard** | Central hub for all activities | 📊 |
| **Report New Problem** | Submit household issues | 📝 |
| **Recent Issues** | View your issue history | ⏰ |
| **AI Assistant** | Get smart recommendations | 🤖 |
| **Settings** | Manage your preferences | ⚙️ |
| **Nearby Services** | Find professionals in your area | 📍 |

---

## 📜 Available Commands

```bash
npm run dev      # 🚀 Start development server (with Webpack)
npm run build    # 🔨 Build for production
npm start        # ▶️  Start production server
npm run lint     # ✅ Run ESLint code quality checks
```

---

## 🔑 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anonymous key | `eyJhbGc...` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | ✅ | Google Maps API key | `AIzaSyD...` |
| `OPENAI_API_KEY` | ✅ | OpenAI API key | `sk-...` |

---

## 🎨 Design System

### Color Palette

```
🟦 Primary Teal        #0F766E
🟩 Accent Emerald      #22C55E
🟦 Secondary Aqua      #14B8A6
🟪 Accent Purple       #8B5CF6
🟦 Navy                #1E3A8A

Status Colors:
🟨 Pending             #F59E0B
🟦 In Progress         #3B82F6
🟩 Resolved            #22C55E
```

### Design Features
- 🌙 Dark theme with premium feel
- ✨ Smooth animations and transitions
- 📱 Fully responsive layout
- ♿ Accessible UI components
- 🎯 User-centric design philosophy

---

## 🔮 Future Enhancements

```
🔄 In Progress / Planned Features:

📊 Analytics & Statistics
   ├─ Enhanced dashboard metrics
   ├─ Issue trend analysis
   └─ Cost tracking

🔔 Notifications
   ├─ Real-time alerts
   ├─ Service provider updates
   └─ Issue status notifications

⭐ Service Reviews
   ├─ Provider ratings
   ├─ User reviews & testimonials
   └─ Quality ratings

🌐 Localization
   ├─ Multi-language support
   ├─ Regional customization
   └─ Currency conversion

📱 Mobile Apps
   ├─ iOS app
   ├─ Android app
   └─ Cross-platform sync

🤖 Advanced AI
   ├─ Predictive issue detection
   ├─ Computer vision for image analysis
   └─ Machine learning recommendations

🔗 Integrations
   ├─ More service provider platforms
   ├─ Payment gateway integration
   └─ Smart home device support
```

---

## 📦 Key Dependencies

<table>
<tr>
<th>Package</th>
<th>Version</th>
<th>Purpose</th>
</tr>
<tr>
<td><code>next</code></td>
<td>16.2.6</td>
<td>React framework for production</td>
</tr>
<tr>
<td><code>react</code></td>
<td>19.2.4</td>
<td>JavaScript UI library</td>
</tr>
<tr>
<td><code>react-dom</code></td>
<td>19.2.4</td>
<td>React DOM rendering</td>
</tr>
<tr>
<td><code>@supabase/supabase-js</code></td>
<td>2.105.4</td>
<td>Database & authentication</td>
</tr>
<tr>
<td><code>openai</code></td>
<td>6.37.0</td>
<td>AI integration</td>
</tr>
<tr>
<td><code>react-leaflet</code></td>
<td>5.0.0</td>
<td>Map component library</td>
</tr>
<tr>
<td><code>tailwindcss</code></td>
<td>4</td>
<td>CSS framework</td>
</tr>
<tr>
<td><code>framer-motion</code></td>
<td>12.38.0</td>
<td>Animation library</td>
</tr>
<tr>
<td><code>zod</code></td>
<td>4.4.3</td>
<td>TypeScript validation</td>
</tr>
</table>

See [`package.json`](./package.json) for the complete list of dependencies.

---

## 👨‍💻 Development Guidelines

### Code Standards
- ✅ **TypeScript** for type safety
- ✅ **ESLint** for code quality
- ✅ **Tailwind CSS** for styling
- ✅ **Component modularity** for reusability

### Component Architecture
```
Components
├── 📦 Server Components (default)
│   └─ Data fetching, database queries
├── 🎯 Client Components ("use client")
│   └─ Interactivity, state management
└── 🧩 Reusable UI Components
    └─ Buttons, forms, layouts
```

### Best Practices
- 📏 Keep components small and focused
- 🔄 Use custom hooks for logic reuse
- 📝 Document complex functionality
- 🧪 Test critical features
- ♿ Ensure accessibility compliance

---

## 🤝 Support & Contributions

### Found an Issue?
👉 [Create an issue](https://github.com/Dhakshitha08/WayZ/issues) with detailed information

### Have Suggestions?
💬 Open a discussion to share ideas

### Questions?
📧 Feel free to reach out to the maintainer

---

## 📄 License

This project is **private**. All rights reserved.

---

<div align="center">

### 🌟 Show Your Support

If you find WayZ helpful, please consider:
- ⭐ Starring the repository
- 🔖 Bookmarking for future reference
- 💬 Sharing feedback and suggestions

---

<h3>Made with ❤️ by <a href="https://github.com/Dhakshitha08">Dhakshitha08</a></h3>

*Smart solutions for everyday problems* 🏠✨

</div>
