/**
 * Renarta — Interactive CRT Terminal Portfolio Engine
 * Standalone vanilla ES6 with Web Audio API mechanical sound synthesis
 */

// State
const state = {
  themeIndex: 0,
  themes: ['theme-catppuccin', 'theme-tokyonight', 'theme-matrix', 'theme-amber'],
  themeNames: ['Catppuccin', 'Tokyo Night', 'Matrix', 'Amber CRT'],
  soundEnabled: true,
  crtEnabled: true,
  history: [],
  historyIndex: -1,
};

// Web Audio API Mechanical Click Synthesizer
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playKeySound(isEnter = false) {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Frequency & pitch simulation of mechanical switches (Cherry MX Blue / Brown "thock")
    const freq = isEnter ? 260 : 380 + Math.random() * 120;
    osc.type = isEnter ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

    gain.gain.setValueAtTime(isEnter ? 0.28 : 0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    // Audio context may fail if restricted by browser before user interaction
  }
}

// Terminal Commands Definition
const COMMANDS = {
  help: () => `
<span class="hl-primary">Available Terminal Commands:</span>
  <span class="hl-secondary">about</span>       - Brief overview of who I am and my engineering philosophy
  <span class="hl-secondary">skills</span>      - Technical arsenal and core competencies
  <span class="hl-secondary">projects</span>    - Showcase of active repositories & software projects
  <span class="hl-secondary">status</span>      - Live system health, time, and workstation availability
  <span class="hl-secondary">stats</span>       - Architecture metrics and repository breakdown table
  <span class="hl-secondary">dotfiles</span>    - Deep dive into my modular Linux workstation setup
  <span class="hl-secondary">neofetch</span>    - System specification & developer environment card
  <span class="hl-secondary">theme</span>       - Cycle or select color theme [catppuccin | matrix | tokyo | amber]
  <span class="hl-secondary">sound</span>       - Toggle synthesized mechanical keyboard audio [on | off]
  <span class="hl-secondary">crt</span>         - Toggle retro CRT scanline & glow overlay [on | off]
  <span class="hl-secondary">contact</span>     - Social profiles, GitHub, and email contact
  <span class="hl-secondary">clear</span>       - Clear the terminal screen buffer

<span class="hl-dim">💡 Tip: Use [Tab] for command auto-completion, or [Up/Down] arrows for history.</span>`,

  status: () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { timeZoneName: 'short' });
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    return `
<span class="hl-primary">⚡ Operational Status & Health Dashboard</span>
  • <span class="hl-secondary">Workstation:</span>      <span class="hl-success">ONLINE 🟢</span> (Wayland / Hyprland Linux)
  • <span class="hl-secondary">Focus State:</span>      <span class="hl-warning">Deep Work Session Active 🍅</span> (ZenFocus)
  • <span class="hl-secondary">Agentic Bridge:</span>   <span class="hl-success">Connected 🤖</span> (git-nexus-mcp on stdio)
  • <span class="hl-secondary">Local Time:</span>       ${dateStr} ${timeStr}
  • <span class="hl-secondary">Portfolio Node:</span>   <a href="https://terminal.riuph.me" target="_blank">terminal.riuph.me</a> (Cloudflare Edge SSL)
  • <span class="hl-secondary">Holding Portal:</span>   <a href="https://riuph.me" target="_blank">riuph.me</a> (RIUPH Master Holding)
  • <span class="hl-secondary">Availability:</span>     Open for High-Impact Projects & Systems Engineering`;
  },

  stats: () => `
<span class="hl-primary">📊 Renarta Ecosystem & Repository Metrics</span>
┌───────────────────────────┬──────────────┬───────────────────────────────┐
│ Repository                │ Language     │ Core Architecture / Engine    │
├───────────────────────────┼──────────────┼───────────────────────────────┤
│ <span class="hl-secondary">renartacayle/zenfocus</span>     │ Go 1.23      │ Bubbletea TUI, ASCII Clock    │
│ <span class="hl-secondary">renartacayle/git-nexus-mcp</span> │ TypeScript   │ Model Context Protocol stdio  │
│ <span class="hl-secondary">renartacayle/dotfiles</span>      │ Bash / Lua   │ GNU Stow, Hyprland, Lazy.nvim │
│ <span class="hl-secondary">renartacayle.github.io</span>    │ HTML5/CSS/JS │ CRT Canvas & Web Audio Synth  │
│ <span class="hl-secondary">renartacayle/renartacayle</span>  │ SVG / CI     │ Dynamic Readme & Snake Matrix │
└───────────────────────────┴──────────────┴───────────────────────────────┘
  • <span class="hl-dim">CI Status:</span>       <span class="hl-success">100% Passing</span> (GitHub Actions Matrix Build)
  • <span class="hl-dim">Performance:</span>     <span class="hl-success">Zero Memory Leak</span> (MCP Verified @ 83.5MB Peak RSS)
  • <span class="hl-dim">Test Suite:</span>      <span class="hl-success">28/28</span> dotfiles symlinks valid | 100% Go unit test coverage`,


  about: () => `
<span class="hl-primary">Name:</span> Renarta (<span class="hl-secondary">renartacayle</span>)
<span class="hl-primary">Role:</span> Software Engineer & System Craftsman
<span class="hl-primary">Location:</span> Indonesia 🇮🇩

<span class="hl-warning">"Simplicity is prerequisite for reliability."</span>

I build fast, resilient software and minimalist developer tooling.
My focus is on Linux systems, terminal workflows, containerization, and modern agentic engineering.
I believe in declarative setups, reproducible environments, and software that respects user memory and CPU.`,

  skills: () => `
<span class="hl-primary">┌── [Core Programming Languages]</span>
│   • C / C++       - Systems programming, memory management & low-level performance
│   • Go / Rust     - Concurrent services, fast CLI utilities & system tooling
│   • Python / TS   - Automation, API design, data processing & modern web
└──

<span class="hl-secondary">┌── [Systems & Developer Tooling]</span>
│   • Linux & Shell - Arch, Ubuntu, Zsh, Bash scripting, IPC, Systemd
│   • Environment   - Neovim (Lua IDE), Tmux, Wayland (Hyprland), GNU Stow
│   • Containers    - Docker, Multi-stage builds, Containerized Test Harnesses
│   • VCS & CI/CD   - Git, GitOps, GitHub Actions workflows, ShellCheck
└──

<span class="hl-success">┌── [Engineering Philosophy]</span>
│   • Zero-bloat architectures, reproducible builds, and defensive code.
└──`,

  projects: () => `
<span class="hl-primary">Featured Open-Source Repositories:</span>

1. <span class="hl-secondary">renartacayle/git-nexus-mcp</span>
   <span class="hl-dim">Model Context Protocol (MCP) server for AI coding agents.</span>
   • Features: Token-optimized diffs, commit analysis, and branch hygiene diagnostics.
   • URL: <a href="https://github.com/renartacayle/git-nexus-mcp" target="_blank">https://github.com/renartacayle/git-nexus-mcp</a>

2. <span class="hl-secondary">renartacayle/zenfocus</span>
   <span class="hl-dim">Minimalist aesthetic Pomodoro & deep work TUI in Go + Bubbletea.</span>
   • Features: Large ASCII digital clock, Catppuccin theme, notify-send desktop alerts.
   • URL: <a href="https://github.com/renartacayle/zenfocus" target="_blank">https://github.com/renartacayle/zenfocus</a>

3. <span class="hl-secondary">renartacayle/dotfiles</span>
   <span class="hl-dim">Idempotent, modular workstation configuration with GNU Stow.</span>
   • Features: Modular Neovim LSP suite, Tmux, Zsh, Hyprland, Docker test harness.
   • URL: <a href="https://github.com/renartacayle/dotfiles" target="_blank">https://github.com/renartacayle/dotfiles</a>

4. <span class="hl-secondary">renartacayle.github.io</span>
   <span class="hl-dim">This interactive CRT terminal web portfolio.</span>
   • Features: Web Audio API keyboard synthesis, scanline shaders, dynamic themes.
   • URL: <a href="https://github.com/renartacayle/renartacayle.github.io" target="_blank">https://github.com/renartacayle/renartacayle.github.io</a>

<span class="hl-dim">Type 'mcp', 'zenfocus', or 'dotfiles' for deep-dive details.</span>`,

  mcp: () => `
<span class="hl-primary">Project Deep-Dive: renartacayle/git-nexus-mcp</span>

<span class="hl-dim">An intelligent Git & Workspace Model Context Protocol (MCP) Server:</span>
• <span class="hl-secondary">Token-Optimized Diffs:</span> Strips lockfiles (package-lock, Cargo.lock, go.sum) to protect LLM context windows.
• <span class="hl-secondary">Universal Compatibility:</span> Seamlessly plugs into Claude Desktop, Cursor, Antigravity, and Gemini.
• <span class="hl-secondary">Architecture Audit:</span> Automatically detects workspace languages, manifests, and git health.

Source & Documentation: <a href="https://github.com/renartacayle/git-nexus-mcp" target="_blank">https://github.com/renartacayle/git-nexus-mcp</a>`,

  zenfocus: () => `
<span class="hl-primary">Project Deep-Dive: renartacayle/zenfocus</span>

<span class="hl-dim">A lightweight, keyboard-driven Pomodoro timer for terminal enthusiasts:</span>
• <span class="hl-secondary">Zero Electron Bloat:</span> Single ~4MB native compiled Go binary.
• <span class="hl-secondary">Aesthetic Lip Gloss TUI:</span> Big 3-line ASCII clock & Catppuccin Mocha theme.
• <span class="hl-secondary">Automated State Machine:</span> Focus (25m), Short Break (5m), Long Break (15m).
• <span class="hl-secondary">Desktop Notifications:</span> Native notify-send integration for break transitions.

Source & Installation: <a href="https://github.com/renartacayle/zenfocus" target="_blank">https://github.com/renartacayle/zenfocus</a>`,

  dotfiles: () => `
<span class="hl-primary">Project Deep-Dive: renartacayle/dotfiles</span>

<span class="hl-dim">A battle-tested developer environment built on 5 fundamental pillars:</span>
1. <span class="hl-secondary">Automated Bootstrap:</span> Idempotent cross-distro installer (Arch/Debian/Ubuntu/Fedora).
2. <span class="hl-secondary">Safety First:</span> Pre-flight backup engine moving old files to ~/.dotfiles_backup/.
3. <span class="hl-secondary">Neovim IDE Suite:</span> Full LSP autocompletion (20+ languages) via Mason & Treesitter AST.
4. <span class="hl-secondary">Cohesive Theming:</span> Unified Catppuccin Mocha palette across terminal & desktop.
5. <span class="hl-secondary">Containerized CI:</span> Verified on every push with Docker Ubuntu 24.04 clean harness.

Explore the source: <a href="https://github.com/renartacayle/dotfiles" target="_blank">https://github.com/renartacayle/dotfiles</a>`,

  neofetch: () => `
<span class="hl-primary">       /\\         renarta@workstation</span>
<span class="hl-primary">      /  \\        -------------------</span>
<span class="hl-secondary">     /\\   \\       OS:</span> Linux (Ubuntu 24.04 / Arch)
<span class="hl-secondary">    /      \\      Host:</span> renartacayle.github.io
<span class="hl-success">   /   ,,   \\     Kernel:</span> 6.8.0-generic
<span class="hl-success">  /   |  |  -\\    Uptime:</span> 100% (High Availability)
<span class="hl-warning"> /_-''    ''-_    Shell:</span> zsh 5.9 + starship
<span class="hl-warning">                 WM:</span> Hyprland (Wayland)
<span class="hl-danger">                 Editor:</span> Neovim (lazy.nvim + Mason)
<span class="hl-danger">                 Terminal:</span> Kitty / Alacritty
<span class="hl-primary">                 Theme:</span> Catppuccin Mocha`,

  contact: () => `
<span class="hl-primary">Connect with Renarta:</span>
  • <span class="hl-secondary">GitHub:</span>   <a href="https://github.com/renartacayle" target="_blank">https://github.com/renartacayle</a>
  • <span class="hl-secondary">Website:</span>  <a href="https://renartacayle.github.io" target="_blank">https://renartacayle.github.io</a>
  • <span class="hl-secondary">Email:</span>    <a href="mailto:renartacayle@gmail.com">renartacayle@gmail.com</a>
  • <span class="hl-secondary">Status:</span>   Open to collaborations, open-source projects, and engineering roles.`,

  sudo: () => `<span class="hl-danger">Permission denied: You are not in the sudoers file. This incident will be reported. 🚨</span>`,

  matrix: () => {
    switchTheme('theme-matrix');
    return `<span class="hl-success">Wake up, Neo... The Matrix has you. Theme switched to Matrix. 🟢</span>`;
  },
};

// DOM Elements
const cliInput = document.getElementById('cli-input');
const outputContainer = document.getElementById('output-container');
const terminalScreen = document.getElementById('terminal-screen');
const toggleSoundBtn = document.getElementById('toggle-sound');
const toggleCrtBtn = document.getElementById('toggle-crt');
const themeBtn = document.getElementById('theme-btn');
const themeLabel = document.getElementById('current-theme-label');

function focusInput() {
  cliInput.focus();
}

// Banner Rendering on Start
function renderBanner() {
  const bannerHTML = `
<div class="ascii-banner">
██████╗ ███████╗███╗   ██╗ █████╗ ██████╗ ████████╗ █████╗ 
██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
██████╔╝█████╗  ██╔██╗ ██║███████║██████╔╝   ██║   ███████║
██╔══██╗██╔══╝  ██║╚██╗██║██╔══██║██╔══██╗   ██║   ██╔══██║
██║  ██║███████╗██║ ╚████║██║  ██║██║  ██║   ██║   ██║  ██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
</div>
<span class="hl-primary">Welcome to Renarta's Interactive Terminal Portfolio v2.0!</span>
Type <span class="hl-warning">'help'</span> to explore available commands or click any shortcut pill below.
`;
  printOutput('', bannerHTML);
}

// Print command and output into buffer
function printOutput(cmd, responseHTML) {
  const entry = document.createElement('div');
  entry.className = 'cmd-entry';

  if (cmd) {
    entry.innerHTML = `
      <div class="cmd-history-line">
        <span class="prompt">
          <span class="user">renarta</span><span class="at">@</span><span class="host">github</span>:<span class="path">~</span><span class="symbol">$</span>
        </span>
        <span>${escapeHtml(cmd)}</span>
      </div>
      <div class="cmd-response">${responseHTML}</div>
    `;
  } else {
    entry.innerHTML = `<div class="cmd-response">${responseHTML}</div>`;
  }

  outputContainer.appendChild(entry);
  terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}

// Execute Command Handler
function handleCommand(rawInput) {
  const input = rawInput.trim();
  if (!input) return;

  playKeySound(true);
  state.history.push(input);
  state.historyIndex = state.history.length;

  const parts = input.split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (cmd === 'clear') {
    outputContainer.innerHTML = '';
    return;
  }

  if (cmd === 'theme') {
    if (args.length > 0) {
      const target = args[0].toLowerCase();
      if (target.includes('cat')) switchTheme('theme-catppuccin');
      else if (target.includes('mat')) switchTheme('theme-matrix');
      else if (target.includes('tok')) switchTheme('theme-tokyonight');
      else if (target.includes('amb')) switchTheme('theme-amber');
      else {
        printOutput(input, `<span class="hl-danger">Unknown theme '${args[0]}'. Available: catppuccin, matrix, tokyo, amber</span>`);
        return;
      }
    } else {
      cycleTheme();
    }
    printOutput(input, `<span class="hl-success">Theme updated to: ${themeLabel.innerText}</span>`);
    return;
  }

  if (cmd === 'sound') {
    toggleSound();
    printOutput(input, `<span class="hl-success">Mechanical sound effects: ${state.soundEnabled ? 'ENABLED 🔊' : 'MUTED 🔇'}</span>`);
    return;
  }

  if (cmd === 'crt') {
    toggleCrt();
    printOutput(input, `<span class="hl-success">CRT Scanline overlay: ${state.crtEnabled ? 'ENABLED 📺' : 'DISABLED'}</span>`);
    return;
  }

  if (COMMANDS[cmd]) {
    const res = COMMANDS[cmd](args);
    printOutput(input, res);
  } else {
    printOutput(input, `<span class="hl-danger">Command not found: '${escapeHtml(input)}'. Type <span class="hl-warning">'help'</span> for a list of valid commands.</span>`);
  }
}

// Theme Switching
function switchTheme(themeClass) {
  state.themes.forEach(t => document.body.classList.remove(t));
  document.body.classList.add(themeClass);
  state.themeIndex = state.themes.indexOf(themeClass);
  themeLabel.innerText = state.themeNames[state.themeIndex];
}

function cycleTheme() {
  state.themeIndex = (state.themeIndex + 1) % state.themes.length;
  switchTheme(state.themes[state.themeIndex]);
}

// Toggles
function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  document.body.classList.toggle('sound-active', state.soundEnabled);
  toggleSoundBtn.querySelector('.sound-text').innerText = state.soundEnabled ? 'Sound: ON' : 'Sound: OFF';
  toggleSoundBtn.querySelector('.sound-icon').innerText = state.soundEnabled ? '🔊' : '🔇';
}

function toggleCrt() {
  state.crtEnabled = !state.crtEnabled;
  document.body.classList.toggle('crt-active', state.crtEnabled);
  toggleCrtBtn.querySelector('.crt-text').innerText = state.crtEnabled ? 'CRT: ON' : 'CRT: OFF';
}

// UI Triggers for Buttons
function execCmd(commandName) {
  cliInput.value = commandName;
  handleCommand(commandName);
  cliInput.value = '';
  focusInput();
}

// Event Listeners
cliInput.addEventListener('keydown', (e) => {
  playKeySound(e.key === 'Enter');

  if (e.key === 'Enter') {
    const val = cliInput.value;
    cliInput.value = '';
    handleCommand(val);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (state.historyIndex > 0) {
      state.historyIndex--;
      cliInput.value = state.history[state.historyIndex] || '';
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++;
      cliInput.value = state.history[state.historyIndex] || '';
    } else {
      state.historyIndex = state.history.length;
      cliInput.value = '';
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const current = cliInput.value.trim().toLowerCase();
    if (!current) return;
    const matches = Object.keys(COMMANDS).concat(['theme', 'sound', 'crt', 'clear']).filter(c => c.startsWith(current));
    if (matches.length === 1) {
      cliInput.value = matches[0];
    } else if (matches.length > 1) {
      printOutput(current, `<span class="hl-dim">${matches.join('   ')}</span>`);
    }
  }
});

// Titlebar button triggers
toggleSoundBtn.addEventListener('click', toggleSound);
toggleCrtBtn.addEventListener('click', toggleCrt);
themeBtn.addEventListener('click', cycleTheme);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderBanner();
  focusInput();
});
