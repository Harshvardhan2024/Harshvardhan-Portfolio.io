const asset = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

export const content = {
  meta: {
    title: 'Harshvardhan Patil | Portfolio',
    description: 'Engineering Graduate Portfolio',
    siteUrl: 'https://harshvardhan2024.github.io/Harshvardhan-Portfolio.io/',
    image: asset('/assets/og-preview.png'),
  },
  personal: {
    name: 'Harshvardhan Patil',
    monogram: 'HP',
    role: 'Engineering Graduate',
    email: 'harshvardhanpatil099@gmail.com',
    phone: '+91 8123347973',
    location: 'Belagavi, Karnataka, India',
    resumeUrl: asset('/assets/Harshvardhan_Patil_Resume_.pdf'),
    socials: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/harshvardhan-patil-482757267/', icon: 'linkedin' },
      { name: 'GitHub', url: 'https://github.com/harshvardhan2024', icon: 'github' },
      { name: 'Email', url: 'mailto:hvardhanpatil099@gmail.com', icon: 'email' }
    ]
  },
  hero: {
    slides: [
      { headline: 'HARSHVARDHAN', headlineGold: 'PATIL', subtitle: 'Curiousity Driven Mind' },
      { headline: 'ENGINEERING', headlineGold: 'SOLUTIONS', subtitle: 'From Concepts to Flight' },
      { headline: 'BEYOND THE', headlineGold: 'HORIZON', subtitle: 'Devoted to Building Systems that Fly' },
      { headline: 'AERONAUTICAL', headlineGold: 'ENGINEER', subtitle: 'Propulsion, Aerodynamics, CAD, FEA' }
    ]
  },
  about: {
    photo: asset('/assets/profile/profile.jpg'),
    paragraph: 'I’m fascinated by the journey from an idea on a screen to a system that actually flies. I work at the intersection of design, simulation, and hands-on experimentation, exploring how things can be built differently, made smarter, and pushed further. From shaping UAV prototypes to exploring computational engineering, I’m drawn to challenges where curiosity meets real-world constraints. I don’t just want to understand how things work—I want to build, test, break, refine, and make them work better. Ultimately, I’m here to engineer systems that turn bold ideas into flight.',
    stats: [
      { label: 'Experience', value: '1+ years' },
      { label: 'National level Competitions', value: '5x' },
      { label: 'Engineering Interests', value: 'SR-71 & LOX' }
    ]
  },
  projects: [
    {
      id: 'p1',
      title: 'Alteria - VTOL UAV',
      description: 'Alteria is an autonomous Tiltrotor VTOL UAV developed for reconnaissance and intelligent aerial operations. The project focuses on lightweight manufacturing, rapid prototyping, and reliable autonomous flight systems.',
      role: 'Structural Design and Mission Integration',
      link: 'https://docs.google.com/document/d/1F9W62g2p3VCbt223OXnecWHFAz_QhEboa2YBSMs60vo/edit?usp=drive_link',
      tags: ['React', 'Node.js', 'Python'],
      media: [
        { type: 'link', src: 'https://img.youtube.com/vi/ISmoAcUX9rk/maxresdefault.jpg', href: 'https://youtu.be/ISmoAcUX9rk', label: 'Watch video' },
        { type: 'image', src: asset('/assets/projects/p1-2.png') }
      ]
    },
    {
      id: 'p2',
      title: 'IMECE -Window cleaning Robot',
      description: 'AI-powered glass cleaning bot that grips strong, cleans deep, and endures flawlessly. Project built for IMECE Brainbolt round-1 which got shortlisted as best design of problem statement among 65 teams all over India',
      role: 'Design Egineer',
      link: 'https://docs.google.com/presentation/d/1S6Eduz2iv_CYGhNp2oEdtD9WgwDg1BlHx_OJj6sOfBg/edit?usp=drive_link',
      tags: ['React Native', 'Firebase', 'GraphQL'],
      media: [
        { type: 'link', src: 'https://img.youtube.com/vi/cDPbKQAXcKU/maxresdefault.jpg', href: 'https://youtu.be/cDPbKQAXcKU', label: 'Watch video' },
        { type: 'image', src: asset('/assets/projects/p2-1.jpeg') }
      ]
    },
    {
      id: 'p3',
      title: 'Precision ball sorting machine - ASME EFx India 2025',
      description: 'Two different iterations of a precision ball sorting machine designed for high-speed, accurate sorting of spherical objects based on size and material properties. The project uses completely mechanical system based gravity sorting mechanism.',
      role: 'Design Engineer',
      link: '',
      tags: ['Python', 'TensorFlow', 'AWS'],
      media: [
        { type: 'image', src: asset('/assets/projects/p3-1.png') },
        { type: 'link', src: 'https://img.youtube.com/vi/DuspNCTkFSs/maxresdefault.jpg', href: 'https://youtu.be/DuspNCTkFSs', label: 'Watch video' },
        { type: 'image', src: asset('/assets/projects/p3-2.png') }
      ]
    },
    {
      id: 'p4',
      title: '6-DOF Robotic Arm - Design and Virtual Simulation - IMECE Brainbolt 2025 TOP 4',
      description: 'A 6-DOF robotic arm designed for precise manipulation and virtual simulation using custom designed cycloidal actuators.',
      role: 'Design and Simulation Engineer',
      link: 'https://drive.google.com/file/d/1VfIxhenNcjO74dll2J-7FH2hielxqF6z/view?usp=drive_link',
      tags: ['Solidity', 'Web3.js', 'React'],
      media: [
        { type: 'link', src: 'https://img.youtube.com/vi/zujK3HNhVKE/maxresdefault.jpg', href: 'https://youtu.be/zujK3HNhVKE', label: 'Watch video' } ,
        { type: 'link', src: 'https://img.youtube.com/vi/7Ec9ldQz7Xs/maxresdefault.jpg', href: 'https://youtube.com/shorts/7Ec9ldQz7Xs', label: 'Watch video' }
      ]
    }
  ],
  experience: [
    {
      id: 'e1',
      role: 'System Integration and UAV Design Engineer',
      organization: 'Octaknight Labs Pvt. Ltd.',
      logo: 'OKL',
      dates: 'Sep 2025 - present',
      location: 'Belagavi, Karnataka, India',
      type: ['Internship', ' / Full-time'],
      points: [
        'Designed and developed structural components for UAVs using CAD and Manufactured them using CFRP and FDM.',
        'Lead the development of a CNC hot-wire cutting machine for UAV wing fabrication and Rapid Prototyping.',
        'Integrated autonomous flight systems using Mission Planner',
      ],
      tags: ['CAD', 'FDM', 'UAV Design', 'Mission Planner'],
      metrics: [
        { value: '1+ Years', label: 'FDM Experience' }
      ],
      media: [
        { type: 'image', src: asset('/assets/experience/e1-1.png') },
        { type: 'image', src: asset('/assets/experience/e1-2.jpeg') },
        { type: 'link', src: 'https://img.youtube.com/vi/ps9foRAax7w/maxresdefault.jpg', href: 'https://youtu.be/ps9foRAax7w', label: 'Watch video' } ,
        { type: 'image', src: asset('/assets/experience/e1-3.jpeg') }
      ]
    },
    {
      id: 'e2',
      role: 'Mechanical Design Intern',
      organization: 'Polyflow Precision Pvt. Ltd.',
      logo: 'PF',
      dates: 'Oct 2024 - Nov 2024',
      location: 'Belagavi, Karnataka, India',
      type: 'Internship',
      points: [
        'Designed and developed mechanical components for precision manufacturing.',
        'Utilized Solidworks for 3D modeling and GD&T for dimensioning and tolerancing.',
      ],
      tags: ['Solidworks', 'GDandT',],
      metrics: [
      ],
      media: [
        { type: 'image', src: asset('/assets/experience/e2-1.jpeg') }
      ]
    },
    {
      id: 'e3',
      role: 'Technical Team Lead and Treasurer',
      organization: 'ASME Student Chapter, KLS GIT',
      logo: 'ASME',
      dates: 'March 2025 - February 2026',
      location: 'KLS GIT, Belagavi, Karnataka, India',
      type: 'Leadership',
      points: [
        'Led Multiple teams to ASME EFx National level competitions.',
        'Organized Technical events and Saw through the financial management of the Club.',
      ],
      tags: ['Team Management', 'Financial Management', 'Technical Leadership'],
      metrics: [{ value: '2', label: 'Technical Events Organized', link: 'https://www.instagram.com/asme_git/?hl=en' }],
      media: [
        { type: 'image', src: asset('/assets/experience/e3-1.jpeg') },
        { type: 'image', src: asset('/assets/experience/e3-2.jpg') }
      ]
    }
  ],
  skills: {
    categories: ['All', 'CAD', '', 'Tools', 'Soft Skills'],
    items: [
      { name: 'Solidworks', category: 'CAD', level: 'Good', icon: 'Solidworks' },
      { name: 'JavaScript', category: 'Frontend', level: 'Advanced', icon: 'javascript' },
      { name: 'Node.js', category: 'Backend', level: 'Intermediate', icon: 'nodejs' },
      { name: 'Python', category: 'Backend', level: 'Advanced', icon: 'python' },
      { name: 'Docker', category: 'Tools', level: 'Intermediate', icon: 'docker' },
      { name: 'Git', category: 'Tools', level: 'Advanced', icon: 'git' },
      { name: 'Leadership', category: 'Soft Skills', level: 'Advanced', icon: 'star' },
      { name: 'Communication', category: 'Soft Skills', level: 'Advanced', icon: 'star' }
    ]
  },
  achievements: [
    { id: 'a1', title: 'EFx-India 2025', description: 'Won first place and $1000 at ASME EFx SDC and IAM3D', image: asset('/assets/achievements/a1.jpeg') },
    { id: 'a2', title: 'ASME EFx VCE', description: 'Won first place and $1000 in SDC EFx VCE', image: asset('/assets/achievements/a2.jpeg') },
    { id: 'a3', title: 'IMECE India 2025', description: 'Secured 4th place among 52 teams', image: asset('/assets/achievements/a3.png') },
    { id: 'a4', title: 'EFx-India SDC 2026', description: 'Won first place at ASME EFx SDC 2026', image: asset('/assets/achievements/a4.jpg') },
    { id: 'a5', title: 'EFx-India IAM3D 2026', description: 'Won first place at ASME EFx IAM3D 2026', image: asset('/assets/achievements/a5.png') },
    { id: 'a6', title: 'Certification', description: 'AWS Solutions Architect Associate', image: asset('/assets/achievements/a6.jpg') }
  ],
  education: {
    items: [
      {
        id: 'ed1',
        level: 'GRADUATE',
        startYear: '2022',
        endYear: '2026',
        icon: 'GraduationCap',
        degree: 'B.E. AERONAUTICAL ENGINEERING',
        institution: 'KLS Gogte Institute of Technology, Belagavi',
        focus: 'Fluid Mechanics · Structures · Propulsion · Aerodynamics',
        score: '7.5 / 10',
        caption: 'CGPA'
      },
      {
        id: 'ed2',
        level: 'PRE-UNIVERSITY',
        startYear: '2020',
        endYear: '2022',
        icon: 'BookOpen',
        degree: 'PRE-UNIVERSITY College',
        institution: 'RLS PUC College, Belagavi',
        focus: 'PCMB — Physics · Chemistry · Mathematics · Biology',
        score: '90%',
        caption: 'PCMB SCORE'
      },
      {
        id: 'ed3',
        level: 'SCHOOL',
        startYear: '2008',
        endYear: '2020',
        icon: 'School',
        degree: 'SECONDARY SCHOOL',
        institution: "St. Xavier's High School, Belagavi",
        focus: 'Secondary Education',
        score: '86%',
        caption: 'SSLC SCORE'
      }
    ],
    languages: ['English', 'Hindi', 'Kannada', 'Marathi']
  },
  contact: {
    formEndpoint: 'https://formspree.io/f/YOUR_ENDPOINT_HERE',
    intro: 'Feel free to reach out for collaboration opportunities, technical inquiries, or full-time roles.',
    closingLine: 'Designed & developed with precision and modern web engineering.'
  }
};
export const contactConfig = {
  // Web3Forms uses a single endpoint and an access key
  formEndpoint: "https://api.web3forms.com/submit",
  accessKey: "affcd3f3-4488-413e-8c38-d9a22628cebf",
};
