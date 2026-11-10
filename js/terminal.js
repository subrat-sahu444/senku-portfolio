/* ==========================================================================
   INTERACTIVE LAB CLI TERMINAL
   Interactive developer terminal with commands, history, and Senku bridge
   ========================================================================== */

(function () {
  const terminalScreen = document.getElementById('termOutput');
  const terminalInput = document.getElementById('termInput');
  const terminalWrapper = document.getElementById('terminalWrapper');

  if (!terminalScreen || !terminalInput) return;

  const history = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
<span style="color:var(--color-senku-green)">Available Laboratory Protocols:</span>
  <span style="color:var(--color-senku-cyan)">help</span>        - Display this protocol list
  <span style="color:var(--color-senku-cyan)">about</span>       - Print creator bio and technical background
  <span style="color:var(--color-senku-cyan)">senku &lt;q&gt;</span>   - Query the Senku AI engine directly
  <span style="color:var(--color-senku-cyan)">skills</span>      - Render technical skill matrix & telemetry
  <span style="color:var(--color-senku-cyan)">projects</span>    - Enumerate active showcase projects
  <span style="color:var(--color-senku-cyan)">formula</span>     - Display the scientific synthesis formula
  <span style="color:var(--color-senku-cyan)">audio</span>       - Toggle UI sound synthesizer
  <span style="color:var(--color-senku-cyan)">matrix</span>      - Initiate visual matrix stream
  <span style="color:var(--color-senku-cyan)">clear</span>       - Clear terminal output
  <span style="color:var(--color-senku-cyan)">contact</span>     - Display communications transmission details
`,
    about: () => `
<span style="color:var(--color-senku-green)">[CREATOR DOSSIER]</span>
Role: Elite Full-Stack Software Engineer & AI System Architect
Focus: Merging 3D Spatial WebGL, Scalable Distributed Systems & Neural Agents.
Philosophy: "Turning 0 into 1 with 10 billion percent scientific dedication."
Status: Available for high-impact engineering & advisory roles.
`,
    skills: () => `
<span style="color:var(--color-senku-green)">[TECHNICAL PROFICIENCY METRICS]</span>
TypeScript / JavaScript [████████████████████] 99%
Python / AI Architecture [██████████████████░] 94%
Three.js / WebGL 3D     [██████████████████░] 92%
React / Next.js / CSS   [████████████████████] 98%
Distributed Cloud / Ops [█████████████████░░] 88%
`,
    projects: () => `
<span style="color:var(--color-senku-green)">[ACTIVE PROJECTS ARCHIVE]</span>
1. <span style="color:var(--color-senku-cyan)">Project Senku</span>      :: Autonomous AI Agent Orchestration Core
2. <span style="color:var(--color-senku-cyan)">Aether 3D Web</span>    :: WebGL Spatial Shader Environment
3. <span style="color:var(--color-senku-cyan)">ChronoLogic OS</span>   :: Glassmorphic Browser OS Desktop
4. <span style="color:var(--color-senku-cyan)">QuantumVault</span>     :: Zero-Knowledge Decentralized Security
Type 'senku &lt;project name&gt;' to ask Senku for in-depth technical blueprints!
`,
    formula: () => `
<span style="color:var(--color-senku-green)">[SENKU'S SCIENTIFIC EQUATION]</span>
   E = mc²  +  (Logic × Iteration)^10,000,000,000%
   -----------------------------------------------
   Nitric Acid + Alcohol = Nital (Revival Formula)
   Science + Code        = Limitless Future
`,
    audio: () => {
      if (window.soundEngine) {
        const state = window.soundEngine.toggle();
        return `Audio synthesizer: <span style="color:var(--color-senku-green)">${state ? 'ACTIVATED' : 'MUTED'}</span>`;
      }
      return 'Audio module not loaded.';
    },
    contact: () => `
<span style="color:var(--color-senku-green)">[TRANSMISSION FREQUENCIES]</span>
Email:    subrat.portfolio@dev.io
GitHub:   github.com/developer-senku
LinkedIn: linkedin.com/in/fullstack-architect
Or submit via the Glassmorphic Transmission Portal below!
`,
    clear: () => {
      terminalScreen.innerHTML = '';
      return '';
    },
    matrix: () => {
      let count = 0;
      const interval = setInterval(() => {
        const chars = '0123456789ABCDEF∆∇∑∏√∫≈≠≡≤≥SENKU';
        let line = '';
        for (let i = 0; i < 40; i++) {
          line += chars.charAt(Math.floor(Math.random() * chars.length)) + ' ';
        }
        const div = document.createElement('div');
        div.style.color = '#00f5a0';
        div.style.fontSize = '0.75rem';
        div.style.fontFamily = 'var(--font-code)';
        div.innerText = line;
        terminalScreen.appendChild(div);
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
        count++;
        if (count > 15) clearInterval(interval);
      }, 70);
      return '<span style="color:var(--color-senku-cyan)">Streaming matrix data packets...</span>';
    }
  };

  function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Echo command
    const echoLine = document.createElement('div');
    echoLine.className = 'term-line';
    echoLine.innerHTML = `<span style="color:var(--color-senku-green)">visitor@senku-lab:~$</span> <span style="color:#fff">${escapeHtml(trimmed)}</span>`;
    terminalScreen.appendChild(echoLine);

    history.push(trimmed);
    historyIndex = history.length;

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let result = '';

    if (cmd === 'senku') {
      if (!args) {
        result = `<span style="color:var(--color-senku-cyan)">SENKU AI:</span> Kukuku! Pass me a query: <code style="color:var(--color-senku-green)">senku &lt;your question&gt;</code>`;
      } else {
        if (window.senkuAI) {
          const resp = window.senkuAI.generateSenkuResponse(args);
          result = `
            <div style="color:var(--color-senku-cyan);font-size:0.8rem;margin-bottom:0.3rem;">[THINKING]: ${escapeHtml(resp.thought?.deconstruction || 'Executing first-principles reasoning.')}</div>
            <div style="color:#f1f5f9;margin-top:0.3rem;"><strong style="color:var(--color-senku-green)">SENKU AI:</strong><br>${resp.content.replace(/\n/g, '<br>')}</div>
          `;
        } else {
          result = `<span style="color:var(--color-senku-green)">SENKU AI:</span> Processing query...`;
        }
      }
    } else if (commands[cmd]) {
      result = commands[cmd]();
    } else {
      result = `<span style="color:#ef4444">Command not recognized: '${escapeHtml(cmd)}'. Type '<span style="color:var(--color-senku-green)">help</span>' for available protocols.</span>`;
    }

    if (result) {
      const resultLine = document.createElement('div');
      resultLine.className = 'term-line';
      resultLine.innerHTML = result;
      terminalScreen.appendChild(resultLine);
    }

    terminalScreen.scrollTop = terminalScreen.scrollHeight;
    if (window.soundEngine) window.soundEngine.playClick();
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = terminalInput.value.toLowerCase().trim();
      const match = Object.keys(commands).find(c => c.startsWith(current));
      if (match) {
        terminalInput.value = match;
      }
    }
  });

  if (terminalWrapper) {
    terminalWrapper.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})();
