import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    number: '01',
    title: 'Business websites',
    description:
      'Fast, thoughtful websites that help small businesses look credible and get more enquiries.',
    tags: ['Design', 'React', 'SEO'],
  },
  {
    number: '02',
    title: 'Personal brands',
    description:
      'Simple digital homes for people with something valuable to say, build, or share.',
    tags: ['Strategy', 'UI design', 'Development'],
  },
  {
    number: '03',
    title: 'Web experiments',
    description:
      'Useful ideas brought to life with clean interfaces, strong details, and a little personality.',
    tags: ['Prototyping', 'JavaScript', 'Motion'],
  },
];

const skills = ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'UI design', 'Accessibility'];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="logo" href="#top" onClick={closeMenu} aria-label="Hari home">
          H<span>.</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow">Web developer · Assam, India</p>
            <h1>I make the web feel a little more <em>human.</em></h1>
            <p className="hero-intro">
              I&apos;m Hari Narzary, a web developer who creates clean, useful websites for
              people and small businesses.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                See my work <ArrowUpRight size={17} />
              </a>
              <a className="text-link" href="mailto:harinarzary22@gmail.com">
                Let&apos;s talk <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-card art-card-back" />
            <div className="art-card art-card-front">
              <span>HARI</span>
              <strong>+</strong>
              <span>IDEAS</span>
            </div>
            <span className="art-note">build with care</span>
          </div>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>A few things I enjoy making.</h2>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project" key={project.number}>
                <span className="project-number">{project.number}</span>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
                <ArrowUpRight className="project-arrow" size={22} />
              </article>
            ))}
          </div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="section-heading">
            <p className="eyebrow">A little about me</p>
            <h2>Good work starts with listening.</h2>
          </div>
          <div className="about-content">
            <p>
              I care about the details that make a website feel easy to use: clear words,
              calm layouts, fast loading, and a thoughtful experience on every screen.
            </p>
            <div className="skills">
              {skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </section>

        <section className="contact section-wrap" id="contact">
          <p className="eyebrow">Have a project in mind?</p>
          <h2>Let&apos;s make something<br /><em>worth visiting.</em></h2>
          <a className="button button-light" href="mailto:harinarzary22@gmail.com">
            Say hello <Mail size={17} />
          </a>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <span>© {new Date().getFullYear()} Hari Narzary</span>
        <div className="social-links">
          <a href="https://github.com/WebDevHari20" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/hari583/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>
        <span>Built with care.</span>
      </footer>
    </div>
  );
}
