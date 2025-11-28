"use client"
import { useState, useEffect, useRef } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowUpRight, ChevronDown, ExternalLink, Heart } from 'lucide-react';

const Portfolio = () => {
  const [, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const blobRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLImageElement | null>(null);
  const [titleScrolled, setTitleScrolled] = useState(false);

  // --- DATA ---
  const DATA = {
    name: "Utkarsh Jha",
    role: "Creative Technologist",
    tagline: "Merging Agentic AI with fluid design.",
    location: "Delhi, India",
    bio: "I am a Full Stack Developer & UI/UX Enthusiast. Currently expanding my DevOps skills and exploring the frontiers of Agentic AI frameworks. I build digital experiences that are not just functional, but memorable.",
    email: "utkarshjha.4009@gmail.com",
    phone: "+91 859 568 7296",
    socials: [
      { name: "GitHub", url: "https://github.com/Utkarsh-2005" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/utkarsh-jha-002b23266/" },
      { name: "Instagram", url: "https://www.instagram.com/utkarsh.905/" }
    ],
    resumeUrl: "https://drive.google.com/file/d/1AUJ0oSAvox-J5SlpvzAjdTmd0gyoIlN5/view?usp=sharing",
    experience: [
      {
        company: "Pehchaan.me",
        role: "Software Developer Trainee",
        period: "June 2025 - Present",
        desc: "Working on GenAI-based Agentic AI Frameworks (CrewAI, AgnoAI) with FastAPI. Contributing to production codebases using React, Vite, and TypeScript.",
        bg: "https://res.cloudinary.com/dcpgejete/image/upload/v1764325184/pehchaan_g9ruul.jpg"
      },
      {
        company: "Kafsco.com",
        role: "Frontend Developer",
        period: "June 2024 - July 2024",
        desc: "Developed custom web solutions using Swiper.js and Next.js. Engineered 'Instagram Story' like components for web engagement.",
        bg: "https://res.cloudinary.com/dcpgejete/image/upload/v1764326167/OrganizerLogin_valrek.png"
      },
      {
        company: "MLSA KIIT",
        role: "Web Developer",
        period: "March 2023 - Present",
        desc: "Built scalable web applications for events, organized and participated in tech events and workshops.",
        bg: "https://res.cloudinary.com/dcpgejete/image/upload/v1764326486/members_wpnefs.webp"
      }
    ],
    projects: [
      {
        name: "LinkedBoost",
        category: "AI / RAG",
        year: "2025",
        desc: "Platform evaluating LinkedIn profiles using Gemini-powered RAG and Next.js.",
        tech: ["Next.js", "Gemini API", "Prisma", "MongoDB"],
        image: "https://res.cloudinary.com/dcpgejete/image/upload/v1764328016/linkedboost_atlmht.png",
        nav_link: "https://linkedboost.vercel.app/"
      },
      {
        name: "BriefBuzz",
        category: "GenAI",
        year: "2025",
        desc: "Daily news summarizer with dynamic prompt engineering and adjustable lengths.",
        tech: ["GeminixAPI", "Next.js", "Tailwind"],
        image: "https://res.cloudinary.com/dcpgejete/image/upload/v1764327992/briefbuzz_r8ntbg.png",
        nav_link: "https://briefbuzz.vercel.app/"
      },
      {
        name: "Chai2Go",
        category: "Full Stack",
        year: "2024",
        desc: "Comprehensive ordering system with robust admin panel and JWT authentication.",
        tech: ["Vite", "TypeScript", "Node.js"],
        image: "https://res.cloudinary.com/dcpgejete/image/upload/v1764328004/chai2go_gx5ljs.png",
        nav_link: "https://chai2go.vercel.app/"
      },
      {
        name: "Algo Arena",
        category: "EdTech",
        year: "2024",
        desc: "Web app providing learning paths for skills and community interaction.",
        tech: ["Next.js", "MongoDB", "Prisma"],
        image: "https://res.cloudinary.com/dcpgejete/image/upload/v1764331385/Screenshot_2025-11-28_164008_w2kwm4.png",
        nav_link: "https://algo-arena-nine.vercel.app/"
      }
    ]
  };

  // --- MOUSE BLOB EFFECT ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- TOGGLE HERO TITLE COLOR ON SCROLL ---
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setTitleScrolled(y > 1); // "a little" scroll threshold
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- SIMPLE PARALLAX FOR SIDE IMAGE ---
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;

    let ticking = false;
    const factor = 0.25; // smaller = subtler parallax

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        el.style.transform = `translateY(${-y * factor}px)`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initialize position on mount
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (blobRef.current) {
      blobRef.current.animate({
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`
      }, { duration: 3000, fill: "forwards" });
    }
  }, [mousePosition]);

  // --- SCROLL REVEAL OBSERVER ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  const openInNewTab = (url: string) => {
    if (!url || url === '#') return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1c1917] font-sans selection:bg-orange-300/40 overflow-x-hidden relative">
      {/* FONTS INJECTION */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@300;400;500;600&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Space Grotesk', sans-serif; }
        
        /* Smooth Scroll Behavior for the whole page */
        html { scroll-behavior: smooth; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #FDFBF7; }
        ::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #a8a29e; }

        /* Animations */
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-active { opacity: 1; transform: translateY(0); }
        
        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0; width: 0%; height: 1px; 
          background: #ea580c; transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        /* Grain texture overlay - Dark grain for light mode */
        .grain {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 50; mix-blend-mode: multiply;
        }
      `}</style>
      <img
        ref={parallaxRef}
        src="https://res.cloudinary.com/dcpgejete/image/upload/v1764315007/ChatGPT_Image_Nov_28_2025_12_58_34_PM_amsneo.png"
        alt="Background"
        aria-hidden={true}
        className="absolute top-18 right-0 w-[350px] sm:w-[500px] object-cover z-10 pointer-events-none will-change-transform opacity-65 sm:opacity-75"
      />
      {/* BACKGROUND BLOB (Burnt Orange) */}
      <div 
        ref={blobRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
      />
      <div className="grain"></div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-40 px-6 py-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-sm">
        <div 
          onClick={() => scrollTo('home')}
          className="text-xl font-serif italic cursor-pointer tracking-tighter text-[#1c1917]"
        >
          Utkarsh Jha.
        </div>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-mono text-[#1c1917]/70">
          <a
            href={DATA.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link hover:text-[#ea580c] transition-colors flex items-center gap-2 normal-case"
          >
            resume
            <ExternalLink className="w-4 h-4" />
          </a>
          {['work', 'experience', 'contact'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item)}
              className="nav-link hover:text-[#ea580c] transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="md:hidden flex w-[30vw] justify-between">
              <a
            href={DATA.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link hover:text-[#ea580c] transition-colors flex items-center gap-0.5 normal-case"
          >
            resume
            <ExternalLink className="w-4 h-4" />
          </a>
          <button onClick={() => scrollTo('contact')} className="text-sm font-mono">menu</button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative my-20 sm:min-h-screen flex flex-col justify-center px-6 md:px-20 pt-20">
        <div className="z-10 max-w-5xl reveal reveal-active mt-[2vh]">
          <p className="font-mono text-[#531d00] sm:text-[#ea580c] text-xs md:text-sm mb-6 tracking-widest uppercase font-medium">
            Based in {DATA.location}
          </p>
          <h1 className="font-serif text-6xl md:text-[9rem] leading-[0.9] tracking-tight mb-8 text-[#1c1917]">
            <span className="block hover:ml-4 transition-all duration-500 cursor-default">Creative</span>
            <span className={`block ${titleScrolled ? 'text-[#1c1917]' : 'text-[#1c1917]/20'} hover:ml-4 transition-all duration-500 cursor-default`}>Technologist</span>
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full border-t border-[#1c1917]/10 pt-8 mt-12">
            <p className="font-sans text-sm md:text-xl text-[#1c1917]/70 max-w-md leading-relaxed font-light">
              {DATA.bio}
            </p>
            <div 
              onClick={() => scrollTo('experience')}
              className="mt-8 md:mt-0 flex items-center gap-2 text-xs font-mono uppercase tracking-widest cursor-pointer hover:text-[#ea580c] transition-colors group text-[#1c1917]/80"
            >
              Scroll to Explore 
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

  {/* EXPERIENCE */}
      <section id="experience" className="py-24 sm:py-32 px-6 md:px-20 bg-[#F5F5F0] relative z-10 mt-32">

        <div className="reveal relative z-10 max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-16 text-center md:text-left text-[#1c1917]">Experience</h2>
          
          <div className="space-y-6 md:space-y-8">
            {DATA.experience.map((exp, i) => (
              <div
                key={i}
                className="group relative py-12 md:py-16 hover:bg-[#1c1917]/5 transition-colors duration-500 px-4 md:px-8  border-t border-[#1c1917]/10"
                style={{
                  backgroundImage:
                    `linear-gradient(rgba(245,245,240,0.72), rgba(245,245,240,0.82)), url('${exp.bg || "https://via.placeholder.com/1200x800?text=Experience+BG"}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-10">
                  <h3 className="text-2xl md:text-4xl font-serif italic group-hover:text-[#ea580c] transition-colors text-[#1c1917]/80">
                    {exp.company}
                  </h3>
                  <span className="font-mono text-xs md:text-sm text-[#ea580c] opacity-60 group-hover:opacity-100 font-medium">
                    {exp.period}
                  </span>
                </div>
                
                <div className="mt-4 md:grid md:grid-cols-12 gap-8 relative z-10">
                  <div className="col-span-4">
                    <p className="text-sm font-medium uppercase tracking-widest text-black mb-2">{exp.role}</p>
                  </div>
                  <div className="col-span-8">
                    <p className="text-black leading-relaxed max-w-xl group-hover:text-[#1c1917] transition-colors">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-[#1c1917]/10" />
          </div>
        </div>
      </section>

      {/* WORK / PROJECTS */}
      <section id="work" className="py-24 px-6 md:px-20 relative z-10">
        <div className="reveal mb-20 flex items-baseline justify-between border-b border-[#1c1917]/10 pb-4">
          <h2 className="font-serif text-4xl md:text-6xl italic text-[#1c1917]">Selected Work</h2>
          <span className="font-mono text-sm opacity-50 hidden md:inline-block text-[#1c1917]">(4)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 z-10">
          {DATA.projects.map((project, i) => (
            <div
              key={i}
              className="reveal group cursor-pointer"
              onClick={() => openInNewTab(project.nav_link)}
              role="link"
              tabIndex={0}
              onKeyDown={(e: ReactKeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openInNewTab(project.nav_link);
                }
              }}
              aria-label={`Open ${project.name}`}
            >
              {/* Project Image Card */}
              <div className="w-full aspect-4/3 rounded-sm mb-6 overflow-hidden relative border border-[#1c1917]/5 group-hover:border-orange-500/30 transition-all duration-500">
                <img
                  src={project.image}
                  alt={`${project.name} preview`}
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 p-4 bg-white/80 backdrop-blur-md border border-[#1c1917]/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-sm z-20">
                  <ExternalLink className="w-5 h-5 text-[#1c1917]" />
                </div>
              </div>

              <div className="flex justify-between items-start border-t border-[#1c1917]/10 pt-4">
                <div>
                  <h3 className="text-3xl font-medium mb-2 text-[#1c1917] group-hover:text-[#ea580c] transition-colors">{project.name}</h3>
                  <p className="text-[#1c1917]/60 text-sm max-w-xs leading-relaxed">{project.desc}</p>
                </div>
                <div className="text-right">
                  <span className="block font-mono text-xs opacity-50 mb-2 text-[#1c1917]">{project.year}</span>
                  <div className="flex gap-2 justify-end">
                    {project.tech.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] uppercase tracking-wider border border-[#1c1917]/10 px-2 py-1 rounded-full text-[#1c1917]/50 whitespace-nowrap">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* FOOTER */}
      <footer id="contact" className="min-h-[80vh] flex flex-col justify-between px-6 md:px-20 py-20 bg-[#FDFBF7] relative z-10">
        <div className="reveal">
          <p className="font-mono text-xs uppercase tracking-widest mb-6 text-[#ea580c]">What's Next?</p>
          <h2 className="font-serif text-5xl md:text-[7rem] leading-[0.9] tracking-tight text-[#1c1917]">
            Let's create <br /> something <span className="italic text-[#ea580c]/70">iconic.</span>
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-[#1c1917]/10 pt-12 mt-20 text-[#1c1917]">
          <div className="col-span-2">
            <span className="font-mono text-xs opacity-40 uppercase block mb-4">Contact</span>
            <a 
              href={`mailto:${DATA.email}`} 
              className="text-2xl md:text-3xl hover:text-[#ea580c] transition-colors flex items-center gap-2 group"
            >
              {DATA.email}
              <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-[#ea580c]" />
            </a>
            <p className="mt-2 opacity-50">{DATA.phone}</p>
          </div>

          <div>
            <span className="font-mono text-xs opacity-40 uppercase block mb-4">Socials</span>
            <ul className="space-y-2">
              {DATA.socials.map((social, i) => (
                <li key={i}>
                  <a href={social.url}  target="_blank"
  rel="noopener noreferrer" className="hover:text-[#ea580c] transition-colors flex items-center gap-2">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:text-right">
            {/* <span className="font-mono text-xs opacity-40 uppercase block mb-4">Meta</span> */}
            <p className="text-sm opacity-40 mt-12">© 2025 Utkarsh Jha</p>
            <p className="text-sm opacity-40">Delhi, IN</p>
            <p className="text-xs opacity-100 mt-4">Designed with <Heart className="w-5 h-5 text-[#ef8752] fill-[#ef8752] inline-block opacity-100" /></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;