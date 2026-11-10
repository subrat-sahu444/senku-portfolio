/* ==========================================================================
   INTERACTIVE PROJECT ARCHITECTURE INSPECTOR MODAL
   Deep-dive technical blueprints, system diagrams & performance telemetry
   ========================================================================== */

const PROJECT_BLUEPRINTS = {
  'senku-engine': {
    title: 'Project Senku: Neural Engine',
    badge: 'AI & ORCHESTRATION',
    status: 'PRODUCTION READY',
    summary: 'Autonomous agent framework designed to orchestrate multi-agent workflows, code debugging, and iterative reasoning using first-principles logic chains.',
    diagram: `
+-----------------------------------------------------------+
|               USER QUERY / OBJECTIVE                      |
+-----------------------------------------------------------+
                             |
                             v
+-----------------------------------------------------------+
|      SENKU REASONING CORE (Google DeepMind Antigravity)   |
|   - Extended Chain-of-Thought (Deconstruct -> Plan)       |
+-----------------------------------------------------------+
           |                                    |
           v                                    v
+--------------------+               +--------------------+
| TOOL EXECUTION HUB |               |  CODE SYNTHESIZER  |
| - Terminal Sandboxing              | - Python / TS AST  |
| - Web Retrieval                    | - Verification Env |
+--------------------+               +--------------------+
           |                                    |
           +-----------------+------------------+
                             |
                             v
+-----------------------------------------------------------+
|          VERIFIED TELEMETRY OUTPUT (10B% CONFIDENCE)      |
+-----------------------------------------------------------+
`,
    metrics: [
      { label: 'REASONING SPEED', value: '42ms' },
      { label: 'ACCURACY BENCHMARK', value: '99.4%' },
      { label: 'CONCURRENT AGENTS', value: '64 active swarms' }
    ],
    features: [
      'Self-healing AST code execution with automated syntax correction',
      'Dynamic multi-agent coordination with specialized task delegation',
      'Long-term context caching via Vector Embeddings (Chroma/Pinecone)',
      'Human-in-the-loop pair programming safety controls'
    ],
    github: 'https://github.com/developer-senku/project-senku'
  },

  'aether-studio': {
    title: 'Aether 3D Web Studio',
    badge: '3D & GRAPHICS',
    status: 'ACTIVE LAB',
    summary: 'Real-time browser-based WebGL studio allowing users to assemble procedural shader environments, raymarching crystals, and spatial audio scenes.',
    diagram: `
+--------------------+        +---------------------+
| GLSL SHADER EDITOR | -----> | LIVE AST COMPILATION|
+--------------------+        +---------------------+
                                         |
                                         v
+--------------------+        +---------------------+
| THREE.JS PIPELINE  | <----- | WEBGL 2.0 FRAGMENT  |
| - Custom Shaders   |        | - Raymarching Core  |
| - Spatial Audio FX |        | - Post-processing   |
+--------------------+        +---------------------+
`,
    metrics: [
      { label: 'RENDER FRAMERATE', value: '60 FPS LOCKED' },
      { label: 'DRAW CALLS', value: '< 15 Optimized' },
      { label: 'COMPILER LATENCY', value: '1.8ms WebGL 2' }
    ],
    features: [
      'Zero-latency hot-reload procedural fragment shader compilation',
      'Procedural noise generation (Simplex, Perlin, Worley)',
      'Audio-reactive frequency spectrum visualizer via Web Audio API',
      'One-click glTF / GLB 3D scene export with textures'
    ],
    github: 'https://github.com/developer-senku/aether-3d-studio'
  },

  'chronologic-os': {
    title: 'ChronoLogic Web OS',
    badge: 'FULL-STACK OS',
    status: 'BETA v2.4',
    summary: 'Glassmorphic desktop operating system running inside the browser with sandboxed worker runtimes and virtual window manager.',
    diagram: `
+-----------------------------------------------------------+
|             CHRONOLOGIC WINDOW MANAGER (UI)               |
+-----------------------------------------------------------+
              |                               |
              v                               v
+---------------------------+   +---------------------------+
|    SANDBOXED WEB WORKER   |   |     VIRTUAL FILE SYSTEM   |
| - Isolated JavaScript VM  |   | - IndexedDB Persistence   |
| - Rate-Limited CPU Quota  |   | - File System Access API  |
+---------------------------+   +---------------------------+
`,
    metrics: [
      { label: 'COLD BOOT TIME', value: '180ms' },
      { label: 'MEMORY FOOTPRINT', value: '< 35MB Base' },
      { label: 'SANDBOX ISOLATION', value: 'Web Workers' }
    ],
    features: [
      'Multi-tasking floating window manager with snap grids',
      'Virtual bash terminal with simulated filesystem commands',
      'Glassmorphic design system with dynamic depth layers',
      'PWA support with offline-first local state caching'
    ],
    github: 'https://github.com/developer-senku/chronologic-os'
  },

  'hyperflux-mesh': {
    title: 'HyperFlux Data Mesh',
    badge: 'DISTRIBUTED CLOUD',
    status: 'SCALED PRODUCTION',
    summary: 'Distributed low-latency telemetry streaming engine digesting 1M+ events/second with anomaly detection.',
    diagram: `
+--------------------+        +---------------------+
| INCOMING SENSORS   | -----> | KAFKA PARTITION BUS |
+--------------------+        +---------------------+
                                         |
                                         v
+--------------------+        +---------------------+
| POSTGRESQL / REDIS | <----- | RUST WORKER ENGINE  |
| - Timescale Series |        | - Zero-copy ingest  |
| - Real-time alerts |        | - Stream anomaly ML |
+--------------------+        +---------------------+
`,
    metrics: [
      { label: 'INGESTION RATE', value: '1.2M events/sec' },
      { label: 'P99 LATENCY', value: '4.8ms' },
      { label: 'ZERO-DATA LOSS', value: '100% Guaranteed' }
    ],
    features: [
      'Rust-powered zero-copy network deserialization',
      'Real-time sliding-window statistics and threshold alerts',
      'Distributed fault-tolerance with automated node rebalancing',
      'Prometheus and Grafana telemetry export'
    ],
    github: 'https://github.com/developer-senku/hyperflux-mesh'
  },

  'omnisynth': {
    title: 'OmniSynthesizer',
    badge: 'NEURAL MULTIMODAL',
    status: 'PRODUCTION ACTIVE',
    summary: 'Multimodal pipeline merging speech-to-intent, real-time code execution, and high-fidelity 2D/3D chemical & programmatic rendering.',
    diagram: `
+--------------------+        +---------------------+
| SPEECH/TEXT INPUT  | -----> | INTENT ROUTING CORE |
+--------------------+        +---------------------+
                                         |
            +----------------------------+----------------------------+
            |                                                         |
            v                                                         v
+-------------------------+                               +-------------------------+
| REAL-TIME CODE SANDBOX  |                               | 2D/3D STRUCTURE VISUAL  |
| - Python / JS Execution |                               | - SMILES / Molfile Curation |
| - Test Assertion Checks |                               | - Dynamic WebGL Render  |
+-------------------------+                               +-------------------------+
`,
    metrics: [
      { label: 'SPEECH LATENCY', value: '120ms' },
      { label: 'EXECUTION TIME', value: '< 250ms' },
      { label: 'SUPPORTED MODALITIES', value: 'Text, Audio, Vision, 3D' }
    ],
    features: [
      'Bidirectional live streaming audio interaction',
      'Sandboxed micro-container execution with strict memory caps',
      'Automated fallback across high-capacity multimodal models',
      'Visual code-diff and reactive render pane'
    ],
    github: 'https://github.com/developer-senku/omnisynthesizer'
  },

  'biosynth': {
    title: 'BioSynth Molecular Canvas',
    badge: 'SPATIAL SCIENCE',
    status: 'ACTIVE LAB',
    summary: 'Interactive 3D molecular viewer and protein-ligand conformation analyzer rendered directly within modern WebGL viewports.',
    diagram: `
+--------------------+        +---------------------+
| PDB / mmCIF INPUT  | -----> | SPATIAL PARSER CORE |
+--------------------+        +---------------------+
                                         |
                                         v
+--------------------+        +---------------------+
| THREE.JS ATOM MESH | <----- | CONFORMATION ENGINE |
| - Secondary Ribbon |        | - Hydrogen Bonds    |
| - Surface Density  |        | - Van der Waals     |
+--------------------+        +---------------------+
`,
    metrics: [
      { label: 'ATOM CAPACITY', value: '250,000+ Atoms' },
      { label: 'INTERACTION FPS', value: '60 FPS Smooth' },
      { label: 'PARSER FORMATS', value: 'PDB, mmCIF, SDF' }
    ],
    features: [
      'Interactive ribbons, sticks, and surface rendering modes',
      'Measurement tools for distances, dihedral angles, and clashes',
      'Ligand binding pocket detection and electrostatic potential coloring',
      'GPU instanced rendering for ultra-smooth performance on mobile'
    ],
    github: 'https://github.com/developer-senku/biosynth-canvas'
  }
};

class ProjectModal {
  constructor() {
    this.modal = document.getElementById('projectModal');
    this.modalContent = document.getElementById('projectModalContent');
    this.closeBtn = document.getElementById('closeProjectModal');

    this.init();
  }

  init() {
    // Open modal on clicking "Inspect Architecture"
    document.querySelectorAll('[data-inspect-project]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-inspect-project');
        this.open(projectId);
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open(projectId) {
    const data = PROJECT_BLUEPRINTS[projectId] || PROJECT_BLUEPRINTS['senku-engine'];
    if (!this.modal || !this.modalContent) return;

    this.modalContent.innerHTML = `
      <div style="margin-bottom:1.5rem;">
        <span class="glass-pill glass-badge-senku" style="margin-bottom:0.8rem;">
          <i class="fa-solid fa-microchip"></i> ${data.badge}
        </span>
        <h2 style="font-size:clamp(1.5rem, 4vw, 2.2rem);margin:0.5rem 0;">${data.title}</h2>
        <p style="color:#94a3b8;line-height:1.6;font-size:0.95rem;">${data.summary}</p>
      </div>

      <!-- Telemetry Cards -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(160px, 1fr));gap:1rem;margin-bottom:1.8rem;">
        ${data.metrics.map(m => `
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:0.9rem 1.1rem;">
            <div style="font-family:var(--font-code);font-size:0.75rem;color:#64748b;">${m.label}</div>
            <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:700;color:var(--color-senku-green);margin-top:0.2rem;">${m.value}</div>
          </div>
        `).join('')}
      </div>

      <!-- Architecture ASCII Flowchart -->
      <div style="margin-bottom:1.8rem;">
        <div style="font-family:var(--font-code);font-size:0.85rem;color:var(--color-senku-cyan);margin-bottom:0.5rem;">
          <i class="fa-solid fa-diagram-project"></i> SYSTEM ARCHITECTURE TOPOLOGY:
        </div>
        <pre style="background:rgba(0,0,0,0.6);border:1px solid rgba(0,245,160,0.25);border-radius:14px;padding:1.2rem;overflow-x:auto;font-family:var(--font-code);font-size:0.8rem;color:#a7f3d0;line-height:1.4;"><code>${data.diagram.trim()}</code></pre>
      </div>

      <!-- Key Innovations List -->
      <div style="margin-bottom:2rem;">
        <div style="font-family:var(--font-code);font-size:0.85rem;color:var(--color-senku-green);margin-bottom:0.7rem;">
          <i class="fa-solid fa-shield-halved"></i> TECHNICAL INNOVATIONS:
        </div>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:0.6rem;">
          ${data.features.map(f => `
            <li style="display:flex;align-items:flex-start;gap:0.6rem;font-size:0.9rem;color:#e2e8f0;">
              <i class="fa-solid fa-check" style="color:var(--color-senku-green);margin-top:0.25rem;"></i>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Modal Footer -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:1.2rem;border-top:1px solid rgba(255,255,255,0.08);flex-wrap:wrap;gap:1rem;">
        <span style="font-family:var(--font-code);font-size:0.8rem;color:var(--color-senku-green);">STATUS: ${data.status}</span>
        <div style="display:flex;gap:0.8rem;">
          <a href="${data.github}" target="_blank" rel="noopener" class="btn-glass-primary" style="padding:0.6rem 1.4rem;font-size:0.88rem;">
            <i class="fa-brands fa-github"></i>
            <span>View Source Code</span>
          </a>
        </div>
      </div>
    `;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.soundEngine) window.soundEngine.playActivate();
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.projectModal = new ProjectModal();
});
