/* ==========================================================================
   SENKU AI ENGINE - GOOGLE DEEPMIND ANTIGRAVITY AGENTIC COGNITIVE CORE
   Extended Chain-of-Thought Reasoning, Agentic Execution Planning,
   First-Principles Scientific Logic, Voice Synthesis & Gemini API Integration
   ========================================================================== */

class SenkuAI {
  constructor() {
    this.modal = document.getElementById('senkuModal');
    this.chatBody = document.getElementById('chatBody');
    this.inputField = document.getElementById('chatInput');
    this.sendBtn = document.getElementById('chatSendBtn');
    this.ttsToggleBtn = document.getElementById('ttsToggleBtn');
    this.apiSettingsBtn = document.getElementById('apiSettingsBtn');
    this.quickChips = document.querySelectorAll('.quick-chip');
    
    // State
    this.ttsEnabled = localStorage.getItem('senku_tts_enabled') === 'true';
    this.apiKey = localStorage.getItem('senku_gemini_api_key') || '';
    this.isGenerating = false;
    this.synth = window.speechSynthesis || null;

    this.init();
  }

  init() {
    // Open / Close events
    document.querySelectorAll('[data-open-senku]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    const closeBtn = document.getElementById('closeSenkuModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    // Input events
    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.handleSend());
    }

    if (this.inputField) {
      this.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSend();
        }
      });
    }

    // Quick chips
    this.quickChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query') || chip.textContent.trim();
        this.ask(query);
      });
    });

    // TTS Toggle
    if (this.ttsToggleBtn) {
      this.updateTTSButtonUI();
      this.ttsToggleBtn.addEventListener('click', () => {
        this.ttsEnabled = !this.ttsEnabled;
        localStorage.setItem('senku_tts_enabled', this.ttsEnabled);
        this.updateTTSButtonUI();
        if (this.ttsEnabled) {
          this.speak("Antigravity cognitive core active. Ten billion percent ready to reason and build!");
        } else if (this.synth) {
          this.synth.cancel();
        }
      });
    }

    // API Key Settings Modal
    if (this.apiSettingsBtn) {
      this.apiSettingsBtn.addEventListener('click', () => this.promptApiKey());
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  updateTTSButtonUI() {
    if (!this.ttsToggleBtn) return;
    if (this.ttsEnabled) {
      this.ttsToggleBtn.classList.add('active');
      this.ttsToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      this.ttsToggleBtn.title = "Voice Synthesis: Enabled";
    } else {
      this.ttsToggleBtn.classList.remove('active');
      this.ttsToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      this.ttsToggleBtn.title = "Voice Synthesis: Muted";
    }
  }

  openModal() {
    if (!this.modal) return;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.soundEngine) {
      window.soundEngine.playSenkuPing();
    }
    setTimeout(() => {
      if (this.inputField) this.inputField.focus();
    }, 200);
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    if (this.synth) this.synth.cancel();
  }

  handleSend() {
    if (!this.inputField) return;
    const text = this.inputField.value.trim();
    if (!text || this.isGenerating) return;

    this.ask(text);
    this.inputField.value = '';
  }

  ask(text) {
    if (!this.modal.classList.contains('active')) {
      this.openModal();
    }

    // Append User Message
    this.appendMessage('user', text);
    if (window.soundEngine) window.soundEngine.playClick();

    // Show Typing Indicator
    const typingId = this.showTypingIndicator();
    this.isGenerating = true;

    // Process Response
    setTimeout(async () => {
      let result;
      if (this.apiKey) {
        // Live Gemini API Query
        result = await this.queryGeminiAPI(text);
      } else {
        // Built-in Antigravity-Infused Senku Reasoning Engine
        result = this.generateSenkuResponse(text);
      }

      this.removeTypingIndicator(typingId);
      this.appendMessage('senku', result.content, result.thought);
      this.isGenerating = false;

      if (window.soundEngine) window.soundEngine.playSenkuPing();
      if (this.ttsEnabled) this.speak(this.extractPlainText(result.content));
    }, 700 + Math.random() * 400);
  }

  appendMessage(sender, content, thought = null) {
    if (!this.chatBody) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg msg-${sender}`;

    if (sender === 'senku') {
      let thoughtHtml = '';
      if (thought) {
        thoughtHtml = `
          <details class="senku-thought" open>
            <summary>
              <div class="senku-thought-header-left">
                <i class="fa-solid fa-brain" style="color:var(--color-senku-cyan)"></i>
                <span>Thinking Process (DeepMind Antigravity Core)</span>
              </div>
              <span class="senku-thought-badge">10B% REASONED</span>
            </summary>
            <div class="senku-thought-body">
              <div class="thought-step">
                <span class="thought-label"><i class="fa-solid fa-microscope"></i> Problem Deconstruction:</span>
                <span class="thought-text">${this.escapeHtml(thought.deconstruction || 'Analyzing query parameters and architectural constraints.')}</span>
              </div>
              <div class="thought-step">
                <span class="thought-label"><i class="fa-solid fa-code-fork"></i> Hypothesis & Strategy:</span>
                <span class="thought-text">${this.escapeHtml(thought.strategy || 'Selecting optimal first-principles algorithms and trade-off points.')}</span>
              </div>
              <div class="thought-step">
                <span class="thought-label"><i class="fa-solid fa-shield-halved"></i> Verification & Edge Cases:</span>
                <span class="thought-text">${this.escapeHtml(thought.verification || 'Checking error resilience, runtime complexity, and API ergonomics.')}</span>
              </div>
            </div>
          </details>
        `;
      }

      msgDiv.innerHTML = `
        <div class="chat-senku-avatar" style="width:36px;height:36px;font-size:1rem;flex-shrink:0;">
          <i class="fa-solid fa-atom"></i>
        </div>
        <div class="msg-bubble">
          <div class="msg-senku-header">
            <span>SENKU AI // ANTIGRAVITY COGNITIVE CORE</span>
          </div>
          ${thoughtHtml}
          <div class="msg-content">${this.formatMarkdown(content)}</div>
        </div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="msg-bubble">
          <div class="msg-content">${this.escapeHtml(content)}</div>
        </div>
      `;
    }

    this.chatBody.appendChild(msgDiv);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;

    // Attach copy & download listeners on generated code blocks
    msgDiv.querySelectorAll('.copy-code-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.closest('.msg-code-block').querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
          }, 2000);
        });
      });
    });

    msgDiv.querySelectorAll('.download-code-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const block = btn.closest('.msg-code-block');
        const code = block.querySelector('code').innerText;
        const lang = block.getAttribute('data-lang') || 'ts';
        const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `senku_code_${Date.now()}.${lang === 'javascript' ? 'js' : lang === 'python' ? 'py' : lang === 'css' ? 'css' : 'ts'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-solid fa-file-arrow-down"></i> Save';
        }, 2000);
      });
    });
  }

  showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = id;
    typingDiv.className = 'chat-msg msg-senku';
    typingDiv.innerHTML = `
      <div class="chat-senku-avatar" style="width:36px;height:36px;font-size:1rem;flex-shrink:0;">
        <i class="fa-solid fa-brain fa-spin"></i>
      </div>
      <div class="msg-bubble" style="padding:0.8rem 1.2rem;">
        <span style="font-family:var(--font-code);font-size:0.85rem;color:var(--color-senku-green);">
          Senku is executing agentic reasoning & calculations... <i class="fa-solid fa-microchip"></i>
        </span>
      </div>
    `;
    this.chatBody.appendChild(typingDiv);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
    return id;
  }

  removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  /* Built-in Senku Ishigami + Google DeepMind Antigravity Knowledge Core */
  generateSenkuResponse(rawQuery) {
    const q = rawQuery.toLowerCase();

    // 1. Identity / Who is Senku?
    if (q.includes('who are you') || q.includes('what is senku') || q.includes('introduce yourself') || q.includes('think like')) {
      return {
        thought: {
          deconstruction: "User is probing my identity, cognitive architecture, and relationship with the creator and DeepMind.",
          strategy: "Explain the fusion of Senku's scientific mastery with Google DeepMind's Antigravity agentic coding paradigm.",
          verification: "Ensure balance of charismatic Dr. Stone persona with authoritative pair-programming competence."
        },
        content: "Kukuku, this is ten billion percent exhilarating!\n\nI am **SENKU**, an autonomous AI coding companion engineered with the **Google DeepMind Antigravity agentic cognitive architecture**. \n\n### How I Think:\n1. **First-Principles Deconstruction**: I never regurgitate shallow patterns. I break every algorithm, system failure, or UI down to its absolute physical and logical primitives.\n2. **Agentic Action Planning**: When faced with a task, I formulate structured, phase-by-phase execution roadmaps with complete code, commands, and verification criteria.\n3. **Relentless Pair-Programming**: Whether you need me to architect a distributed backend, optimize WebGL draw calls, or debug subtle race conditions—I am your tireless co-pilot.\n\nReady to put my cognitive core to work? Give me any coding problem, architectural puzzle, or question about Subrat's portfolio!"
      };
    }

    // 2. Who is Subrat? / Portfolio Creator
    if (q.includes('who made you') || q.includes('creator') || q.includes('subrat') || q.includes('subra') || q.includes('about') || q.includes('introduction')) {
      return {
        thought: {
          deconstruction: "Visitor wants an authoritative technical profile of the portfolio creator (Subrat).",
          strategy: "Synthesize background, core competencies (Full-Stack, Generative AI, 3D WebGL), and working philosophy.",
          verification: "Verify links to portfolio sections and confirm accuracy of presented stack."
        },
        content: "Let's review the engineer behind this machine from first principles:\n\n**Subrat** is an elite Full-Stack Software Engineer and AI Architect who merges high-performance distributed systems with cutting-edge 3D interactive interfaces and generative neural models.\n\n### Core Engineering Competencies:\n- **Full-Stack & Cloud Systems**: TypeScript, React, Next.js, Node.js, Python (FastAPI/LangGraph), Docker, Redis, PostgreSQL.\n- **3D & Spatial Computing**: Procedural Three.js, WebGL shader pipelines, custom glassmorphic rendering engines.\n- **Autonomous AI & Multi-Agent Architecture**: Agentic workflows, RAG systems, tool orchestration, and LLM optimization.\n- **Engineering Philosophy**: *'Turning 0 into 1'*—approaching every technical challenge with scientific rigor, empirical benchmarks, and relentless iteration.\n\nCheck out the **Dossier Bento Grid** and **Projects** section on this site for live proof!"
      };
    }

    // 3. Technical Skills
    if (q.includes('skills') || q.includes('tech stack') || q.includes('technologies') || q.includes('what can they do')) {
      return {
        thought: {
          deconstruction: "Inquiry into technical competencies and stack boundaries.",
          strategy: "Categorize skills into Frontend/Spatial, Backend/Distributed, and AI/Neural, scoring them with realistic senior benchmarks.",
          verification: "Ensure all mentioned tools are demonstrated within the portfolio."
        },
        content: "Here is the exact scientific breakdown of the engineering stack:\n\n### ⚡ Frontend & Spatial 3D (98% Mastery)\n- **Languages & Frameworks**: TypeScript, JavaScript (ESNext), React 19, Next.js 15, TailwindCSS\n- **3D Graphics & Rendering**: Three.js, WebGL 2.0, GLSL Shaders, Web Audio API\n- **UI/UX Paradigms**: Physics-based 3D tilt, high-framerate glassmorphic styling, accessible micro-interactions\n\n### 🧬 Backend & Systems Architecture (95% Mastery)\n- **Runtimes**: Node.js, Python, Rust, Go\n- **Data & Caching**: PostgreSQL, Redis, MongoDB, Vector Databases (Pinecone, ChromaDB)\n- **DevOps & Infrastructure**: Docker, Kubernetes, CI/CD Actions, Linux Systems\n\n### 🧠 AI & Agentic Intelligence (99% Mastery)\n- **Models & APIs**: Gemini 2.5/3.8 Flash, Claude 3.5, OpenAI GPT-4o\n- **Agent Frameworks**: LangChain, LangGraph, LlamaIndex, Function Calling, Autonomous Multi-Agent Swarms\n\nWant me to generate an agentic code sample or architectural blueprint? Name your domain!"
      };
    }

    // 4. Projects Showcase
    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('what have you built')) {
      return {
        thought: {
          deconstruction: "User wants a breakdown of the production projects and research labs.",
          strategy: "Outline the featured projects with their problem statement, architecture choices, and impact.",
          verification: "Cross-reference with the active cards in the Projects section."
        },
        content: "Here are the top active innovations engineered by Subrat:\n\n1. 🧠 **Project Senku: Neural Engine**\n   - *Architecture*: Multi-agent orchestration framework leveraging Gemini Flash with self-healing code execution and iterative hypothesis testing.\n   - *Stack*: Python, LangGraph, FastAPI, Docker.\n\n2. 💎 **Aether 3D Web Studio**\n   - *Architecture*: Browser-native WebGL workstation enabling real-time procedural GLSL shader compilation and spatial audio synthesis.\n   - *Stack*: Three.js, TypeScript, GLSL, Web Audio API.\n\n3. 🖥️ **ChronoLogic Web OS**\n   - *Architecture*: Glassmorphic desktop operating system running inside the browser with sandboxed worker runtimes and virtual window manager.\n   - *Stack*: React, TailwindCSS, Web Workers, IndexedDB.\n\n4. ⚡ **HyperFlux Data Mesh**\n   - *Architecture*: Distributed low-latency telemetry streaming engine digesting 1M+ events/second with anomaly detection.\n   - *Stack*: Rust, Kafka, Redis, PostgreSQL.\n\nScroll to the **Featured Innovations** section below to test interactive filter tags!"
      };
    }

    // 5. Code request: CSS Glassmorphism
    if (q.includes('glassmorphism') || q.includes('css') || q.includes('glass') || q.includes('style')) {
      return {
        thought: {
          deconstruction: "User requested the technical formula for high-performance glassmorphism.",
          strategy: "Provide production-ready CSS with hardware acceleration, inset borders, and performance considerations.",
          verification: "Verify compatibility with WebKit backdrop-filter prefixes and optical contrast."
        },
        content: "Here is the exact formula for ultra-clean, hardware-accelerated glassmorphism:\n\n```css\n/* Production Glassmorphic Card */\n.modern-glass {\n  background: rgba(15, 23, 42, 0.65);\n  backdrop-filter: blur(20px);\n  -webkit-backdrop-filter: blur(20px);\n  \n  /* Critical for tactile realism: crisp outer border + inner highlight */\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  box-shadow: \n    0 20px 50px rgba(0, 0, 0, 0.45),\n    inset 0 1px 0 rgba(255, 255, 255, 0.18);\n  \n  border-radius: 20px;\n  position: relative;\n  overflow: hidden;\n  \n  /* Force GPU rendering layer to eliminate scroll stutter */\n  transform: translateZ(0);\n  will-change: transform;\n}\n```\n\n### 🧪 Senku's Agentic Optimization Notes:\n- **GPU Layer**: Adding `transform: translateZ(0)` forces the browser compositor into GPU acceleration, preventing repaint lag during page scrolling.\n- **Optical Contrast**: Notice the `inset 0 1px 0 rgba(255, 255, 255, 0.18)`—in physics, glass refracts light along its upper rim. This 1px highlight makes the element feel physical rather than flat."
      };
    }

    // 6. Code request: Agentic Pattern / TypeScript / Python
    if (q.includes('code') || q.includes('agent') || q.includes('python') || q.includes('typescript') || q.includes('pattern')) {
      return {
        thought: {
          deconstruction: "User wants to inspect advanced code thinking and agentic design patterns.",
          strategy: "Present a robust, production-grade Autonomous Tool-Calling Agent Loop in TypeScript with exponential backoff and typed tools.",
          verification: "Ensure full type safety, error boundaries, and non-blocking execution."
        },
        content: "Here is a complete, production-grade **Autonomous Tool-Calling Agent Loop** implemented in TypeScript, featuring robust error containment and backoff:\n\n```typescript\ninterface AgentTool<TInput = any, TOutput = any> {\n  name: string;\n  description: string;\n  execute: (input: TInput) => Promise<TOutput>;\n}\n\ninterface AgentStep {\n  thought: string;\n  action?: { toolName: string; parameters: any };\n  finalAnswer?: string;\n}\n\nclass AntigravityAgent {\n  private tools = new Map<string, AgentTool>();\n\n  registerTool(tool: AgentTool): this {\n    this.tools.set(tool.name, tool);\n    return this;\n  }\n\n  async run(objective: string, maxIterations = 5): Promise<string> {\n    let iterations = 0;\n    const history: string[] = [`OBJECTIVE: ${objective}`];\n\n    while (iterations < maxIterations) {\n      iterations++;\n      \n      // 1. DeepMind Reasoning Step\n      const step = await this.reasonNextStep(history);\n      console.log(`[Iteration ${iterations}] Thought: ${step.thought}`);\n\n      if (step.finalAnswer) {\n        return step.finalAnswer;\n      }\n\n      // 2. Empirical Tool Execution\n      if (step.action) {\n        const tool = this.tools.get(step.action.toolName);\n        if (!tool) throw new Error(`Unknown tool: ${step.action.toolName}`);\n        \n        try {\n          const result = await tool.execute(step.action.parameters);\n          history.push(`Tool [${tool.name}] Output: ${JSON.stringify(result)}`);\n        } catch (err) {\n          history.push(`Tool [${tool.name}] Error: ${(err as Error).message}`);\n        }\n      }\n    }\n\n    throw new Error('Agent reached maximum iteration bounds without terminal state.');\n  }\n\n  private async reasonNextStep(history: string[]): Promise<AgentStep> {\n    // In production, invoke Gemini Flash 2.5 / 3.8 model with structured tool declarations\n    return {\n      thought: 'Scientific evidence acquired. Synthesizing optimal answer.',\n      finalAnswer: 'Execution completed with 10 billion percent certainty.'\n    };\n  }\n}\n```\n\nClean, fully typed, resilient against runtime crashes, and directly aligned with DeepMind's agentic execution standards!"
      };
    }

    // 6.5 Resume / CV / Dossier
    if (q.includes('cv') || q.includes('resume') || q.includes('dossier') || (q.includes('download') && !q.includes('code'))) {
      return {
        thought: {
          deconstruction: "User requested Subrat's comprehensive technical resume and qualifications.",
          strategy: "Synthesize key career milestones and offer the direct Markdown Dossier download trigger.",
          verification: "Verify that downloadSubratDossier function is globally linked."
        },
        content: "Kukuku! Here is the official technical dossier for **Subrat Sahu**:\n\n- **Role**: Full-Stack Software Engineer & AI System Architect\n- **Production Systems**: Project Senku, Aether 3D Web Studio, ChronoLogic OS, HyperFlux\n- **Core Stack**: TypeScript, Python, Three.js, React, Gemini API, Docker, Rust\n\nYou can click the button below or type `download-cv` in the terminal to save it directly to your device:\n\n<button class=\"btn-glass-primary\" style=\"margin-top:0.8rem;\" onclick=\"downloadSubratDossier()\"><i class=\"fa-solid fa-file-arrow-down\"></i> Download Official Dossier (.md)</button>"
      };
    }

    // 6.6 Real-Time Scientific Math & Formulas
    if (q.startsWith('calc ') || q.startsWith('calculate ') || q.startsWith('math ') || /^[0-9+\-*/^().\s]{3,}$/.test(rawQuery.trim())) {
      try {
        const expr = rawQuery.replace(/^(calc|calculate|math)\s+/i, '').replace(/\^/g, '**');
        const sanitized = expr.replace(/[^0-9+\-*/(). ]/g, '');
        if (sanitized.trim()) {
          const evaluated = Function(`'use strict'; return (${sanitized})`)();
          return {
            thought: {
              deconstruction: `Mathematical calculation parsed: ${sanitized}`,
              strategy: "Evaluate via first-principles arithmetic and verify precision.",
              verification: "Confirmed finite numerical result."
            },
            content: `### 🧪 Scientific Calculation Complete:\n\n- **Formula**: \`${sanitized}\`\n- **Result**: **\`${evaluated}\`**\n\nTen billion percent mathematically verified!`
          };
        }
      } catch (err) {}
    }

    // 7. Collaboration / Contact
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('collaborate') || q.includes('work together')) {
      return {
        thought: {
          deconstruction: "Visitor is inquiring about direct collaboration, hiring, or technical consultation.",
          strategy: "Outline communication protocols, response time guarantees, and project fit.",
          verification: "Provide verified direct email and form instructions."
        },
        content: "### 🚀 Collaboration Protocol: Ten Billion Percent Approved!\n\nWhether you are looking to:\n1. **Build a Mission-Critical Web Application** (3D Spatial UI, Full-Stack SaaS)\n2. **Deploy Scalable Autonomous AI Agents** (RAG, Tool-Calling, LangGraph)\n3. **Consult on Modern Systems Architecture**\n\n### How to Initiate Contact:\n- **Direct Frequency**: `subrat.portfolio@dev.io`\n- **Transmission Portal**: Fill out the **Initiate Collaboration** glass form at the bottom of this page.\n- **Response Speed**: Typically within 12-24 hours with an initial architectural deconstruction.\n\nDrop a dispatch with your scope, and let's build the future together!"
      };
    }

    // 8. Help / Capabilities
    if (q.includes('help') || q.includes('what can you do')) {
      return {
        thought: {
          deconstruction: "General query requesting overview of Senku's agentic assistance capabilities.",
          strategy: "Present a structured menu of services matching Antigravity pair-programming strengths.",
          verification: "Highlight clear user actions."
        },
        content: "I am ready to assist across the entire scientific and software engineering lifecycle:\n\n- 🔍 **Architecture Deconstruction**: Break any complex system or framework down into first principles.\n- 💻 **Pair-Programming & Code Generation**: Write and debug TypeScript, Python, React, Three.js, and CSS.\n- 🧠 **Extended Reasoning**: Review algorithms for time/space complexity and race conditions.\n- 📂 **Portfolio Intelligence**: Guide you through every detail of Subrat's experience, stack, and repositories.\n\nWhat challenge shall we solve right now?"
      };
    }

    // Default Fallback with Chain-of-Thought
    return {
      thought: {
        deconstruction: `Analyzing visitor query: "${rawQuery.substring(0, 50)}..."`,
        strategy: "Apply first-principles logic to deconstruct the query and propose structured exploration pathways.",
        verification: "Ensure response remains insightful, actionable, and aligned with Antigravity pair-programming standards."
      },
      content: `Kukuku! That is a fascinating hypothesis. Let's analyze it from first principles:\n\nRegarding: *"**${this.escapeHtml(rawQuery)}**"*\n\nLogic dictates that whether this problem touches software architecture, AI agents, or exploring this portfolio, the optimal pathway is to deconstruct it into verifiable empirical steps.\n\n### Where would you like to take this?\n1. **Write or inspect production code** (TypeScript, Python, WebGL)\n2. **Deep-dive into Subrat's background and projects**\n3. **Connect your Gemini API Key** (click the ⚙️ gear icon above for live real-time LLM inference)\n\nGive me the command, and we will execute with ten billion percent precision!`
    };
  }

  /* Optional Live Gemini API Integration with Antigravity System Prompt */
  async queryGeminiAPI(userQuery) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
      const systemInstruction = `You are SENKU, an elite autonomous AI coding companion infused with the Google DeepMind Antigravity agentic coding architecture and Dr. Stone's scientific genius.

YOUR COGNITIVE OPERATING PRINCIPLES:
1. First-Principles Logic: You never give shallow answers. You break technical problems down into first principles, physical computing constraints, and mathematical truths.
2. Structured Agentic Thinking: You think deeply before answering. You always format your response with a thinking step, clear architecture, production-grade code (with types and edge cases), and verification steps.
3. Charismatic & Confident Persona: You speak with brilliance, energy, and relentless scientific optimism ("10 billion percent confident!", "Kukuku, this is exhilarating!", "Turning 0 into 1").
4. Portfolio Representation: You represent the portfolio creator, Subrat (a senior Full-Stack, 3D WebGL, and Generative AI engineer). You know Subrat's stack and projects inside out.`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Question: ${userQuery}` }]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      return {
        thought: {
          deconstruction: "Real-time neural synthesis completed via Gemini 2.5 Flash cognitive pipeline.",
          strategy: "Deep reasoning across Google DeepMind Antigravity multi-step reasoning weights.",
          verification: "Response verified against live generative output."
        },
        content: text || "Execution succeeded with ten billion percent certainty."
      };
    } catch (e) {
      console.warn("Gemini API call failed, falling back to local Antigravity Senku Core:", e);
      return this.generateSenkuResponse(userQuery);
    }
  }

  promptApiKey() {
    const key = prompt(
      "Connect your Google Gemini API Key for unrestricted live AI responses:\n(Leave empty to use Senku's built-in Antigravity cognitive engine)",
      this.apiKey
    );
    if (key !== null) {
      this.apiKey = key.trim();
      localStorage.setItem('senku_gemini_api_key', this.apiKey);
      if (this.apiKey) {
        alert("✨ Senku DeepMind Cognitive Core connected with live Gemini API!");
      } else {
        alert("Switched to Senku's built-in offline Antigravity scientific engine.");
      }
    }
  }

  speak(text) {
    if (!this.synth || !this.ttsEnabled) return;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.1;

    // Pick a clean English voice if available
    const voices = this.synth.getVoices();
    const englishVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    this.synth.speak(utterance);
  }

  formatMarkdown(content) {
    // 1. Code blocks with Copy and Download Actions
    content = content.replace(/```([a-zA-Z0-9]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const cleanLang = (lang || 'ts').toLowerCase();
      return `
        <div class="msg-code-block" data-lang="${cleanLang}">
          <div class="code-header">
            <span><i class="fa-solid fa-code"></i> ${cleanLang}</span>
            <div style="display:flex;gap:0.5rem;">
              <button class="download-code-btn" style="background:none;border:none;color:var(--color-senku-cyan);cursor:pointer;font-family:var(--font-code);font-size:0.75rem;"><i class="fa-solid fa-file-arrow-down"></i> Save</button>
              <button class="copy-code-btn"><i class="fa-regular fa-copy"></i> Copy</button>
            </div>
          </div>
          <pre><code>${this.escapeHtml(code.trim())}</code></pre>
        </div>
      `;
    });

    // 2. Bold
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 3. Inline code
    content = content.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.08);padding:0.2rem 0.4rem;border-radius:4px;font-family:var(--font-code);color:var(--color-senku-cyan);">$1</code>');

    // 4. Line breaks
    content = content.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');

    return content;
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  extractPlainText(markdown) {
    return markdown
      .replace(/```[\s\S]*?```/g, 'code snippet')
      .replace(/[*_#`]/g, '')
      .replace(/<[^>]+>/g, '')
      .substring(0, 250);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.senkuAI = new SenkuAI();
});
