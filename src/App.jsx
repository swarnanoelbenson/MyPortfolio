import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, MapPin, X, ExternalLink, ChevronLeft, ChevronRight, Maximize2, Menu } from 'lucide-react';
import emailjs from '@emailjs/browser';

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [showMoreCerts, setShowMoreCerts] = useState(false);
  const [fullscreenMedia, setFullscreenMedia] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); setTimeout(() => setLoading(false), 500); return 100; }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close fullscreen on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setFullscreenMedia(null); setSidebarOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Fetal Monitoring AI",
      org: "Research Intern · Monash Institute of Medical Engineering, Monash University",
      period: "Jun 2025 – Jan 2026",
      short: "22M-parameter time-series model achieving ~80% classification accuracy on a 70GB+ fetal healthcare dataset",
      full: "Research internship at Monash Institute of Medical Engineering (Jun 2025 – Jan 2026), supervised by Dr. Faezeh Marzbanrad, Deputy Head of Electrical & Computer Systems Engineering. Owned end-to-end model development within a 4-person cross-disciplinary team, building and training a 22-million-parameter time-series classification model on a 70GB+ fetal healthcare dataset using Monash's High Performance Computing infrastructure. Engineered a preprocessing pipeline that segmented raw time-series signals into 4-minute chunks using a WNet architecture, enabling ~80% classification accuracy. Delivered a validated model that directly unblocked the ongoing research program after prior methodologies had produced no promising results.",
      tags: ["Healthcare AI", "Deep Learning", "HPC", "Time-Series"],
      link: null,
      images: ["/images/Fetal_1.png", "/images/fetal_2.jpg"]
    },
    {
      id: 2,
      title: "NLP: Recipe Generation & RAG Menu Planning",
      org: "Master of Artificial Intelligence, Monash University",
      period: "Apr 2026 – Jun 2026",
      short: "End-to-end NLP capstone — seq2seq models, LoRA fine-tuning, and a RAG pipeline over 165K recipes",
      full: "Designed and implemented a comprehensive NLP capstone project (Apr–Jun 2026) spanning three interconnected tasks. Built an RNN encoder-decoder from scratch with Bahdanau attention in PyTorch, then fine-tuned T5-small and GPT-2 using LoRA across three rank configurations. Engineered a RAG pipeline with BM25 retrieval over 165K recipes, integrated the Groq LLM API via LangChain, and designed an LLM-as-Judge evaluation framework scoring constraint satisfaction, ingredient faithfulness, culinary logic, and bias. Improved BLEU-4 by 28% over baseline (0.0397 → 0.0566) and achieved METEOR 0.2401.",
      tags: ["NLP", "RAG", "PyTorch", "HuggingFace", "LoRA", "LangChain"],
      link: null,
      images: [
        "/images/NLP_0_image1.png",
        "/images/NLP_1_simple_RAG_arch.jpg",
        "/images/NLP_2_final_outputs.jpg",
        "/images/NLP_3_with_and_without_RNNAttention.jpg",
        "/images/NLP_4_LoRA_outputs.jpg",
        "/images/NLP_5_RAG_outputs_0.jpg",
        "/images/NLP_6_RAG_outputs.jpg"
      ]
    },
    {
      id: 3,
      title: "Active Ageing Platform",
      org: "Master of Artificial Intelligence, Monash University",
      period: "Mar 2026 – Jun 2026",
      short: "Monash Expo award-winning digital inclusion platform for senior citizens",
      full: "Led a cross-disciplinary team of 4 as Lead Developer for a Monash University Final Year Capstone (Mar–Jun 2026). Built a digital inclusion platform addressing loneliness and sedentary behaviour in senior citizens, aligned with UN SDG 10 (Reduced Inequalities). Architected the full backend infrastructure and frontend–backend integration using Node.js, Vue.js, and MySQL, enabling AI-powered pose estimation exercise guidance, community event discovery, and location-based walking route planning with peer invitation. Won the University Expo award at Monash level. Validated product–market fit through 30+ usability testing sessions with real senior users.",
      tags: ["Vue.js", "Node.js", "MySQL", "Full-Stack", "Healthcare"],
      link: "https://activeageing.vercel.app/",
      images: [
        "/images/ActiveAgeing_0_LiveDemo.mov",
        "/images/ActiveAgeing_1_LiveDemo.mov",
        "/images/ActiveAgeing_2_Expo_Winners.jpg",
        "/images/ActiveAgeing_3_home.jpg",
        "/images/ActiveAgeing_4_CommunityEvents.jpg",
        "/images/ActiveAgeing_5_exercise.jpg",
        "/images/ActiveAgeing_6_RoutePlanning.jpg",
        "/images/ActiveAgeing_7_Share_RoutePlanning.jpg",
        "/images/ActiveAgeing_8_WellnessSnapshot.jpg"
      ]
    },
    {
      id: 4,
      title: "BusMate — iOS Attendance App",
      org: "Freelancing",
      period: "Jan 2026 – Mar 2026",
      short: "Native iOS app live on the Apple App Store — cut bus attendance reporting from 5 minutes to under 1 second",
      full: "Independently designed, built, and shipped a native iOS app to the Apple App Store within 2.5 months (Jan–Mar 2026), solving a real operational pain point identified through direct conversations with private school bus drivers who relied on pen-and-paper attendance. Designed the UI specifically for users aged 60+, prioritising simplicity and zero-confusion adoption. Currently in active pilot with real clients who have provided positive feedback and feature requests ahead of a commercial sale. Reduced attendance reporting time from 5 minutes to under 1 second per bus cycle, replacing a manual process for drivers across Victoria.",
      tags: ["Swift", "iOS", "App Store", "UX"],
      link: "https://tinyurl.com/BusmateApp",
      images: [
        "/images/Busmate_0_AttendaTaking.mp4",
        "/images/Busmate_1_NoteTaking.mp4",
        "/images/Busmate_2_AccountCreation.PNG",
        "/images/Busmate_3_AddNotes.PNG",
        "/images/Busmate_4_Appstore.jpg",
        "/images/Busmate_5_AttendanceTaking.png",
        "/images/Busmate_6_FinalCheck.PNG",
        "/images/Busmate_7_FlashPage.PNG",
        "/images/Busmate_8_PickUp-DropOff.PNG",
        "/images/Busmate_9_Review_and_FinalCheck.png"
      ]
    },
    {
      id: 5,
      title: "Web-based CAPTCHA",
      org: "External Research Collaborator · SPRITZ Research Group, Italy",
      period: "Jan 2024 – Jun 2024",
      short: "Web-based CAPTCHA solution for retail marketing — SPRITZ Research Group, University of Padua, Italy",
      full: "Designed and implemented a web-based CAPTCHA solution as a Cybersecurity Research Collaborator with the SPRITZ Research Group, University of Padua, Italy (Jan–Jun 2024). Addressed security requirements for retail marketing applications, balancing user experience with fraud prevention. Built using HTML/CSS and PHP.",
      tags: ["Security", "PHP", "HTML/CSS", "Research"],
      link: null,
      images: [
        "/images/Captcha_1_Backend_access.jpg",
        "/images/Captcha_0_illustration_video.mp4",
        "/images/Captcha_2_Frontend.jpg",
        "/images/Captcha_3_Frontend.jpg",
        "/images/Captcha_4_Database.jpg"
      ]
    }
  ];

  const experience = [
    {
      title: "Supervisor",
      company: "Priceline Pharmacy, Westfield Knox",
      companyUrl: "https://www.westfield.com.au/knox/store/2rAwIgUfUYcqC4GwiMC242/priceline-pharmacy",
      period: "Sep. 2024 – Present",
      notes: [],
      bullets: [
        "Promoted within 12 months to supervise a 7,500 sq ft flagship pharmacy, managing shifts of 6–10 staff across a 20–25 person team, including frequent sole-charge operations.",
        "Identified a click-and-collect inefficiency and proposed a process change to head office — cutting customer wait time from 10 minutes to under 3 minutes.",
        "Coached 5+ team members across customer service, cash handling, and store operations, tailoring leadership to individual strengths and improving satisfaction scores."
      ],
      techStack: null,
      credentialUrl: null
    },
    {
      title: "Research Intern",
      company: "Monash Institute of Medical Engineering",
      companyUrl: "https://www.monash.edu/mime",
      period: "Jun. 2025 – Jan. 2026",
      notes: [
        {
          prefix: "Supervised by ",
          linkText: "Dr. Faezeh Marzbanrad",
          suffix: ", Deputy Head, Dept. of Electrical & Computer Systems Engineering",
          url: "https://www.monash.edu/engineering/faezehmarzbanrad"
        }
      ],
      bullets: [
        "Owned end-to-end model development within a 4-person cross-disciplinary team, building and training a 22M-parameter time-series classification model on a 70GB+ fetal healthcare dataset using Monash's HPC infrastructure.",
        "Engineered a preprocessing pipeline that segmented raw time-series signals into 4-minute chunks using a WNet architecture, achieving ~80% classification accuracy.",
        "Delivered a validated model that gave the research team directional confidence, directly unblocking the ongoing research program after prior methodologies had produced no promising results."
      ],
      techStack: "Python | PyTorch | WNet Architecture | Monash HPC",
      credentialUrl: "https://drive.google.com/file/d/12nmBf1L_Xiepl1672YNwuqZTwY1JbuuH/view?usp=sharing"
    },
    {
      title: "Cybersecurity Research Collaborator",
      company: "SPRITZ Research Group, Italy",
      companyUrl: "https://spritz.math.unipd.it",
      period: "Jan. 2024 – Jun. 2024",
      notes: [
        {
          prefix: "Supervised by ",
          linkText: "Shrikant Tangade",
          suffix: ", Researcher at Inria",
          url: "https://www.linkedin.com/in/shrikant-tangade/"
        }
      ],
      bullets: [
        "Designed and implemented a web-based CAPTCHA solution addressing security requirements for retail marketing applications, balancing user experience with fraud prevention."
      ],
      techStack: "HTML/CSS | PHP",
      credentialUrl: "https://drive.google.com/file/d/169mO_1uFHgpOaYla1kFHow_slOvWdKAJ/view?usp=sharing"
    }
  ];

  const skills = {
    "Core Languages": ["Python", "JavaScript / TypeScript", "Swift", "Java", "SQL", "HTML / CSS", "PHP"],
    "Machine Learning & AI": ["PyTorch", "TensorFlow", "HuggingFace Transformers", "LoRA (PEFT)", "RAG Systems", "Vector Databases", "LangGraph"],
    "Web Development": ["React", "Vue.js", "Node.js"],
    "Databases & Infrastructure": ["MySQL", "Oracle DB", "Vercel", "Monash HPC"],
    "Developer Tools": ["Git", "GitHub", "DBeaver"]
  };

  const mainCerts = [
    { name: "IBM RAG and Agentic AI", issuer: "IBM (Coursera)", date: "In Progress", credentialUrl: null },
    { name: "Vector Databases for RAG", issuer: "IBM (Coursera)", date: "May 2026", credentialUrl: "https://www.coursera.org/account/accomplishments/verify/BRA96GVJZPYY" },
    { name: "Build RAG Applications", issuer: "IBM (Coursera)", date: "Apr. 2026", credentialUrl: "https://www.coursera.org/account/accomplishments/verify/47DL7WORJE9K" },
    { name: "Google Prompting Essentials", issuer: "Google (Coursera)", date: "Feb. 2026", credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/9YWBR7D6YJBD" },
    { name: "Responsible Artificial Intelligence", issuer: "TAFE NSW", date: "Jan. 2025", credentialUrl: "https://drive.google.com/file/d/1viqzL1DGrOKzmauF02eKE-p9qpVXintc/view?usp=share_link" }
  ];

  const moreCerts = [
    { name: "Develop Generative AI Applications: Get Started", issuer: "IBM (Coursera)", date: "Feb. 2026", credentialUrl: "https://www.coursera.org/account/accomplishments/verify/5WC2TTJHXGEB" },
    { name: "Modern Artificial Intelligence Masterclass", issuer: "Udemy", date: "Jun. 2023", credentialUrl: "https://www.udemy.com/certificate/UC-7255245e-186a-468e-9250-6481ae962873/?utm_source=sendgrid.com&utm_medium=email&utm_campaign=email" },
    { name: "Excel Analytics: Linear Regression Analysis in MS Excel", issuer: "Udemy", date: "Mar. 2023", credentialUrl: "https://www.udemy.com/certificate/UC-6f056999-f9fa-4f27-8b91-88bf53d26486/?utm_source=sendgrid.com&utm_medium=email&utm_campaign=email" }
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) { setFormStatus('validationError'); return; }
    setFormStatus('sending');
    emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, 'template_6b4q957', {
      cust_name: formData.name, cust_email: formData.email,
      message: formData.message, to_email: 'swarnanoelbenson@gmail.com'
    }, '9IMSEIKLcnE65Svq8')
    .then(() => {
      setFormStatus('success');
      const name = formData.name, email = formData.email;
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
      // confirmation email — fire and forget
      emailjs.send('service_yskz8og', 'template_ngjkfod', { cust_name: name, cust_email: email }, '9IMSEIKLcnE65Svq8').catch(() => {});
    })
    .catch((error) => {
      console.error('Email error:', error);
      setFormStatus('sendError');
      setTimeout(() => setFormStatus(''), 3000);
    });
  };

  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.loadingLogo}>
            <span style={styles.loadingLogoText}>NOEL</span>
            <span style={styles.loadingLogoAccent}>AI</span>
          </div>
          <div style={styles.loadingBarContainer}>
            <div style={{...styles.loadingBar, width: `${progress}%`}}></div>
          </div>
          <p style={styles.loadingText}>INITIALIZING SYSTEM... {progress}%</p>
          <div style={styles.loadingGrid}>
            {[...Array(20)].map((_, i) => (
              <div key={i} style={{...styles.gridItem, animationDelay: `${i * 0.1}s`}}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentMedia = activeModal?.images[modalImageIndex];

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={{...styles.nav, ...(scrolled ? styles.navScrolled : {})}}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>NOEL BENSON SWARNA</div>
          <div className="nav-links-desktop" style={styles.navLinks}>
            {['Home', 'About', 'Education', 'Certifications', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} style={styles.navLink}>{item}</button>
            ))}
          </div>
          <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} style={styles.hamburgerBtn}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div style={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div style={{...styles.sidebar, transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)'}}>
        <button onClick={() => setSidebarOpen(false)} style={styles.sidebarClose}>
          <X size={28} />
        </button>
        <div style={styles.sidebarLogo}>Noel AI</div>
        <nav style={styles.sidebarNav}>
          {['Home', 'About', 'Education', 'Certifications', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => { scrollToSection(item.toLowerCase()); setSidebarOpen(false); }}
              style={styles.sidebarLink}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Hero */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroGradient}></div>
        <div style={styles.heroBlobs}>
          <div style={styles.blob1}></div>
          <div style={styles.blob2}></div>
        </div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>NOEL BENSON SWARNA</h1>
          <p style={styles.heroSubtitle}>AI Engineer | NLP · RAG · Full-Stack · iOS</p>
          <p style={styles.heroTagline}>Building intelligent solutions — from research models to shipped products</p>
          <div style={styles.heroButtons}>
            <button onClick={() => scrollToSection('projects')} style={styles.primaryButton}>View My Work</button>
            <button onClick={() => scrollToSection('contact')} style={styles.secondaryButton}>Contact Me</button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={styles.section}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>About Me</h2>
          <div style={styles.aboutContent}>
            <p style={styles.paragraph}>
              AI Engineer and Master's student at Monash University with a track record of shipping real products — from a 22M-parameter medical research model running on HPC infrastructure, to an iOS app live on the App Store, to a Monash Expo award-winning full-stack platform. I specialise in NLP, RAG systems, and applied ML, and I'm equally comfortable leading a cross-disciplinary team or building solo end-to-end. I care about work that solves real problems for real people.
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" style={styles.sectionAlt}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Education</h2>
          <div style={styles.educationContainer}>
            <div style={styles.educationCard}>
              <div style={styles.educationCardHeader}>
                <div>
                  <h3 style={styles.educationTitle}>Master of Artificial Intelligence</h3>
                  <p style={styles.educationInstitution}>Monash University, Melbourne, Australia</p>
                </div>
                <span style={styles.educationYear}>2024 – 2026 · Distinction</span>
              </div>
              <a href="https://drive.google.com/file/d/13widey1QYaGZzIBLEcUdu3OZ-hQWYEoE/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={styles.certLink}>
                <ExternalLink size={16} /> View Academic Transcript
              </a>
            </div>
            <div style={styles.educationCard}>
              <div style={styles.educationCardHeader}>
                <div>
                  <h3 style={styles.educationTitle}>Bachelor of Computer Science</h3>
                  <p style={styles.educationInstitution}>Christ University, Bengaluru, India</p>
                </div>
                <span style={styles.educationYear}>2020 – 2024 · Distinction</span>
              </div>
              <a href="https://drive.google.com/file/d/19CsgmDnl1fE0Ow_1PY0UOEgCMQz8LGPe/view?usp=share_link" target="_blank" rel="noopener noreferrer" style={styles.certLink}>
                <ExternalLink size={16} /> View Certificate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" style={styles.section}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Certifications</h2>
          <div style={styles.certGrid}>
            {[...mainCerts, ...moreCerts].map((cert) => (
              <div key={cert.name} style={styles.certCard}>
                <p style={styles.certName}>{cert.name}</p>
                <p style={styles.certIssuer}>{cert.issuer}</p>
                <p style={styles.certDate}>{cert.date}</p>
                {cert.skills && <p style={{...styles.certIssuer, color: '#777'}}>Skills: {cert.skills}</p>}
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" style={styles.certLink}>
                    <ExternalLink size={15} /> View Credential
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={styles.sectionAlt}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          <div style={styles.experienceContainer}>
            {experience.map((role, i) => (
              <div key={i} style={styles.experienceCard}>
                <div style={styles.experienceHeader}>
                  <h3 style={styles.experienceTitle}>{role.title}</h3>
                  <span style={styles.experiencePeriod}>{role.period}</span>
                </div>
                <a href={role.companyUrl} target="_blank" rel="noopener noreferrer" style={styles.experienceCompanyLink}>
                  {role.company}
                </a>
                {role.notes.map((note, j) => (
                  <p key={j} style={styles.experienceNote}>
                    {note.prefix}
                    <a href={note.url} target="_blank" rel="noopener noreferrer" style={styles.experienceNoteLink}>
                      {note.linkText}
                    </a>
                    {note.suffix}
                  </p>
                ))}
                <ul style={styles.experienceBullets}>
                  {role.bullets.map((b, j) => (
                    <li key={j} style={styles.experienceBullet}>{b}</li>
                  ))}
                </ul>
                {role.techStack && (
                  <p style={styles.experienceTechStack}><strong>Tech Stack:</strong> {role.techStack}</p>
                )}
                {role.credentialUrl && (
                  <a href={role.credentialUrl} target="_blank" rel="noopener noreferrer" style={styles.certLink}>
                    <ExternalLink size={15} /> View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={styles.section}>
        <div style={styles.sectionContainerWide}>
          <h2 style={styles.sectionTitle}>Projects & Key Achievements</h2>
          <div style={styles.projectsGrid}>
            {projects.map((project) => (
              <div key={project.id} style={styles.projectCard} onClick={() => { setActiveModal(project); setModalImageIndex(0); }}>
                {isVideo(project.images[0]) ? (
                  <div style={styles.projectImageBox}>
                    <video src={project.images[0]} muted style={styles.projectMediaContain} />
                  </div>
                ) : (
                  <div style={styles.projectImageBox}>
                    <img src={project.images[0]} alt={project.title} style={styles.projectMediaContain} />
                  </div>
                )}
                <div style={styles.projectContent}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  <p style={styles.projectOrg}>{project.org}</p>
                  <p style={styles.projectDescription}>{project.short}</p>
                  <div style={styles.tagsContainer}>
                    {project.tags.map((tag) => <span key={tag} style={styles.tag}>{tag}</span>)}
                  </div>
                  <div style={styles.cardFooter}>
                    <span style={styles.cardPeriod}>{project.period}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={styles.sectionAlt}>
        <div style={styles.sectionContainerWide}>
          <h2 style={styles.sectionTitle}>Technical Skills</h2>
          <div style={styles.skillsGrid}>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} style={styles.skillCard}>
                <h3 style={styles.skillCategory}>{category}</h3>
                <ul style={styles.skillList}>
                  {items.map((skill) => (
                    <li key={skill} style={styles.skillItem}>
                      <span style={styles.skillBullet}></span>{skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>Get In Touch</h2>
          <div style={styles.contactCard}>
            <div style={styles.contactInfo}>
              <a href="mailto:swarnanoelbenson@gmail.com" style={styles.contactLinkHighlight}>
                <Mail size={24} /><span>swarnanoelbenson@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/noel-benson-swarna" target="_blank" rel="noopener noreferrer" style={styles.contactLinkHighlight}>
                <Linkedin size={24} /><span>linkedin.com/in/noel-benson-swarna</span>
              </a>
              <a href="https://github.com/swarnanoelbenson" target="_blank" rel="noopener noreferrer" style={styles.contactLinkHighlight}>
                <ExternalLink size={24} /><span>github.com/swarnanoelbenson</span>
              </a>
              <div style={styles.contactItem}><MapPin size={24} /><span>Melbourne, Australia</span></div>
            </div>
            <div style={styles.formContainer}>
              <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={styles.input} />
              <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={styles.input} />
              <textarea placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{...styles.input, ...styles.textarea}} rows={5} />
              <button onClick={handleSubmit} style={styles.submitButton} disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus === 'success' && <p style={styles.successMessage}>Message sent successfully!</p>}
              {formStatus === 'validationError' && <p style={styles.errorMessage}>Please fill in all fields.</p>}
              {formStatus === 'sendError' && <p style={styles.errorMessage}>Failed to send — please try again.</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerLinks}>
            {['Home', 'About', 'Education', 'Certifications', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} style={styles.footerLink}>{item}</button>
            ))}
          </div>
          <p style={styles.footerCopyright}>© 2026 Noel Benson Swarna. All rights reserved.</p>
          <p style={styles.footerMade}>Made with React & AI using Claude Code</p>
        </div>
      </footer>

      {/* Project Modal */}
      {activeModal && (
        <div style={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveModal(null)} style={styles.modalClose}><X size={32} /></button>

            {/* Media carousel */}
            <div style={styles.modalImageCarousel}>
              <div style={styles.modalMediaWrapper}>
                {isVideo(currentMedia) ? (
                  <video key={currentMedia} src={currentMedia} controls style={styles.modalMedia} />
                ) : (
                  <img src={currentMedia} alt={activeModal.title} style={styles.modalMedia} />
                )}
                <button style={styles.fullscreenBtn} onClick={() => setFullscreenMedia(currentMedia)} title="Fullscreen">
                  <Maximize2 size={18} />
                </button>
              </div>

              {activeModal.images.length > 1 && (
                <>
                  <button style={{...styles.carouselBtn, left: '0.5rem'}} onClick={() => setModalImageIndex(i => (i - 1 + activeModal.images.length) % activeModal.images.length)}>
                    <ChevronLeft size={22} />
                  </button>
                  <button style={{...styles.carouselBtn, right: '0.5rem'}} onClick={() => setModalImageIndex(i => (i + 1) % activeModal.images.length)}>
                    <ChevronRight size={22} />
                  </button>
                  <div style={styles.carouselDots}>
                    {activeModal.images.map((_, i) => (
                      <button key={i} onClick={() => setModalImageIndex(i)} style={{...styles.carouselDot, ...(i === modalImageIndex ? styles.carouselDotActive : {})}} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <h2 style={styles.modalTitle}>{activeModal.title}</h2>
            <p style={styles.modalOrg}>{activeModal.org}</p>
            <div style={styles.tagsContainer}>
              {activeModal.tags.map((tag) => <span key={tag} style={styles.tag}>{tag}</span>)}
            </div>
            <p style={styles.modalText}>{activeModal.full}</p>
            {activeModal.link && (
              <a href={activeModal.link} target="_blank" rel="noopener noreferrer" style={styles.modalLink}>
                <ExternalLink size={18} /> View Live Project
              </a>
            )}
          </div>
        </div>
      )}

      {/* View More Certs Modal */}
      {showMoreCerts && (
        <div style={styles.modalOverlay} onClick={() => setShowMoreCerts(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowMoreCerts(false)} style={styles.modalClose}><X size={32} /></button>
            <h2 style={styles.modalTitle}>More Certifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              {moreCerts.map((cert) => (
                <div key={cert.name} style={styles.certCardModal}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <p style={styles.certName}>{cert.name}</p>
                      <p style={styles.certIssuer}>{cert.issuer} · {cert.date}</p>
                      {cert.skills && <p style={styles.certIssuer}>Skills: {cert.skills}</p>}
                    </div>
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" style={styles.certLink}>
                      <ExternalLink size={15} /> View Credential
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen overlay */}
      {fullscreenMedia && (
        <div style={styles.fullscreenOverlay} onClick={() => setFullscreenMedia(null)}>
          <button style={styles.fullscreenClose} onClick={() => setFullscreenMedia(null)}><X size={36} /></button>
          {isVideo(fullscreenMedia) ? (
            <video key={fullscreenMedia} src={fullscreenMedia} controls autoPlay style={styles.fullscreenMedia} onClick={(e) => e.stopPropagation()} />
          ) : (
            <img src={fullscreenMedia} alt="fullscreen" style={styles.fullscreenMedia} onClick={(e) => e.stopPropagation()} />
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: 0, padding: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    overflowX: 'hidden', backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'fixed', inset: 0,
    background: 'linear-gradient(135deg, #0B0D63, #1a1f8f, #2937c4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
  },
  loadingContent: { textAlign: 'center', position: 'relative', zIndex: 2 },
  loadingLogo: { fontSize: '4rem', fontWeight: 'bold', marginBottom: '2rem' },
  loadingLogoText: { color: '#fff' },
  loadingLogoAccent: { color: '#60a5fa', marginLeft: '0.5rem' },
  loadingBarContainer: { width: '300px', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden', margin: '0 auto 1rem' },
  loadingBar: { height: '100%', background: 'linear-gradient(to right, #3b82f6, #60a5fa, #93c5fd)', transition: 'width 0.3s ease' },
  loadingText: { color: '#e0e7ff', fontSize: '0.875rem', letterSpacing: '2px', fontWeight: '600' },
  loadingGrid: { position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', padding: '2rem', opacity: 0.1 },
  gridItem: { backgroundColor: '#60a5fa', animation: 'pulse 2s ease-in-out infinite' },

  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'transparent', transition: 'all 0.3s ease' },
  navScrolled: { background: 'rgba(11,13,99,0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  navContainer: { maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' },
  navLinks: { display: 'flex', gap: '1.25rem' },
  navLink: { color: '#e0e7ff', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.3s', fontWeight: '700' },

  hero: { position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, #0B0D63, #1a1f8f, #2937c4)' },
  heroGradient: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,13,99,0.9), rgba(41,55,196,0.8))', backgroundSize: '200% 200%', animation: 'gradient 15s ease infinite' },
  heroBlobs: { position: 'absolute', inset: 0, overflow: 'hidden' },
  blob1: { position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'float 20s ease-in-out infinite' },
  blob2: { position: 'absolute', bottom: '20%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(96,165,250,0.3) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'floatDelayed 25s ease-in-out infinite' },
  heroContent: { position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', padding: '2rem', maxWidth: '800px' },
  heroTitle: { fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  heroSubtitle: { fontSize: '1.75rem', marginBottom: '0.5rem', color: '#e0e7ff' },
  heroTagline: { fontSize: '1.25rem', marginBottom: '2rem', color: '#bfdbfe' },
  heroButtons: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
  primaryButton: { background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: '#fff', padding: '1rem 2rem', borderRadius: '12px', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '1.1rem', transition: 'transform 0.3s, box-shadow 0.3s', boxShadow: '0 4px 14px rgba(59,130,246,0.4)' },
  secondaryButton: { background: 'transparent', color: '#fff', padding: '1rem 2rem', borderRadius: '12px', fontWeight: '700', border: '2px solid #60a5fa', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s' },

  section: { padding: '5rem 2rem', backgroundColor: '#fff' },
  sectionAlt: { padding: '5rem 2rem', background: 'linear-gradient(135deg, #eff6ff, #dbeafe)' },
  sectionContainer: { maxWidth: '1400px', margin: '0 auto' },
  sectionContainerWide: { maxWidth: '1600px', margin: '0 auto' },
  sectionTitle: { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', background: 'linear-gradient(to right, #0B0D63, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },

  aboutContent: { textAlign: 'center' },
  paragraph: { fontSize: '1.2rem', lineHeight: '1.8', color: '#555' },

  educationContainer: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  educationCard: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(11,13,99,0.1)' },
  educationCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' },
  educationTitle: { fontSize: '1.5rem', fontWeight: 'bold', color: '#333', margin: 0 },
  educationInstitution: { fontSize: '1.2rem', color: '#3b82f6', marginTop: '0.4rem' },
  educationYear: { fontSize: '1.5rem', fontWeight: 'bold', color: '#0B0D63', whiteSpace: 'nowrap' },

  certGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' },
  certCard: { backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(11,13,99,0.1)', transition: 'box-shadow 0.3s' },
  certCardModal: { backgroundColor: '#f8faff', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid #dbeafe' },
  certName: { margin: 0, fontWeight: '700', color: '#0B0D63', fontSize: '1.5rem' },
  certIssuer: { margin: '0.3rem 0 0', fontSize: '1.2rem', color: '#3b82f6', fontWeight: '600' },
  certDate: { margin: '0.2rem 0 0', fontSize: '1.5rem', color: '#555', fontWeight: '400' },
  certLink: { display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.6rem', color: '#3b82f6', fontWeight: '700', textDecoration: 'underline', fontSize: '1.1rem' },
  viewMoreBtn: { background: 'linear-gradient(to right, #0B0D63, #3b82f6)', color: '#fff', padding: '0.75rem 2rem', borderRadius: '10px', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '1.1rem' },

  experienceContainer: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  experienceCard: { backgroundColor: '#fff', padding: '1.5rem 2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(11,13,99,0.1)' },
  experienceHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' },
  experienceTitle: { fontSize: '1.5rem', fontWeight: 'bold', color: '#0B0D63', margin: 0 },
  experienceCompanyLink: { display: 'inline-block', color: '#3b82f6', fontWeight: '700', textDecoration: 'underline', fontSize: '1.25rem', marginTop: '0.25rem' },
  experienceNote: { margin: '0.3rem 0 0', fontSize: '1.2rem', color: '#444' },
  experienceNoteLink: { color: '#0B0D63', fontWeight: '700', textDecoration: 'underline', fontSize: '1.2rem' },
  experiencePeriod: { fontSize: '1.5rem', fontWeight: 'bold', color: '#0B0D63', whiteSpace: 'nowrap' },
  experienceBullets: { margin: '0.75rem 0 0', paddingLeft: '1.5rem' },
  experienceBullet: { fontSize: '1.2rem', color: '#555', lineHeight: '1.7', marginBottom: '0.5rem' },
  experienceTechStack: { marginTop: '0.75rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: '#444' },

  projectsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' },
  projectCard: { backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(11,13,99,0.1)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' },
  projectImageBox: { height: '220px', backgroundColor: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  projectMediaContain: { maxWidth: '100%', maxHeight: '220px', objectFit: 'contain', display: 'block' },
  projectContent: { padding: '1.5rem' },
  projectTitle: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#0B0D63' },
  projectOrg: { fontSize: '1.2rem', fontWeight: '700', color: '#3b82f6', marginBottom: '0.6rem', marginTop: 0 },
  projectDescription: { color: '#666', marginBottom: '1rem', fontSize: '1.2rem' },
  tagsContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' },
  tag: { fontSize: '0.85rem', background: 'linear-gradient(to right, #dbeafe, #bfdbfe)', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '9999px' },
  cardFooter: { display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' },
  cardPeriod: { fontSize: '1.5rem', color: '#0B0D63', fontWeight: '700' },

  skillsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' },
  skillCard: { backgroundColor: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 12px rgba(11,13,99,0.1)' },
  skillCategory: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0B0D63' },
  skillList: { listStyle: 'none', padding: 0, margin: 0 },
  skillItem: { padding: '0.5rem 0', display: 'flex', alignItems: 'center', color: '#555', fontSize: '1.2rem' },
  skillBullet: { display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', marginRight: '0.75rem', flexShrink: 0 },

  contactSection: { padding: '5rem 2rem', background: 'linear-gradient(135deg, #dbeafe, #eff6ff, #f0f9ff)' },
  contactCard: { backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 8px 16px rgba(11,13,99,0.1)' },
  contactInfo: { display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' },
  contactLink: { display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#555', textDecoration: 'none', transition: 'color 0.3s', fontSize: '1.2rem' },
  contactLinkHighlight: { display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#2563eb', textDecoration: 'underline', fontWeight: '600', transition: 'color 0.3s', fontSize: '1.2rem' },
  contactItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#555', fontSize: '1.2rem' },
  formContainer: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { width: '100%', padding: '0.75rem 1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box' },
  textarea: { resize: 'vertical', fontFamily: 'inherit' },
  submitButton: { width: '100%', background: 'linear-gradient(to right, #0B0D63, #3b82f6, #60a5fa)', color: '#fff', padding: '0.75rem', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '1.1rem', transition: 'opacity 0.3s' },
  successMessage: { color: '#10b981', textAlign: 'center', fontSize: '1rem' },
  errorMessage: { color: '#ef4444', textAlign: 'center', fontSize: '1rem' },

  footer: { backgroundColor: '#0B0D63', color: '#fff', padding: '2rem' },
  footerContainer: { maxWidth: '1200px', margin: '0 auto', textAlign: 'center' },
  footerLinks: { display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' },
  footerLink: { background: 'none', border: 'none', color: '#e0e7ff', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.3s', fontWeight: '700' },
  footerCopyright: { color: '#bfdbfe', marginBottom: '0.5rem', fontSize: '1rem' },
  footerMade: { fontSize: '0.875rem', color: '#93c5fd' },

  modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(11,13,99,0.5)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
  modalContent: { backgroundColor: '#fff', borderRadius: '16px', maxWidth: '960px', width: '100%', padding: '2rem', position: 'relative', animation: 'fadeIn 0.3s ease-out', maxHeight: '90vh', overflowY: 'auto' },
  modalImageCarousel: { position: 'relative', marginBottom: '1.5rem' },
  modalMediaWrapper: { position: 'relative', backgroundColor: '#0a0a0a', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '480px' },
  modalMedia: { maxWidth: '100%', maxHeight: '480px', objectFit: 'contain', display: 'block' },
  fullscreenBtn: { position: 'absolute', top: '0.6rem', right: '0.6rem', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 },
  carouselBtn: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(11,13,99,0.7)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 },
  carouselDots: { display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '0.75rem' },
  carouselDot: { width: '10px', height: '10px', borderRadius: '50%', background: '#cbd5e1', border: 'none', cursor: 'pointer', padding: 0 },
  carouselDotActive: { background: '#3b82f6' },
  modalClose: { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#666', cursor: 'pointer', zIndex: 10 },
  modalTitle: { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', background: 'linear-gradient(to right, #0B0D63, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingRight: '2rem' },
  modalOrg: { fontSize: '1.2rem', fontWeight: '700', color: '#3b82f6', margin: '0 0 1rem', paddingRight: '2rem' },
  modalText: { color: '#555', fontSize: '1.2rem', lineHeight: '1.75', marginTop: '1.5rem' },
  modalLink: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: '#3b82f6', fontWeight: '700', textDecoration: 'underline', fontSize: '1.25rem' },

  hamburgerBtn: { display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.25rem', alignItems: 'center', justifyContent: 'center' },
  sidebarOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1500, backdropFilter: 'blur(2px)' },
  sidebar: { position: 'fixed', top: 0, right: 0, width: '280px', height: '100vh', background: 'linear-gradient(180deg, #0B0D63, #1a1f8f)', zIndex: 1600, transition: 'transform 0.3s ease', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 20px rgba(0,0,0,0.3)' },
  sidebarClose: { alignSelf: 'flex-end', background: 'none', border: 'none', color: '#e0e7ff', cursor: 'pointer', padding: '0.25rem', marginBottom: '1rem' },
  sidebarLogo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.2)' },
  sidebarNav: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  sidebarLink: { background: 'none', border: 'none', color: '#e0e7ff', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '700', textAlign: 'left', padding: '0.85rem 1rem', borderRadius: '8px', transition: 'background 0.2s, color 0.2s' },
    fullscreenOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' },
  fullscreenMedia: { maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain', display: 'block' },
  fullscreenClose: { position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', zIndex: 10 },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @keyframes float { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-20px) scale(1.1); } }
  @keyframes floatDelayed { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-20px,20px) scale(1.1); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
  @media (max-width: 768px) {
    .nav-links-desktop { display: none !important; }
    .hamburger-btn { display: flex !important; }
  }
  @media (min-width: 769px) {
    .hamburger-btn { display: none !important; }
    .nav-links-desktop { display: flex !important; }
  }
`;
document.head.appendChild(styleSheet);

export default Portfolio;
