# 🧪 3D Glassmorphic Portfolio with Senku AI Companion

A futuristic, high-performance personal portfolio website built with modern **Glassmorphism**, interactive **Three.js 3D WebGL graphics**, and a custom autonomous AI companion named **SENKU** (inspired by *Dr. Stone*), ready to help visitors with code, scientific concepts, project walkthroughs, and collaboration inquiries.

---

## ✨ Features & Highlights

### 1. 🪟 Advanced 3D Glassmorphism & Visual Aesthetics
- **Frosted Glass Styling**: Multi-layer backdrop filters (`blur(20px)`), glowing neon borders (`#00f5a0`, `#00d9f5`, `#8b5cf6`), and subtle refractor border insets.
- **Physics-Based 3D Card Tilt (`tilt-3d.js`)**: Dynamic cursor tracking with specular light reflection coordinates across all cards.
- **Three.js 3D Interactive Canvas (`three-scene.js`)**:
  - Interactive 3D Hero Core: Rotating crystal icosahedron encased in a wireframe cage with dual orbital gyroscopic rings.
  - 850+ reactive floating particle constellation that smoothly drifts and tracks mouse coordinates.
  - Drag-to-rotate interaction and smooth damping.

### 2. 🤖 Meet SENKU (Scientific & Neural Knowledge Unit)
- **Built-in Autonomous AI Companion (`senku-ai.js`)**:
  - Full natural language dialogue engine with Senku's iconic personality (*"10 billion percent confident!"*, sharp, scientific, first-principles logic).
  - Pre-trained knowledge about your skills, background, projects, and contact channels.
  - Can explain coding concepts, write clean snippets (TypeScript, Python, CSS Glassmorphism), and solve technical queries.
- **Voice Synthesis (TTS)**: Web Speech API integration with toggleable voice readout for Senku's answers.
- **Live Gemini API Mode**: Optional settings gear in the chat window to connect your Google Gemini API key for live real-time LLM reasoning.
- **Always Accessible**: Trigger Senku from the top nav button, the 3D showcase section, terminal CLI, or the floating bottom-right dock.

### 3. 💻 Interactive Developer Terminal (`terminal.js`)
- Embedded retro-futuristic science terminal.
- Supports commands: `help`, `about`, `skills`, `projects`, `formula`, `audio`, `matrix`, `contact`, `clear`, and `senku <query>`.
- History navigation (Up/Down arrow keys) and Tab auto-complete.

### 4. 🔊 Web Audio API Synthesizer (`audio-fx.js`)
- Procedural sci-fi audio effects generated directly in code (no heavy external audio files needed).
- Subtle hover blips, button clicks, and Senku AI activation chimes. Toggleable from the navbar.

---

## 🚀 Quick Start Guide

### Option 1: Direct Instant Launch (No build required!)
You can open `index.html` directly in any modern browser:
```bash
# Windows File Explorer / Run
start C:\subrat\senku-portfolio
```

### Option 2: Run with Local Development Server
From the project folder:
```powershell
cd C:\subrat\senku-portfolio
npm start
```
Then navigate to `http://localhost:3000` in your browser.

### Option 3: Expose Publicly with Cloudflare Tunnel
Double-click `start-online.bat` or run:
```powershell
npm run tunnel
```
This generates a secure, fast, public HTTPS URL powered by Cloudflare's global edge network.

---

## 📁 File Structure

```
senku-portfolio/
│
├── index.html               # Main semantic HTML structure & sections
├── package.json             # Dev server scripts & dependencies
├── README.md                # Documentation & customization guide
│
├── css/
│   ├── style.css            # Core layout, typography, animations, responsive design
│   └── glassmorphism.css    # Frosted glass, specular sheen, and glowing border utilities
│
└── js/
    ├── audio-fx.js          # Web Audio API sound synthesizer
    ├── three-scene.js       # Three.js 3D crystal core & particle starfield
    ├── tilt-3d.js           # 3D perspective card tilt with specular highlights
    ├── senku-ai.js          # Senku AI companion logic, chat UI, voice TTS & Gemini integration
    ├── terminal.js          # Interactive lab CLI with commands & autocomplete
    └── main.js              # UI orchestration, project filters, counters & contact form
```

---

## ⚙️ Customization

1. **Personal Identity & Bio**:
   - Open `index.html` and edit lines in the Hero (`#hero`) and About (`#about`) sections to update your name, bio, and social handles.
2. **Projects**:
   - Add or modify the project cards in `#projects`. Each card supports categories (`ai`, `3d`, `fullstack`) which automatically work with the filter buttons.
3. **Senku's Knowledge**:
   - Open `js/senku-ai.js` and edit `generateSenkuResponse(rawQuery)` to add new custom questions or answers about yourself.
