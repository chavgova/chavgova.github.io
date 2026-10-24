// Current owner-supplied CV confirms titles and month ranges.
export interface Experience {
  organization: string;
  date: string;
  area: string;
  context: string;
  summary: string;
  skills: string[];
  project?: string;
}
export const experience: Experience[] = [
  {
    organization: 'ABN AMRO',
    date: 'Apr–Aug 2026',
    area: 'Data Science Intern',
    context: 'Detecting Financial Crime · Amsterdam',
    summary: 'Independently framed and delivered an end-to-end merchant-extraction research project, from feature generation and model comparison to unseen-provider evaluation and a final technical recommendation.',
    skills: ['PyTorch', 'PySpark', 'Databricks', 'Azure', 'MLflow'],
    project: 'merchant-extraction',
  },
  {
    organization: 'Thermo Fisher Scientific',
    date: 'Feb 2025–Apr 2026',
    area: 'Application Software / AI Engineer',
    context: 'Part-time · Eindhoven',
    summary: 'Built an RTMDet vision pipeline for SEM imagery and integrated inference into Phenom microscope workflows. Developed configurable multithreaded application workflows, connecting domain requirements with maintainable software.',
    skills: ['RTMDet', 'Valohai MLOps', 'SEM imagery', 'Software engineering'],
    project: 'electron-microscopy',
  },
  {
    organization: 'Summer Research School in Informatics and Mathematics',
    date: 'Aug 2022 · Aug 2023',
    area: 'Scientific Mentor',
    context: 'Organized by the Bulgarian Academy of Sciences',
    summary: 'Mentored seven international students on applied ML research, reviewed experiments and implementations, and helped one student qualify for Regeneron ISEF.',
    skills: ['Research mentoring', 'Experimental design', 'Applied ML'],
  },
];
export const education = [
  { institution: 'University of Amsterdam', qualification: 'MSc Artificial Intelligence', shortQualification: 'MSc AI', shortInstitution: 'University of Amsterdam', date: '2025–2027 (expected)', detail: 'Master’s studies; expected completion July 2027. Coursework includes deep learning, computer vision, NLP, reinforcement learning, and information retrieval.' },
  { institution: 'Eindhoven University of Technology', qualification: 'BSc Computer Science', shortQualification: 'BSc CS', shortInstitution: 'TU/e · Honors Academy', date: 'Aug 2022–Jul 2025', detail: 'Honors Academy graduate, High-Tech Systems track.' },
];
// Future role, explicitly confirmed for public display as upcoming by the owner.
export const upcomingExperience = {
  organization: 'TNO',
  title: 'Incoming Machine Learning Scientist Intern',
  date: 'Jan–Jun 2027',
  topic: 'MSc thesis: anomaly detection in autonomous surveillance and inspection using vision-language models.',
};
