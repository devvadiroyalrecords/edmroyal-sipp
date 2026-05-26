/* ==========================================
   DEVVADI KINGDOM — PUBLIC PORTAL CONTROL
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initCinematicTeaser();
  initBlastoffConsole();
});

function initCinematicTeaser() {
  const mockup = document.getElementById('videoMockup');
  if (mockup) {
    mockup.addEventListener('click', toggleTeaserPlay);
    console.log("DEVVADI Kingdom Cinematic Teaser: Active and ready for transmission.");
  }
}

/* 1. PREMIUM LAUNCH COUNTDOWN */
function initCountdown() {
  // Launch date: November 30, 2026
  const launchDate = new Date('Nov 30, 2026 00:00:00').getTime();
  
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateTimer() {
    const now = new Date().getTime();
    const difference = launchDate - now;

    if (difference < 0) {
      clearInterval(timerInterval);
      document.getElementById('countdown').innerHTML = '<h3>THE PORTAL IS ALIGNED</h3>';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Pad numbers dynamically
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Initial call and set interval
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

/* 2. PREMIUM NEWSLETTER NEWS INTAKE */
function handleSubscribe() {
  const emailInput = document.getElementById('subscriberEmail');
  const successMsg = document.getElementById('successMessage');
  
  if (emailInput && emailInput.value && emailInput.checkValidity()) {
    // Fade out input form styling and show success message
    document.getElementById('newsletterForm').style.opacity = '0.3';
    document.getElementById('newsletterForm').style.pointerEvents = 'none';
    if (successMsg) successMsg.style.display = 'block';
    
    console.log(`Kingdom Movement registration logged: ${emailInput.value}`);
    emailInput.value = '';
  }
}
window.handleSubscribe = handleSubscribe;

/* ==========================================
   3. CINEMATIC VIDEO TEASER SIMULATION
   ========================================== */
let teaserPlaying = false;
let teaserInterval = null;
let glitchInterval = null;
let teaserProgress = 0;
let isGlitching = true;

const subtitlesList = [
  "[ TRANSMISSION ALIGNING... ]",
  "[ SIGNAL INTERFERENCE DETECTED... ]",
  "[ ALIGNING COGNITIVE FREQUENCIES... ]",
  "THE ALLIANCE HAS BEEN ESTABLISHED.",
  "DEVVADI KINGDOM & #WINNINGTEAM NETWORK...",
  "DEEP IN THE SANCTUARY OF VADI LABS...",
  "A POWERFUL COGNITIVE SIGNAL IS ALIGNING...",
  "UNLEASHING THE NEXT FRONTIER OF INDEPENDENT SOUND...",
  "LEGENDS AREN'T BORN. THEY'RE BUILT."
];

function toggleTeaserPlay() {
  const mockup = document.getElementById('videoMockup');
  const playBtn = document.getElementById('playBtnOverlay');
  const timeline = document.getElementById('timelineProgress');
  const timeStamp = document.getElementById('timeStamp');
  const subtitleEl = document.getElementById('subtitles');
  const poster = document.getElementById('videoPoster');

  if (!mockup || !poster) return;

  if (!teaserPlaying) {
    teaserPlaying = true;
    isGlitching = true;
    mockup.classList.add('playing');
    poster.classList.add('glitching');
    
    if (playBtn) playBtn.style.opacity = '0';
    if (playBtn) setTimeout(() => playBtn.style.display = 'none', 600);

    // Reset progress
    teaserProgress = 0;
    
    // Start Web Audio Drone and Glitch Static Sound
    try {
      playSynthSwell();
      playGlitchStatic();
    } catch (e) {
      console.log("Web Audio blocked or unsupported.");
    }

    // Dynamic Glitch Graphic & Subtitle Cycle (First 2.5 seconds)
    const glitchAssets = [
      'pastor_flyer.jpg',
      'cinematic_teaser_vadi.png',
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' // Static black
    ];
    let glitchTick = 0;

    glitchInterval = setInterval(() => {
      glitchTick++;
      // Randomly cycle source and skew slightly to simulate distortion
      poster.src = glitchAssets[Math.floor(Math.random() * glitchAssets.length)];
      
      // Cycle initial diagnostics subtitles
      if (subtitleEl) {
        if (glitchTick < 6) {
          subtitleEl.textContent = subtitlesList[0];
        } else if (glitchTick < 12) {
          subtitleEl.textContent = subtitlesList[1];
        } else {
          subtitleEl.textContent = subtitlesList[2];
        }
      }

      // Exit glitch phase at 2.5s (approx 20 ticks of 120ms)
      if (glitchTick >= 20) {
        clearInterval(glitchInterval);
        isGlitching = false;
        poster.classList.remove('glitching');
        poster.src = 'cinematic_teaser_alliance.png'; // Fully resolved Alliance visual!
        
        if (subtitleEl) {
          subtitleEl.textContent = subtitlesList[3];
          subtitleEl.style.color = '#ffd700'; // Highlighting gold!
          setTimeout(() => {
            if (subtitleEl) subtitleEl.style.color = '';
          }, 2000);
        }

        // Trigger cinematic impact sound drop
        try {
          playCinematicBoom();
        } catch(e) {}
      }
    }, 120);

    // Main Timeline Engine
    teaserInterval = setInterval(() => {
      if (isGlitching) return; // Wait until glitch finishes to advance timeline

      teaserProgress += 0.5; // Tick progress
      if (timeline) timeline.style.width = `${teaserProgress}%`;
      
      // Update fake timestamp (max 30s trailer)
      const currentSec = Math.floor((teaserProgress / 100) * 30) + 2.5; // Starts after glitch
      if (timeStamp) timeStamp.textContent = `0:${String(Math.min(30, Math.floor(currentSec))).padStart(2, '0')}`;

      // Dynamically cycle subtitles based on progress
      const progressPercent = teaserProgress / 100;
      // Index starting from 4 (after diagnostic captions)
      const listSlice = subtitlesList.slice(4);
      const sliceIndex = Math.min(
        Math.floor(progressPercent * listSlice.length),
        listSlice.length - 1
      );
      
      if (subtitleEl && listSlice[sliceIndex]) {
        if (subtitleEl.textContent !== listSlice[sliceIndex]) {
          subtitleEl.style.opacity = '0';
          setTimeout(() => {
            if (teaserPlaying && !isGlitching) {
              subtitleEl.textContent = listSlice[sliceIndex];
              subtitleEl.style.opacity = '1';
            }
          }, 300);
        }
      }

      if (teaserProgress >= 100) {
        stopTeaser();
      }
    }, 150);

  } else {
    stopTeaser();
  }
}

function stopTeaser() {
  teaserPlaying = false;
  isGlitching = false;
  clearInterval(teaserInterval);
  clearInterval(glitchInterval);
  
  const mockup = document.getElementById('videoMockup');
  const playBtn = document.getElementById('playBtnOverlay');
  const timeline = document.getElementById('timelineProgress');
  const timeStamp = document.getElementById('timeStamp');
  const subtitleEl = document.getElementById('subtitles');
  const poster = document.getElementById('videoPoster');

  if (mockup) mockup.classList.remove('playing');
  if (poster) {
    poster.classList.remove('glitching');
    poster.src = 'cinematic_teaser_vadi.png'; // Revert back to your throne photo
  }
  if (playBtn) {
    playBtn.style.display = 'flex';
    setTimeout(() => {
      if (playBtn) playBtn.style.opacity = '1';
    }, 50);
  }
  if (timeline) timeline.style.width = '0%';
  if (timeStamp) timeStamp.textContent = '0:00';
  if (subtitleEl) subtitleEl.textContent = subtitlesList[0];
  
  // Stop all active audio context components
  if (audioCtx) {
    try {
      oscillator.stop();
      gainNode.disconnect();
      audioCtx.close();
      audioCtx = null;
    } catch(e) {}
  }
}

// Elite Web Audio API synthesized cinematic bass swell
let audioCtx = null;
let oscillator = null;
let gainNode = null;

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSynthSwell() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  oscillator = ctx.createOscillator();
  gainNode = ctx.createGain();
  
  oscillator.type = 'sawtooth'; // Heavy futuristic buzz saw synth!
  oscillator.frequency.setValueAtTime(45, ctx.currentTime); // Low cinematic sub bass (F#0)
  oscillator.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 30); // Bass swell rising up!
  
  gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2); // Fade in cinematic drone
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 30); // Fade out at end
  
  // Apply a lowpass filter to make it super deep, warm, and ominous
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(120, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 30);
  
  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.start();
}

// Dynamic high-frequency glitch and fuzz sound crackle
function playGlitchStatic() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const oscStatic = ctx.createOscillator();
  const gainStatic = ctx.createGain();
  
  oscStatic.type = 'triangle';
  oscStatic.frequency.setValueAtTime(1500, ctx.currentTime);
  
  // Modulate static frequency rapidly to sound like computer fuzz
  let tick = 0;
  const modInterval = setInterval(() => {
    if (!teaserPlaying || !isGlitching) {
      clearInterval(modInterval);
      try {
        oscStatic.stop();
        gainStatic.disconnect();
      } catch(e) {}
      return;
    }
    oscStatic.frequency.setValueAtTime(Math.random() * 4000 + 800, ctx.currentTime);
  }, 80);
  
  gainStatic.gain.setValueAtTime(0.001, ctx.currentTime);
  gainStatic.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1); // Keep it subtle and crackly
  gainStatic.gain.setValueAtTime(0.001, ctx.currentTime + 2.3); // Cut off right before alliance drop
  
  oscStatic.connect(gainStatic);
  gainStatic.connect(ctx.destination);
  
  oscStatic.start();
}

// Heavy cinema sub-bass boom when the alliance connection locks in
function playCinematicBoom() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const oscBoom = ctx.createOscillator();
  const gainBoom = ctx.createGain();
  
  oscBoom.type = 'sine';
  oscBoom.frequency.setValueAtTime(100, ctx.currentTime);
  oscBoom.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1.5); // Fast sweep down!
  
  gainBoom.gain.setValueAtTime(0.35, ctx.currentTime); // Heavy high-impact hit!
  gainBoom.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5); // Fades out
  
  oscBoom.connect(gainBoom);
  gainBoom.connect(ctx.destination);
  
  oscBoom.start();
  setTimeout(() => {
    try {
      oscBoom.stop();
      gainBoom.disconnect();
    } catch(e) {}
  }, 2000);
}

window.toggleTeaserPlay = toggleTeaserPlay;

/* ==========================================
   4. WINNING TEAM BLASTOFF CONSOLE ENGINE
   ========================================== */
let blastoffSeconds = 300; // 5 minutes
let blastoffTimerInterval = null;

function initBlastoffConsole() {
  const blastBtn = document.getElementById('blastoffBtn');
  if (blastBtn) {
    blastBtn.addEventListener('click', executeBlastoffLaunch);
  }
  startBlastoffCountdown();
}

function startBlastoffCountdown() {
  const timerEl = document.getElementById('blastoffTimer');
  if (!timerEl) return;
  
  blastoffTimerInterval = setInterval(() => {
    blastoffSeconds--;
    if (blastoffSeconds < 0) {
      blastoffSeconds = 300; // Reset to 5m
    }
    const mins = Math.floor(blastoffSeconds / 60);
    const secs = blastoffSeconds % 60;
    timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, 1000);
}

function executeBlastoffLaunch() {
  const readout = document.getElementById('consoleReadout');
  const screen = document.getElementById('readoutScreen');
  const overlay = document.getElementById('invoiceOverlay');
  const blastBtn = document.getElementById('blastoffBtn');
  
  if (!readout || !screen || !overlay) return;
  
  if (blastBtn) {
    blastBtn.disabled = true;
    blastBtn.style.opacity = '0.5';
  }
  
  readout.style.display = 'flex';
  screen.textContent = 'CONNECTING TO WINNING TEAM DIRECTORY...';
  
  // Synthesise dramatic rocket engine sound swell
  try {
    playRocketSwell();
  } catch(e) {}
  
  // Step-by-step terminal readout simulation
  setTimeout(() => { screen.textContent += '\nSIGNAL ESTABLISHED: 500+ A&R NODES SECURED'; }, 600);
  setTimeout(() => { screen.textContent += '\nCONVERTER INTAKE: LOADING MASTER STEMS...'; }, 1200);
  setTimeout(() => { screen.textContent += '\nINTAKE COMPLETE: PARSING DEVVADI METADATA'; }, 1800);
  setTimeout(() => { screen.textContent += '\nSYNAPSE NODE ARMED: LAUNCHING BROADCAST BLANKET...'; }, 2400);
  setTimeout(() => { screen.textContent += '\nBROADCAST ENGAGED. SIGNAL ENCODED FOR $100 EXECUTIVE DECK.'; }, 3000);
  setTimeout(() => { screen.textContent += '\nREDIRECTING PORTAL STREAM TO MASTER CONTROL...'; }, 3600);
  
  setTimeout(() => {
    overlay.classList.add('active');
  }, 4200);
}

function closeInvoice() {
  const overlay = document.getElementById('invoiceOverlay');
  const readout = document.getElementById('consoleReadout');
  const screen = document.getElementById('readoutScreen');
  const blastBtn = document.getElementById('blastoffBtn');
  
  if (overlay) overlay.classList.remove('active');
  if (readout) readout.style.display = 'none';
  if (screen) screen.textContent = 'SYSTEM READY. AWAITING AUDIO SIGNALS...';
  if (blastBtn) {
    blastBtn.disabled = false;
    blastBtn.style.opacity = '1';
  }
}

// Elite Web Audio API synthesized rocket/laser launch sound sweep
function playRocketSwell() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const oscLaunch = ctx.createOscillator();
  const gainLaunch = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  oscLaunch.type = 'sawtooth';
  oscLaunch.frequency.setValueAtTime(40, ctx.currentTime);
  oscLaunch.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 3.5); // Giant pitch sweep!
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(200, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 3.5);
  
  gainLaunch.gain.setValueAtTime(0.001, ctx.currentTime);
  gainLaunch.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.5); // Fade in loud!
  gainLaunch.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 2.5);
  gainLaunch.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.0); // Fades out at end
  
  oscLaunch.connect(filter);
  filter.connect(gainLaunch);
  gainLaunch.connect(ctx.destination);
  
  oscLaunch.start();
  setTimeout(() => {
    try {
      oscLaunch.stop();
      gainLaunch.disconnect();
    } catch(e) {}
  }, 5000);
}

window.closeInvoice = closeInvoice;



