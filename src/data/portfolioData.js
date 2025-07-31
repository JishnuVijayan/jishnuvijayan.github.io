const portfolioData = {
  name: "Jishnu Vijayan",
  title: "Computer Science Engineer & Web Developer",
  contact: {
    email: "abc@gmail.com",
    phone: "+91 1234567890",
    linkedin: "https://www.linkedin.com/in/jishnu-vijayan",
    github: "https://github.com/jishnu-vijayan",
  },
  introduction:
    "B.Tech graduate in Computer Science with a strong interest in web development, machine learning, and data structures. I have gained practical experience through various projects. I am adaptable, hardworking, and a quick learner, and I look forward to applying my skills and knowledge to contribute and grow in a dynamic tech environment.",
  education: {
    university: "APJ Abdul Kalam Technological University",
    degree: "B.Tech in Computer Science & Engineering",
    cgpa: 8.4,
    duration: "2021 – 2025",
  },
  skills: {
    technical: [
      { name: "Machine Learning", img: "/ml.png" },
      { name: "React", img: "/react.svg" },
      { name: "Angular", img: "/Angular.png" },
      { name: "JavaScript", img: "/js.png" },
      { name: "C", img: "/c.png" },
      { name: "Python", img: "/python.png" },
      { name: "CSS", img: "/css.png" },
      { name: "HTML", img: "/html.png" },
      { name: "Pandas", img: "/pandas.svg" },
      { name: "NumPy", img: "/numpy.png" },
      { name: "Matplotlib", img: "/matplotlib.png" },
      { name: "Seaborn", img: "/seaborn.svg" },
    ],
    soft: [
      "Teamwork",
      "Leadership",
      "Adaptability",
      "Quick Learner",
      "Decision Making",
      "Communication",
    ],
  },
  experience: [
    {
      year: "2025 (3 months)",
      title: "Full-Stack Web developer Intern",
      subtitle: "ULTS, UL Cyberpark, Kozhikode",
      description:
        "Worked in various projects including React, NestJS, and FastAPI. Contributed to two different projects, which helped me to learn new technologies.",
    },
    {
      year: "2024-2025",
      title: "EMG Signal Analysis and Control of 3D-Printed Prosthesis",
      subtitle: "Aster Medcity Kochi",
      description:
        "Conducted a research internship focusing on EMG signal analysis, developing ML models to predict muscle activation, and using these predictions to control a 3D-printed prosthetic arm in real time.",
    },
    {
      year: "2024-2025",
      title: "Full-Stack Web developer Intern",
      subtitle: "Karippal Innovations, Thrissur",
      description:
        "Worked on multiple projects, including a digital solution for tailoring firms to streamline order management and a restaurant menu digitization app, using Angular, Ionic, and TypeScript.",
    },
  ],
  projects: [
    {
      title: "Timetable Management System",
      duration: "Oct 2023 - Dec 2023",
      technologies: ["React", "Express", "PostgreSQL", "JavaScript"],
      description: [
        "Led development of a database management project for organizing semester timetables, enabling personalized search functionalities for faculty and semester-based search for students.",
        "Implemented a feature allowing faculty to retrieve their timetables by name, ensuring targeted results.",
        "Designed and built this full-stack system to optimize performance and user accessibility.",
      ],
    },
  ],
};

export default portfolioData;