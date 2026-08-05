import Head from 'next/head';
import { useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const projects = [
  {
    title: 'Merojob',
    description:
      'Built core backend systems and REST APIs for Nepal’s leading recruitment marketplace using Django. Focused on secure authentication, performance, and stable growth-ready architecture.',
    // tech: ['Django', 'Python', 'PostgreSQL', 'REST'],
    role: 'Backend Developer',
    timeline: '2024',
    live: 'https://merojob.com',
    repo: '#',
  },
  {
    title: 'Rojgari',
    description:
      'Delivered the job search and employer platform with Nuxt, Vue, and Django, integrating content flows, search, authentication, and web performance optimizations.',
    // tech: ['Nuxt', 'Vue', 'Django', 'Python'],
    role: 'Full Stack Developer',
    timeline: '2024',
    live: 'https://rojgari.com',
    repo: '#',
  },
  {
    title: 'Hostelfinder',
    description:
      'Created a modern accommodation discovery experience using Next.js for the frontend and Django APIs for backend services, with a strong emphasis on maintainable architecture.',
    // tech: ['Next.js', 'Django', 'React', 'PostgreSQL'],
    role: 'Full Stack Developer',
    timeline: '2025',
    live: '#',
    repo: '#',
  },
];

const skills = [
  'Python',
  'Django',
  'Django REST Framework',
  'PostgreSQL',
  'Next.js',
  'React',
  'TypeScript',
  'Docker',
  'Performance Optimization',
];

const workWith = [
  'Python',
  'Django',
  'Django REST Framework',
  'React',
  'Next.js',
  'JavaScript',
  'TypeScript',
  'PostgreSQL',
  'Docker',
  'Linux',
  'Git',
  'Cloud Integrations',
  'AI Applications',
];

function initBackgroundShader(canvas) {
  if (!canvas) return;

  const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!ctx) return;

  function syncSize() {
    const w = canvas.clientWidth || 1280;
    const h = canvas.clientHeight || 720;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(syncSize).observe(canvas);
  }
  syncSize();

  const gl = ctx;
  const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

  const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = v_texCoord;
  vec3 color1 = vec3(0.04, 0.05, 0.07);
  vec3 color2 = vec3(0.23, 0.51, 0.96);
  vec3 color3 = vec3(0.55, 0.36, 0.96);
  float t = u_time * 0.2;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;
  float mask = smoothstep(1.2, 0.5, length(p));
  float wave = sin(p.x * 2.0 + t) * cos(p.y * 1.5 - t * 0.5);
  float glow = 0.05 / abs(sin(p.y + wave * 0.2) * 5.0);
  vec3 finalColor = mix(color1, color2, glow * 0.5);
  finalColor = mix(finalColor, color3, glow * 0.3 * sin(t));
  gl_FragColor = vec4(finalColor * mask, 1.0);
}`;

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl.VERTEX_SHADER, vs));
  gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(program, 'u_time');
  const uRes = gl.getUniformLocation(program, 'u_resolution');

  function render(time) {
    syncSize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (uTime) gl.uniform1f(uTime, time * 0.001);
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }

  render(0);
}

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById('shader-canvas');
    initBackgroundShader(canvas);
  }, []);

  return (
    <>
      <Head>
        <title>Sital Dulal | Full Stack Developer</title>
        <meta
          name="description"
          content="Full Stack Software Developer focused on Django, Next.js, and scalable web applications."
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="page-shell">
        <canvas id="shader-canvas" className="shader-canvas" aria-hidden="true" />

        <header className="topbar">
          <div className="topbar-inner">
            <div className="brand">
              <span className="material-symbols-outlined brand-icon">terminal</span>
              <span className="brand-name">SITAL DULAL</span>
            </div>
            <nav className="nav-links">
              {navLinks.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>
            <a className="btn btn-secondary" href="#contact">
              Contact
            </a>
          </div>
        </header>

        <main className="page-main">
          <section id="home" className="hero-section">
            <div className="hero-copy">
              <p className="eyebrow">Full Stack Software Developer</p>
              <h1 className="hero-title">Building scalable, maintainable backends and polished modern frontends.</h1>
              <p className="hero-text">
                I design clean APIs, optimize database queries, and build systems that remain reliable as they grow.
                I care deeply about architecture, developer experience, and performance at every layer.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">
                  View projects
                </a>
                <a className="btn btn-outline" href="#about">
                  My approach
                </a>
              </div>
            </div>
            <div className="hero-panel glass-panel">
              <div className="panel-label">What I work with</div>
              <div className="skill-grid">
                {workWith.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="section about-section">
            <div className="section-header">
              <p className="section-overline">About Me</p>
              <h2 className="section-title">Thoughtful engineering with a backend-first mindset.</h2>
              <p className="section-description">
                I'm a Full Stack Software Developer with a strong focus on building scalable, maintainable, and high-performance web applications.
                My primary expertise lies in backend development using Django and Django REST Framework, complemented by modern frontend development with React and Next.js.
              </p>
            </div>
            <div className="about-grid">
              <div className="glass-panel about-card">
                <h3>Backend systems</h3>
                <p>
                  I enjoy designing clean APIs, optimizing database queries, and building systems that remain reliable as they grow.
                  I focus on authentication, third-party integrations, and performance optimization.
                </p>
              </div>
              <div className="glass-panel about-card">
                <h3>Developer mindset</h3>
                <p>
                  Beyond applications, I explore framework internals, authentication flows, system architecture, and AI-powered tooling.
                  Understanding how things work under the hood is just as important as knowing how to use them.
                </p>
              </div>
            </div>
          </section>

          <section id="projects" className="section project-section">
            <div className="section-header">
              <p className="section-overline">Selected Work</p>
              <h2 className="section-title">Featured projects</h2>
              <p className="section-description">
                A selection of real work that highlights backend architecture, API development, and modern frontend delivery.
              </p>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.title} className="project-card glass-panel">
                  <div className="project-card-top">
                    <span className="project-tag">{project.role}</span>
                    <span className="project-date">{project.timeline}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((item) => (
                      <span key={item} className="tech-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.live} className="project-link">
                      Live
                    </a>
                    <a href={project.repo} className="project-link">
                      Code
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="section contact-section">
            <div className="glass-panel contact-panel">
              <div>
                <p className="section-overline">Let’s connect</p>
                <h2 className="section-title">Ready to build something reliable and elegant?</h2>
                <p className="section-description">
                  Whether it's backend architecture, API design, or frontend product delivery, I enjoy solving technical challenges and creating systems that scale.
                </p>
              </div>
              <a className="btn btn-primary" href="mailto:hello@example.com">
                Email me
              </a>
            </div>
          </section>
        </main>

        <footer className="page-footer">
          <p>© 2026 Sital Dulal. Built with precision and performance in mind.</p>
        </footer>
      </div>
    </>
  );
}
