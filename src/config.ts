/**
 * BLITZSCHLAG 2027 — Configuration & Story Script
 * Easy to edit event date, titles, and dialogue script.
 */

// Editable target date for the countdown. Default set to Blitzschlag 2027 inaugural evening.
export const COUNTDOWN_TARGET_DATE = '2027-02-19T18:00:00+05:30';

export const FESTIVAL_INFO = {
  name: 'BLITZSCHLAG',
  year: '2027',
  fullTitle: 'BLITZSCHLAG 2027',
  organizer: 'MNIT JAIPUR',
  edition: 'The Flagship Cultural Festival of Malaviya National Institute of Technology, Jaipur',
  tagline: 'Where Heritage Meets Thunderous Rhythm',
  themeDescription: 'A retro-Indian cinematic carnival celebrating the rich folk traditions of Rajasthan, electrifying stage spectacles, and indie cinema spirit.',
};

export const STORY_SCRIPT = {
  scene1: {
    id: 1,
    title: 'Street Arrival',
    label: 'Scene 01: Auto Enters',
    description: 'The green & yellow auto-rickshaw putters into the colorful Jaipur bazaar street.',
  },
  scene2: {
    id: 2,
    title: 'First Dialogue',
    label: 'Scene 02: "Chaloge?"',
    womanText: 'Bhaiyaaa! Blitzschlag chaloge? 🎉',
    driverText: 'Haanji madam, baitho! Meter se chalenge! 🛺',
  },
  scene3: {
    id: 3,
    title: 'Woman Boards',
    label: 'Scene 03: Boarding the Auto',
    description: 'Madam hops in with festive flair, and the rickshaw engine revs up!',
  },
  scene4: {
    id: 4,
    title: 'Destination Dialogue',
    label: 'Scene 04: "Pahunchne Wale Hain"',
    womanText: 'Bhaiya, aur kitni der mein pahunch jayenge? ⏳',
    driverText: 'Bas madam, pahunchne hi wale hain! Samne dekho! 🌟',
  },
  scene5: {
    id: 5,
    title: 'The Grand Reveal',
    label: 'Scene 05: The Countdown Begins',
    kicker: 'THE COUNTDOWN',
    subKicker: 'BEGINS!',
    heroTitle: 'BLITZSCHLAG 2027',
    badgeText: 'COMING SOON',
    footerNotes: 'FEBRUARY 19–21, 2027 · MNIT JAIPUR, RAJASTHAN',
  },
};
