/** FAQ copy for landing + FAQPage JSON-LD (keep in sync). */
export const LANDING_FAQ_ITEMS = [
  {
    question: 'Will this work on any website?',
    answer:
      'Normal pages yes. Restricted Chrome URLs (e.g. chrome://) can’t be recorded, like other capture tools.',
  },
  {
    question: 'Tab vs screen recording—what’s different?',
    answer:
      'Tab capture enables click-based zoom and optional cursor overlay in the editor. Window or full-screen capture does not include page-level click/mouse data, so those enhancements are for tab workflows.',
  },
  {
    question: 'How does zoom work on a tab recording?',
    answer:
      'Click to zoom in smoothly; move the cursor to pan while zoomed. If you stop moving for a few seconds, zoom eases back to the full frame. Your clicks also become zoom segments on the timeline you can trim and tune before export.',
  },
  {
    question: 'What about audio—and can I mute while recording?',
    answer:
      'Tab capture can include audio from the tab. Screen or window capture may not include system audio on every OS (for example, macOS often has no display audio in the recording). When audio is available, you can mute and unmute during capture from the controls.',
  },
  {
    question: 'Which Chrome version do I need?',
    answer: 'Chrome 116 or newer (Manifest V3 features the extension relies on).',
  },
  {
    question: 'Why WebM?',
    answer:
      'Chrome records WebM efficiently. MP4 is available in the editor via local FFmpeg.wasm conversion where supported.',
  },
  {
    question: 'Does it upload my video?',
    answer: 'Core export is local. Any future cloud features would be explicit and opt-in.',
  },
  {
    question: 'How do I stop recording quickly?',
    answer: 'Ctrl+Shift+E on Windows/Linux, or Command+Shift+E on macOS.',
  },
  {
    question: 'What permissions are needed?',
    answer:
      'Standard capture permissions plus a small content script during recording for accurate zoom—not for advertising tracking.',
  },
  {
    question: 'Do I need a desktop video suite?',
    answer: 'No. Capture, timeline edits, and local export run in Chrome for everyday demos.',
  },
];
