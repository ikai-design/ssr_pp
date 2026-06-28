/**
 * Simple Screen Recorder - Landing Page Interactive Simulator Engine
 * Autoplay Product Tour + Live Spring-Physics Mouse Spotlight and Click Zoom
 */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('.simulator-body');
  const content = document.querySelector('.simulator-content');
  const spotlight = document.querySelector('.simulator-spotlight');
  const frame = document.querySelector('.simulator-frame');
  const hudStatus = document.querySelector('.hud-status-text');
  
  if (!body || !content || !spotlight) return;

  let isZoomed = false;
  let isManual = false;
  let tourTimeout = null;
  let idleTimeout = null;
  let currentTourStep = 0;

  // Create fake cursor for automated tour
  const fakeCursor = document.createElement('div');
  fakeCursor.className = 'fake-cursor';
  fakeCursor.style.cssText = `
    position: absolute;
    width: 20px;
    height: 20px;
    pointer-events: none;
    z-index: 99;
    transform: translate(0, 0);
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    display: block;
    opacity: 1;
  `;
  fakeCursor.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));">
      <path d="M4.5 3V19.5L9.75 14.25H18.25L4.5 3Z" fill="#f43f5e" stroke="white" stroke-width="2" stroke-linejoin="round"/>
    </svg>
    <div class="fake-cursor-tag">Presenter</div>
  `;
  body.appendChild(fakeCursor);

  // Targets for automated tour (elements inside simulator-content)
  const tourTargets = [
    { selector: '.mock-card.card-1', name: 'Task Board Card' },
    { selector: '.mock-card.card-2', name: 'Analytics Card' },
    { selector: '.mock-action-button.action-btn', name: 'Action Button' }
  ];

  // Mouse move handler for manual mode
  function updateSpotlightPosition(e) {
    if (!isManual) return;
    const rect = body.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    body.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    body.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }

  // Visual click ripple
  function triggerRipple(x, y) {
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    body.appendChild(ripple);
    
    // Auto-remove ripple after animation finishes
    setTimeout(() => {
      ripple.remove();
    }, 500);
  }

  // Trigger Zoom centered on x, y coordinates
  function zoomIn(x, y, label) {
    const W = body.clientWidth;
    const H = body.clientHeight;
    
    // Translate distance calculation to center the click
    const tx = W / 2 - x;
    const ty = H / 2 - y;
    
    body.style.setProperty('--mouse-x', `${(x / W) * 100}%`);
    body.style.setProperty('--mouse-y', `${(y / H) * 100}%`);
    
    content.style.setProperty('--zoom-scale', '1.8');
    content.style.setProperty('--zoom-tx', `${tx}px`);
    content.style.setProperty('--zoom-ty', `${ty}px`);
    
    body.classList.add('simulator-zoomed');
    frame.style.borderColor = 'var(--color-accent)';
    if (hudStatus) {
      hudStatus.innerHTML = `REC <span style="color:#ff3366;font-weight:700;">●</span> Zoomed to: ${label}`;
    }
    isZoomed = true;
  }

  // Reset Zoom
  function zoomOut() {
    content.style.setProperty('--zoom-scale', '1');
    content.style.setProperty('--zoom-tx', '0px');
    content.style.setProperty('--zoom-ty', '0px');
    
    body.classList.remove('simulator-zoomed');
    frame.style.borderColor = 'var(--border-color)';
    if (hudStatus) {
      hudStatus.innerHTML = `REC <span style="color:#ff3366;font-weight:700;">●</span> Recording Tab...`;
    }
    isZoomed = false;
  }

  // Toggle Zoom on click (Manual Mode)
  body.addEventListener('click', (e) => {
    // If clicked on HUD buttons, ignore zoom trigger
    if (e.target.closest('.simulator-hud')) return;

    switchToManual();

    const rect = body.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    triggerRipple(x, y);

    if (isZoomed) {
      zoomOut();
    } else {
      // Find what element is being clicked
      let clickedElementLabel = 'Custom Selection';
      const targetElement = document.elementFromPoint(e.clientX, e.clientY);
      if (targetElement) {
        const card = targetElement.closest('.mock-card');
        const btn = targetElement.closest('.mock-action-button');
        if (card) {
          clickedElementLabel = card.querySelector('.mock-card-heading')?.textContent || 'Card';
        } else if (btn) {
          clickedElementLabel = btn.textContent || 'Button';
        }
      }
      zoomIn(x, y, clickedElementLabel);
    }
  });

  // Handle pointer tracking
  body.addEventListener('mousemove', (e) => {
    if (!isManual) {
      switchToManual();
    }
    updateSpotlightPosition(e);
  });

  body.addEventListener('mouseleave', () => {
    if (isManual) {
      // Start idle timer to return to automated tour after 4s
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        switchToAutomated();
      }, 4000);
    }
  });

  // Switch from tour to manual control
  function switchToManual() {
    isManual = true;
    fakeCursor.style.opacity = '0';
    clearTimeout(tourTimeout);
    clearTimeout(idleTimeout);
  }

  // Switch from manual control back to tour
  function switchToAutomated() {
    isManual = false;
    fakeCursor.style.opacity = '1';
    currentTourStep = 0;
    zoomOut();
    runTourStep();
  }

  // Run a single step of the automated tour
  function runTourStep() {
    if (isManual) return;

    const step = tourTargets[currentTourStep];
    const targetElement = content.querySelector(step.selector);

    if (!targetElement) {
      currentTourStep = (currentTourStep + 1) % tourTargets.length;
      tourTimeout = setTimeout(runTourStep, 1000);
      return;
    }

    // Get coordinates of the target relative to the simulator body
    const bodyRect = body.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    
    const x = (targetRect.left + targetRect.width / 2) - bodyRect.left;
    const y = (targetRect.top + targetRect.height / 2) - bodyRect.top;

    // Move fake cursor
    fakeCursor.style.transform = `translate(${x}px, ${y}px)`;

    // Wait for cursor move transition, then click
    tourTimeout = setTimeout(() => {
      if (isManual) return;
      
      // Visual click
      triggerRipple(x, y);
      
      // Visual card highlight state
      const card = targetElement.closest('.mock-card');
      if (card) card.style.background = 'rgba(255, 255, 255, 0.08)';

      zoomIn(x, y, step.name);

      // Wait in zoomed state
      tourTimeout = setTimeout(() => {
        if (isManual) return;
        
        zoomOut();
        if (card) card.style.background = '';

        // Proceed to next target
        currentTourStep = (currentTourStep + 1) % tourTargets.length;
        
        // Wait before moving to next target
        tourTimeout = setTimeout(runTourStep, 1500);
      }, 2500);

    }, 850);
  }

  // Start the autoplay tour
  runTourStep();
});

// Mobile Navigation Drawer Toggle logic
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const header = document.querySelector('.app-header');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      // Toggle a simple header class to reveal/hide links
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      header.classList.toggle('nav-open');
    });
  }
});
