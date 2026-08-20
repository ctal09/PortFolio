import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const capabilities = [
  ['Backend', 'Django · DRF · PostgreSQL · Gunicorn · Supervisor'],
  ['Frontend', 'Next.js · Vue.js · JavaScript · TypeScript'],
  ['Infrastructure', 'Nginx · Docker · Ubuntu · Bash'],
  ['Specialist', 'ORM performance · queues · APIs · migrations · auth'],
];

const principles = [
  { id: '01', title: 'Think at the data layer', copy: 'The most durable performance wins often happen before data leaves the database.' },
  { id: '02', title: 'Make complexity legible', copy: 'Clear, testable code is how systems stay understandable as teams and requirements grow.' },
  { id: '03', title: 'Build for the real world', copy: 'Production behavior, edge cases, and operational confidence are part of the product.' },
];

const experiences = [
  { company: 'MeroJob', label: 'Current · Nepal', role: 'Backend Developer', description: 'Building and maintaining a job portal trusted by more than 100k jobseekers. I work across data flows, analytics, access control, scheduling, payments, and the day-to-day reliability of a growing platform.', focus: ['Product-scale systems', 'Data & analytics', 'Platform reliability'], current: true },
  { company: 'Rojgari', label: 'Nepal', role: 'Full Stack Development', description: 'Contributing to job-market solutions with an emphasis on dependable APIs, thoughtful data modeling, and the kind of performance work users never have to think about.', focus: ['API reliability', 'Data optimization', 'Full-stack collaboration'] },
];

const signalRows = [['Focus', 'Scalable backend systems'], ['Working on', 'Data pipelines & platform performance'], ['Based in', 'Nepal · working globally']];
function Arrow() { return <span aria-hidden="true">↗</span>; }

function DataOrbit({ design }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const palettes = {
      'design-circuit': { core: '#ff6a3d', detail: '#d9f04c' },
      'design-terminal': { core: '#50e3c2', detail: '#9c8cff' },
      'design-signal': { core: '#ffc547', detail: '#d53c2f' },
    };
    const colors = palettes[design] || palettes['design-circuit'];
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 7;

    const system = new THREE.Group();
    scene.add(system);
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.68, 2),
      new THREE.MeshBasicMaterial({ color: colors.core, wireframe: true })
    );
    const innerCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.34, 1),
      new THREE.MeshBasicMaterial({ color: colors.detail })
    );
    system.add(core, innerCore);

    [0, 0.75, 1.5].forEach((rotation, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.4 + index * 0.18, 0.018, 6, 80),
        new THREE.MeshBasicMaterial({ color: index === 1 ? colors.core : colors.detail, transparent: true, opacity: 0.75 })
      );
      ring.rotation.set(rotation, rotation * 0.65, rotation * 1.2);
      system.add(ring);
    });

    const points = [];
    for (let index = 0; index < 100; index += 1) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1.35 + Math.random() * 0.8;
      points.push(Math.cos(theta) * radius, Math.sin(theta) * radius, (Math.random() - 0.5) * 0.5);
    }
    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const cloud = new THREE.Points(pointGeometry, new THREE.PointsMaterial({ color: colors.detail, size: 0.045, transparent: true, opacity: 0.9 }));
    system.add(cloud);

    let width = 0;
    let height = 0;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.7;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.45;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove);
    resize();

    let frame;
    const animate = (time) => {
      system.rotation.y = time * 0.00045 + pointer.x;
      system.rotation.x = Math.sin(time * 0.00035) * 0.25 - pointer.y;
      core.rotation.x = time * 0.0007;
      core.rotation.z = time * 0.00045;
      cloud.rotation.z = -time * 0.00025;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      core.geometry.dispose(); core.material.dispose(); innerCore.geometry.dispose(); innerCore.material.dispose();
      system.children.forEach((item) => { if (item.geometry) item.geometry.dispose(); if (item.material) item.material.dispose(); });
      renderer.dispose();
    };
  }, [design]);

  return <div className="orbital-mark three-stage"><canvas ref={canvasRef} className="three-orbit" aria-label="Interactive abstract data orbit" /><span className="orbit-status">◌ INTERACTIVE 3D</span></div>;
}

export default function Home() {
  const [design, setDesign] = useState('design-circuit');

  useEffect(() => {
    const designs = ['design-circuit', 'design-terminal', 'design-signal'];
    setDesign(designs[Math.floor(Math.random() * designs.length)]);
  }, []);

  return <>
    <Head><title>Sital Dulal — Backend Engineer</title><meta name="description" content="Sital Dulal is a backend engineer building scalable systems with Django, PostgreSQL, and modern web tools." /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet" /></Head>
    <main className={design}>
      <style jsx global>{`
        /* Three visual directions. A design class is chosen at random on each load. */
        .design-terminal{--ink:#ecebf5;--paper:#10111a;--acid:#9c8cff;--orange:#50e3c2;--muted:#a9adbf;--line:rgba(236,235,245,.18);background:var(--paper);color:var(--ink)}
        .design-terminal .site-header{max-width:none;background:#151625}.design-terminal .wordmark i{border-radius:2px;box-shadow:10px 0 0 var(--acid)}.design-terminal .hero{max-width:none;grid-template-columns:.8fr 1.2fr;padding-left:12%;padding-right:12%}.design-terminal .hero-copy{order:2}.design-terminal .system-card{order:1;justify-self:start;width:min(100%,440px);border-radius:22px;box-shadow:12px 12px 0 #50e3c2;background:#202239}.design-terminal .orbital-mark{border-radius:12px;background:repeating-linear-gradient(45deg,transparent 0 11px,rgba(156,140,255,.7) 12px 13px),radial-gradient(circle,#50e3c2 0 5%,#9c8cff 6% 8%,transparent 9%)}.design-terminal .hero-intro,.design-terminal .experience-main>p{color:#c3c6d6}.design-terminal .statement-band{background:#29274b}.design-terminal .principles-section,.design-terminal .skills-section{background:#10111a}.design-terminal .experience-section{background:#191a29}.design-terminal .contact{background:#50e3c2;color:#10111a}.design-terminal .contact .button-light{background:#10111a;color:#ecebf5}.design-terminal .contact .social-link,.design-terminal .text-link{border-color:currentColor}.design-terminal footer{background:#080910}.design-terminal .focus-tags span{border-color:rgba(236,235,245,.25)}
        .design-signal{--ink:#251a17;--paper:#fff7eb;--acid:#ffc547;--orange:#d53c2f;--muted:#80665d;--line:rgba(37,26,23,.18);background:var(--paper)}
        .design-signal .site-header{max-width:none;padding-left:8.5%;padding-right:8.5%;background:#fff7eb}.design-signal .hero{max-width:none;min-height:760px;grid-template-columns:1fr 1fr;background:linear-gradient(115deg,#fff7eb 50%,#ffdf99 50%)}.design-signal .hero-grid{background-image:radial-gradient(var(--orange) 1px,transparent 1px);background-size:13px 13px;opacity:.3}.design-signal .hero h1{font-family:'Playfair Display',serif;font-weight:600;letter-spacing:-.075em}.design-signal .hero h1 em{font-family:Manrope,sans-serif;font-weight:800}.design-signal .system-card{border-radius:50% 50% 8px 8px;width:360px;min-height:490px;box-shadow:0 15px 0 var(--orange);background:#251a17}.design-signal .orbital-mark{margin-top:48px;background:conic-gradient(from 90deg,var(--acid),var(--orange),var(--acid));border-radius:50%}.design-signal .core{box-shadow:none}.design-signal .statement-band{background:var(--orange);color:#fff7eb}.design-signal .principles-section{background:#fff7eb}.design-signal .principles article{border-right-style:dashed}.design-signal .experience-section{background:#ffc547}.design-signal .experience-card{border-color:rgba(37,26,23,.35)}.design-signal .skills-section{background:#fff7eb}.design-signal .contact{background:#251a17;color:#fff7eb}.design-signal .contact .button-light{background:var(--acid);color:var(--ink)}.design-signal .contact .social-link{border-color:#fff7eb}.design-signal footer{background:#d53c2f;color:#fff7eb}
        .three-stage{width:250px;height:250px;isolation:isolate}.three-orbit{position:absolute;inset:0;width:100%;height:100%;z-index:2;cursor:crosshair}.orbit-status{position:absolute;z-index:3;right:-24px;bottom:12px;padding:5px 7px;background:var(--paper);color:var(--ink);font:9px 'DM Mono',monospace;letter-spacing:.08em;pointer-events:none}.design-terminal .three-orbit{filter:drop-shadow(0 0 12px rgba(80,227,194,.28))}.design-signal .three-orbit{filter:drop-shadow(0 0 8px rgba(255,197,71,.45))}
        @media(max-width:720px){.design-terminal .hero,.design-signal .hero{padding-left:21px;padding-right:21px;grid-template-columns:1fr}.design-terminal .hero-copy{order:0}.design-terminal .system-card{order:0}.design-signal .system-card{width:min(100%,360px)}}
      `}</style>
      <header className="site-header"><a className="wordmark" href="#top" aria-label="Sital Dulal home"><i /><span>SITAL<br />DULAL</span></a><nav aria-label="Main navigation"><a href="#about">Approach</a><a href="#experience">Experience</a><a href="#skills">Capabilities</a></nav><a className="header-contact" href="#contact">Let’s talk <Arrow /></a></header>
      <section className="hero" id="top"><div className="hero-grid" aria-hidden="true" /><div className="hero-copy"><p className="kicker"><span className="pulse" /> AVAILABLE FOR GOOD PROBLEMS</p><h1>Systems that<br /><em>hold up</em> under<br />pressure.</h1><p className="hero-intro">I’m Sital, a backend engineer shaping scalable products, clean data paths, and calmer production environments.</p><div className="hero-actions"><a className="button button-dark" href="#experience">Explore my work <Arrow /></a><a className="text-link" href="#contact">Start a conversation <Arrow /></a></div></div><aside className="system-card"><div className="card-topline"><span>{design.replace('design-', '').toUpperCase()} / SYSTEM NOTE</span><span>01 / 03</span></div><DataOrbit design={design} /><p className="system-statement">Making complex data problems feel <strong>elegantly boring.</strong></p><div className="signal-list">{signalRows.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div></aside><div className="hero-index">SCROLL TO DISCOVER <span>↓</span></div></section>
      <section className="statement-band" id="about"><p className="section-number">( 01 )</p><div><p className="kicker">MY OPERATING SYSTEM</p><h2>I like the work beneath the interface.</h2><p className="large-copy">I’m a backend developer who enjoys going from a vague production issue to a simple, lasting answer. That means reasoning from first principles, favoring database-level solutions, and writing code that helps the next person move with confidence.</p></div></section>
      <section className="principles-section"><div className="principles-intro"><p className="kicker">HOW I WORK</p><p>I care about the invisible engineering choices that make a product feel fast, reliable, and easy to evolve.</p></div><div className="principles">{principles.map((item) => <article key={item.id}><span>{item.id}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
      <section className="experience-section" id="experience"><div className="experience-heading"><p className="section-number">( 02 )</p><div><p className="kicker">WHERE I’VE CONTRIBUTED</p><h2>Work with<br /><em>real-world weight.</em></h2></div></div><div className="experience-list">{experiences.map((item) => <article className="experience-card" key={item.company}><div className="experience-meta"><span>{item.label}</span>{item.current && <span className="now">NOW</span>}</div><div className="experience-main"><div><h3>{item.company}</h3><p className="role">{item.role}</p></div><p>{item.description}</p></div><div className="focus-tags">{item.focus.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>
      <section className="skills-section" id="skills"><div className="skills-heading"><p className="section-number">( 03 )</p><div><p className="kicker">TOOLKIT</p><h2>Useful tools.<br />Purposeful choices.</h2></div></div><div className="capability-list">{capabilities.map(([title, tools], index) => <div className="capability" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{tools}</p></div>)}</div></section>
      <section className="contact" id="contact"><div className="contact-top"><p className="section-number">( 04 )</p><p className="kicker">OPEN CHANNEL</p></div><h2>Have a knotty<br />problem? <em>Let’s untangle it.</em></h2><p>Production debugging, Django ORM patterns, PostgreSQL optimization, robust systems, or the scaling challenge currently keeping you curious.</p><div className="contact-links"><a className="button button-light" href="mailto:your-email">Send an email <Arrow /></a><a href="your-github-url" className="social-link">GitHub <Arrow /></a><a href="your-profile" className="social-link">LinkedIn <Arrow /></a></div></section>
      <footer><span>© {new Date().getFullYear()} Sital Dulal</span><span>BUILT WITH CARE, NOT CLUTTER.</span></footer>
    </main>
  </>;
}
