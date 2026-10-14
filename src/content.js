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
    location: 'City, Country',
    resumeUrl: asset('/assets/resume.pdf'),
    socials: [
      { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
      { name: 'GitHub', url: 'https://github.com', icon: 'github' },
      { name: 'Email', url: 'mailto:hello@yourdomain.com', icon: 'email' }
    ]
  },
  hero: {
    slides: [
      { headline: 'BUILDING THE', headlineGold: 'FUTURE', subtitle: 'Software Engineering Graduate with a passion for scalable systems.' },
      { headline: 'DESIGNING', headlineGold: 'SOLUTIONS', subtitle: 'Bridging the gap between complex logic and user experience.' },
      { headline: 'CREATING', headlineGold: 'IMPACT', subtitle: 'Driven by innovation, precision, and continuous learning.' },
      { headline: 'TURNING IDEAS', headlineGold: 'INTO REALITY', subtitle: 'Ready to tackle hard problems and build great products.' }
    ]
  },
  about: {
    photo: asset('/assets/profile/profile.jpg'),
    paragraph: 'I am a highly motivated engineering graduate with a strong foundation in software development, systems design, and problem-solving. My academic journey and hands-on projects have equipped me with the skills to tackle complex technical challenges. I thrive in collaborative environments and am always eager to learn new technologies and methodologies to deliver high-quality, impactful solutions.',
    stats: [
      { label: 'Projects Completed', value: '10+' },
      { label: 'Hackathons Won', value: '3' },
      { label: 'Lines of Code', value: '100k+' }
    ]
  },
  projects: [
    {
      id: 'p1',
      title: 'Project Alpha',
      description: 'A revolutionary system for optimizing workflows and data analysis.',
      role: 'Lead Developer',
      tags: ['React', 'Node.js', 'Python'],
      media: [
        { type: 'image', src: asset('/assets/projects/p1-1.jpg') },
        { type: 'video', src: asset('/assets/projects/p1-vid.mp4') },
        { type: 'image', src: asset('/assets/projects/p1-2.jpg') }
      ]
    },
    {
      id: 'p2',
      title: 'Project Beta',
      description: 'An innovative mobile application that connects communities.',
      role: 'Full Stack Engineer',
      tags: ['React Native', 'Firebase', 'GraphQL'],
      media: [
        { type: 'image', src: asset('/assets/projects/p2-1.jpg') },
        { type: 'video', src: asset('/assets/projects/p2-vid.mp4') },
        { type: 'image', src: asset('/assets/projects/p2-2.jpg') }
      ]
    },
    {
      id: 'p3',
      title: 'Project Gamma',
      description: 'A machine learning model for predictive maintenance in IoT devices.',
      role: 'ML Engineer',
      tags: ['Python', 'TensorFlow', 'AWS'],
      media: [
        { type: 'image', src: asset('/assets/projects/p3-1.jpg') },
        { type: 'video', src: asset('/assets/projects/p3-vid.mp4') },
        { type: 'image', src: asset('/assets/projects/p3-2.jpg') }
      ]
    },
    {
      id: 'p4',
      title: 'Project Delta',
      description: 'A secure, decentralized platform for digital identity verification.',
      role: 'Blockchain Developer',
      tags: ['Solidity', 'Web3.js', 'React'],
      media: [
        { type: 'image', src: asset('/assets/projects/p4-1.jpg') },
        { type: 'video', src: asset('/assets/projects/p4-vid.mp4') },
        { type: 'image', src: asset('/assets/projects/p4-2.jpg') }
      ]
    }
  ],
  experience: [
    {
      id: 'e1',
      role: 'Software Engineering Intern',
      organization: 'Tech Corp Inc.',
      logo: 'TC',
      dates: 'May 2023 - Aug 2023',
      location: 'San Francisco, CA (Remote)',
      type: 'Internship',
      points: [
        'Developed and maintained RESTful APIs serving 10k+ daily users.',
        'Optimized database queries, reducing response times by 30%.',
        'Collaborated with cross-functional teams to deliver new features.'
      ],
      tags: ['Node.js', 'Express', 'PostgreSQL'],
      metrics: [
        { value: '10k+', label: 'Daily Users' },
        { value: '30%', label: 'Speed Increase' }
      ],
      media: [
        { type: 'image', src: asset('/assets/experience/e1-1.jpg') },
        { type: 'video', src: asset('/assets/experience/e1-vid.mp4') },
        { type: 'image', src: asset('/assets/experience/e1-2.jpg') }
      ]
    },
    {
      id: 'e2',
      role: 'Undergraduate Researcher',
      organization: 'University Labs',
      logo: 'UL',
      dates: 'Jan 2022 - May 2023',
      location: 'University Campus',
      type: 'Part-time',
      points: [
        'Conducted research on distributed systems and fault tolerance.',
        'Published a paper in a peer-reviewed undergraduate journal.',
        'Prototyped a novel consensus algorithm in Go.'
      ],
      tags: ['Go', 'Distributed Systems', 'Research'],
      metrics: [
        { value: '1', label: 'Publication' }
      ],
      media: [
        { type: 'image', src: asset('/assets/experience/e2-1.jpg') },
        { type: 'video', src: asset('/assets/experience/e2-vid.mp4') },
        { type: 'image', src: asset('/assets/experience/e2-2.jpg') }
      ]
    },
    {
      id: 'e3',
      role: 'Freelance Web Developer',
      organization: 'Self-Employed',
      logo: 'SE',
      dates: 'Present',
      location: 'Remote',
      type: 'Freelance',
      points: [
        'Designed and built responsive websites for local businesses.',
        'Implemented custom CMS solutions using Headless architectures.',
        'Managed client communications and project timelines.'
      ],
      tags: ['React', 'Next.js', 'Tailwind'],
      metrics: [],
      media: [
        { type: 'image', src: asset('/assets/experience/e3-1.jpg') },
        { type: 'video', src: asset('/assets/experience/e3-vid.mp4') },
        { type: 'image', src: asset('/assets/experience/e3-2.jpg') }
      ]
    }
  ],
  skills: {
    categories: ['All', 'Frontend', 'Backend', 'Tools', 'Soft Skills'],
    items: [
      { name: 'React', category: 'Frontend', level: 'Advanced', icon: 'react' },
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
    { id: 'a1', title: 'First Place', description: 'National Coding Hackathon 2023', image: asset('/assets/achievements/a1.jpg') },
    { id: 'a2', title: 'Dean\'s List', description: 'Consistently achieved top 5% of class', image: asset('/assets/achievements/a2.jpg') },
    { id: 'a3', title: 'Open Source Contributor', description: 'Merged 20+ PRs in major frameworks', image: asset('/assets/achievements/a3.jpg') },
    { id: 'a4', title: 'Best Project Award', description: 'Senior Capstone Design Expo', image: asset('/assets/achievements/a4.jpg') },
    { id: 'a5', title: 'Speaker', description: 'Tech Conference 2022', image: asset('/assets/achievements/a5.jpg') },
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
        focus: 'UAV Systems · Structures · Additive Manufacturing · Robotics',
        score: '[CGPA VALUE] / 10',
        caption: 'CGPA / 10'
      },
      {
        id: 'ed2',
        level: 'PRE-UNIVERSITY',
        startYear: '2020',
        endYear: '2022',
        icon: 'BookOpen',
        degree: 'PRE-UNIVERSITY CERTIFICATE (PUC)',
        institution: 'RLS PUC College, Belagavi',
        focus: 'PCMB — Physics · Chemistry · Mathematics · Biology',
        score: '90%',
        caption: 'PCMB SCORE'
      },
      {
        id: 'ed3',
        level: 'SCHOOL',
        startYear: '2020',
        endYear: '',
        icon: 'School',
        degree: 'SECONDARY SCHOOL',
        institution: "St. Xavier's High School, Belagavi",
        focus: 'Secondary Education',
        score: '86%',
        caption: 'SSC SCORE'
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
