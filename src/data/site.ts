import { existsSync } from 'node:fs';

export const withBase = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
const portraitPath = 'images/portrait-transparent.webp';
const cvPath = 'cv/gabriela-chavgova-cv.pdf';
export const site = {
  name: 'Gabriela Chavgova',
  title: 'Machine Learning & AI Engineer',
  location: 'Amsterdam, Netherlands',
  description: 'I design and evaluate machine learning systems, from research experiments to scalable applications. My work spans language, vision, generative models, and production-oriented ML engineering.',
  portrait: existsSync(`public/${portraitPath}`) ? withBase(portraitPath) : undefined,
  portraitDimensions: { width: 720, height: 1279 },
  cv: existsSync(`public/${cvPath}`) ? withBase(cvPath) : undefined,
  // Configure only confirmed public contact details. Unset values render no icons.
  contacts: { github: 'https://github.com/chavgova', linkedin: 'https://www.linkedin.com/in/gabriela-chavgova-4a914bb9', email: 'chavgova88@gmail.com' },
  nav: [
    { label: 'Home', path: '' },
    { label: 'Projects', path: 'projects/' },
    { label: 'Experience', path: 'experience/' },
    { label: 'About', path: 'about/' },
  ],
};
export const contacts = [
  { label: 'GitHub', href: site.contacts.github, icon: 'github' },
  { label: 'LinkedIn', href: site.contacts.linkedin, icon: 'linkedin' },
  { label: 'Email', href: site.contacts.email ? `mailto:${site.contacts.email}` : '', icon: 'email' },
].filter((contact) => contact.href);
