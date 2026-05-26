/* ==========================================================================
   SENTINEL VADI — INTERACTIVE SYSTEM CORE
   VADI LABS R&D — ADVANCED AUTOMATION PIPELINE INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTelemetry();
  initTerminal();
  initWebAudio();
});

/* 1. REAL-TIME TELEMETRY SIMULATION */
function initTelemetry() {
  const gpuTempEl = document.getElementById('val-gpu-temp');
  const gpuFill = document.getElementById('fill-gpu-temp');
  const fpsEl = document.getElementById('val-fps');
  const fpsFill = document.getElementById('fill-fps');
  const queueEl = document.getElementById('val-queue');
  const queueFill = document.getElementById('fill-queue');
  const loadEl = document.getElementById('val-load');
  const loadFill = document.getElementById('fill-load');

  function update() {
    // Fluctuations around realistic high-fidelity targets
    const temp = (64 + Math.sin(Date.now() / 2000) * 2.4).toFixed(1);
    const fps = (58.4 + Math.cos(Date.now() / 1500) * 3.1).toFixed(1);
    const load = (32.8 + Math.sin(Date.now() / 3000) * 5.2).toFixed(1);
    
    // Occasionally simulate AI render batches
    const queueVal = Math.max(0, Math.floor(Math.sin(Date.now() / 10000) * 3 + 1));

    if (gpuTempEl) gpuTempEl.textContent = `${temp}°C`;
    if (gpuFill) gpuFill.style.width = `${(temp / 100) * 100}%`;

    if (fpsEl) fpsEl.textContent = `${fps} fps`;
    if (fpsFill) fpsFill.style.width = `${(fps / 80) * 100}%`;

    if (loadEl) loadEl.textContent = `${load}%`;
    if (loadFill) loadFill.style.width = `${load}%`;

    if (queueEl) queueEl.textContent = `${queueVal} jobs`;
    if (queueFill) queueFill.style.width = `${(queueVal / 5) * 100}%`;
  }

  setInterval(update, 1000);
  update();
}

/* 2. WEB AUDIO API SYNTHESIZER */
let audioCtx = null;

function initWebAudio() {
  // Lazily initialized on first user interaction
  document.body.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, { once: true });
}

function playBeep(freq, type = 'sine', duration = 0.08, volume = 0.12) {
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.error("Web Audio sweep failed:", e);
  }
}

function playScanSound() {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.8);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(now + 0.9);
  } catch (e) {
    console.error("Scan sound failed:", e);
  }
}

/* 3. DYNAMIC INTERACTIVE TERMINAL CLS */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const viewport = document.getElementById('terminal-viewport');
  const content = document.getElementById('terminal-content');
  
  if (!input || !content || !viewport) return;

  // Set focus on boot
  input.focus();
  document.body.addEventListener('click', () => {
    input.focus();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim();
      if (command) {
        processCommand(command);
        input.value = '';
      }
    }
  });

  function logRow(commandStr, outputStr) {
    const row = document.createElement('div');
    row.className = 'terminal-output-row';
    row.innerHTML = `
      <div class="terminal-command-echo">${commandStr}</div>
      <div class="terminal-output-text">${outputStr}</div>
    `;
    content.appendChild(row);
    viewport.scrollTop = viewport.scrollHeight;
  }

  function processCommand(rawCmd) {
    const cmd = rawCmd.toLowerCase();
    playBeep(600, 'sine', 0.05, 0.05);

    if (cmd === 'clear') {
      content.innerHTML = '';
      return;
    }

    if (cmd === 'help') {
      const response = `Available Sentinel Core directives:
  • help             - Fetch operational directives overview.
  • status           - Initiate complete R&D systems diagnostics sweep.
  • scan             - Execute high-impact security verification on master stems.
  • decrypt [lore]   - Decrypt database keys for [vadiology] or [mirrorfall].
  • override         - Initialize direct systems override.
  • clear            - Clear terminal history.`;
      logRow(rawCmd, response);
      return;
    }

    if (cmd === 'status') {
      logRow(rawCmd, "Initializing systems diagnostic sweep...");
      setTimeout(() => {
        const diagnostics = `======================================================================
VADI LABS SYSTEMS DIAGNOSTIC LOGS — SECURE SWEEP
======================================================================
[INFO] Operating System: macOS / Zsh Terminal sandbox secured.
[INFO] Local IP Guard: Active. Colorado SOS Entity 2026-LLC-81004 Verified.
[INFO] Active Term Ref: Term C202605 — Section 08 (Recording Principles).
[WARN] Deliverable Deficit: FSO Audiobook Assignment is currently open!
      - PDF Slides Loaded: W03.1_TimebasedProcessing & W03.2_AudioBasics
      - Local Bounces: No exported audiobook stems found on system yet.
[INFO] VADIXAI Pipelines: Online. GPU clock stable at 1890 MHz.
======================================================================`;
        logRow(rawCmd, diagnostics);
        playBeep(880, 'sine', 0.12, 0.08);
      }, 500);
      return;
    }

    if (cmd === 'scan') {
      logRow(rawCmd, "Initializing deep security scan of master files...");
      playScanSound();
      
      const vocalStatus = document.getElementById('status-vocal');
      const teaserStatus = document.getElementById('status-teaser');
      
      if (vocalStatus) vocalStatus.textContent = "SCANNING...";
      if (teaserStatus) teaserStatus.textContent = "SCANNING...";
      
      setTimeout(() => {
        if (vocalStatus) vocalStatus.textContent = "SECURED";
        if (teaserStatus) teaserStatus.textContent = "SECURED";
        
        const scanRes = `======================================================================
INTEGRITY SCAN COMPLETED — ALL SOVEREIGN STEMS VALIDATED
======================================================================
✔ vocal.m4a (SHA-256: 7f77304372ef) ......... INTEGRITY SECURE (100%)
✔ cinematic_teaser_poster.png ............. INTEGRITY SECURE (100%)
✔ logo_vadi.png ........................... INTEGRITY SECURE (100%)
✔ vocal.m4a (Backup Node) .................. INTEGRITY SECURE (100%)
======================================================================`;
        logRow(rawCmd, scanRes);
        playBeep(1200, 'sine', 0.2, 0.1);
      }, 950);
      return;
    }

    if (cmd === 'decrypt vadiology') {
      logRow(rawCmd, "Bypassing cryptography layers on Vadiology database...");
      setTimeout(() => {
        const lore = `======================================================================
LORE CORE DECRYPTED: VADIOLOGY DATABASE UNLOCKED
======================================================================
"The map of the Kingdom is not drawn in ink, but in frequencies. 
For three generations, the sovereign frequencies lay dormant in the 
Pueblo valleys. We have decoded the visual score. com.vadixai.core 
is compiling the animations. The worldbuilder has returned."
======================================================================`;
        logRow(rawCmd, lore);
      }, 400);
      return;
    }

    if (cmd === 'decrypt mirrorfall') {
      logRow(rawCmd, "Bypassing cryptography layers on Mirrorfall database...");
      setTimeout(() => {
        const lore = `======================================================================
LORE CORE DECRYPTED: MIRRORFALL DATABASE UNLOCKED
======================================================================
"In the mirror, the sienna lights shift. We are not watching a score, 
we are walking through the visual timeline. Each master audio stem is a 
holographic node. Redundant channels protect the catalog."
======================================================================`;
        logRow(rawCmd, lore);
      }, 400);
      return;
    }

    if (cmd === 'override') {
      logRow(rawCmd, "VERIFYING EXECUTIVE ACCESS PROTOCOLS...");
      setTimeout(() => {
        logRow(rawCmd, "EXECUTIVE ACCESS CONFIRMED. Sentinel Vadi operating at 100% efficiency.");
        // Make the body glow gold as a cool visual effect
        document.body.style.boxShadow = "inset 0 0 100px rgba(212, 175, 55, 0.4)";
        playBeep(440, 'triangle', 0.15, 0.12);
        setTimeout(() => playBeep(880, 'sine', 0.25, 0.12), 150);
        setTimeout(() => {
          document.body.style.boxShadow = "none";
        }, 1200);
      }, 800);
      return;
    }

    // Default error row
    logRow(rawCmd, `Directives failure. Command '${rawCmd}' unrecognized. Type 'help' to summon operational controls.`);
    playBeep(220, 'sawtooth', 0.15, 0.08);
  }
}
