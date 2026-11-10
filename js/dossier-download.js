/* ==========================================================================
   SCIENTIFIC DOSSIER & CV GENERATOR
   Instant downloadable technical credentials snapshot
   ========================================================================== */

function downloadSubratDossier() {
  const content = `# SUBRAT SAHU // SCIENTIFIC DOSSIER & RESUME
Role: Full-Stack Software Engineer & AI System Architect
Location: Global Remote // IST (UTC+5:30)
Email: subrat.portfolio@dev.io
Specialization: High-Performance Distributed Systems, 3D WebGL Spatial Computing & Agentic LLMs
Cognitive Co-Pilot: SENKU AI (Google DeepMind Antigravity Architecture)

================================================================================
1. EXECUTIVE SUMMARY
================================================================================
Full-Stack Engineer and AI Architect with extensive experience engineering 
mission-critical distributed platforms, GPU-accelerated WebGL environments, 
and autonomous multi-agent neural frameworks. Guided by first-principles 
scientific methodology and rigorous empirical optimization.

================================================================================
2. TECHNICAL ARSENAL
================================================================================
- Frontend & 3D Spatial: TypeScript, React 19, Next.js 15, Three.js, WebGL 2.0, GLSL Shaders, TailwindCSS, Web Audio API
- Backend & Distributed: Python (FastAPI/LangGraph), Node.js, Go, Rust, PostgreSQL, Redis, Docker, Kafka
- AI & Neural Architecture: Google Gemini API (2.5/3.8 Flash), LangChain, Multi-Agent Swarms, RAG, Vector Databases (Pinecone/Chroma)
- Architecture & Ops: Microservices, Event-Driven Architectures, Zero-Downtime CI/CD Pipelines

================================================================================
3. KEY PRODUCTION INNOVATIONS
================================================================================
1. Project Senku: Neural Engine
   - Multi-agent orchestration platform executing recursive first-principles logic.
   - Built with Python, LangGraph, FastAPI, and Docker.

2. Aether 3D Web Studio
   - Browser-native WebGL workstation compiling procedural GLSL raymarching shaders at 60 FPS.
   - Built with Three.js, TypeScript, GLSL, and Web Audio API.

3. ChronoLogic Web OS
   - Desktop operating environment running inside the browser with sandboxed Web Worker VMs.
   - Built with React, TailwindCSS, IndexedDB, and Web Workers.

4. HyperFlux Data Mesh
   - Streaming pipeline digesting 1.2M+ telemetry events/sec with sliding-window anomaly detection.
   - Built with Rust, Kafka, Redis, and PostgreSQL.

================================================================================
4. CONTACT FREQUENCIES
================================================================================
- Portfolio: https://software-techno-explain-ons.trycloudflare.com
- Email: subrat.portfolio@dev.io
- AI Assistant: Summon Senku online anytime for live architectural sparring.

Generated via Subrat's 3D Portfolio // Verified 10 Billion Percent Accurate.
`;

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Subrat_Sahu_AI_Engineer_Dossier.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  if (window.soundEngine) window.soundEngine.playActivate();
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');
  if (toast && toastText) {
    toastText.innerText = "📄 Subrat's Scientific Dossier downloaded successfully!";
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-download-dossier]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadSubratDossier();
    });
  });
});
