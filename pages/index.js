import Head from 'next/head';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const themes = [
  { id: 'terminal', label: 'Terminal', swatch: '#55f5d8' },
  { id: 'circuit', label: 'Circuit', swatch: '#d8fa52' },
  { id: 'signal', label: 'Signal', swatch: '#ffbe43' },
  { id: 'holographic', label: 'Holographic', swatch: '#a58cff' },
];
const layouts = [
  { id: 'orbit', label: 'Orbit', code: '01' },
  { id: 'nodes', label: 'Nodes', code: '02' },
  { id: 'wave', label: 'Wave', code: '03' },
  { id: 'cube', label: 'Cube', code: '04' },
  { id: 'field', label: 'Field', code: '05' },
];
const principles = [
  ['01', 'Think at the data layer', 'The most durable performance wins often happen before data leaves the database.'],
  ['02', 'Make complexity legible', 'Clear, testable code is how systems stay understandable as teams and requirements grow.'],
  ['03', 'Build for the real world', 'Production behavior, edge cases, and operational confidence are part of the product.'],
];
const experience = [
  ['MeroJob', 'Current · Nepal', 'Backend Developer', 'Building and maintaining a job portal trusted by more than 100k jobseekers. I work across data flows, analytics, access control, scheduling, payments, and the day-to-day reliability of a growing platform.', ['Product-scale systems', 'Data & analytics', 'Platform reliability']],
  ['Rojgari', 'Nepal', 'Full Stack Development', 'Contributing to job-market solutions with an emphasis on dependable APIs, thoughtful data modeling, and the kind of performance work users never have to think about.', ['API reliability', 'Data optimization', 'Full-stack collaboration']],
];
const skills = [
  ['01', 'Backend', 'Django · DRF · PostgreSQL · Gunicorn · Supervisor', '◉'],
  ['02', 'Frontend', 'Next.js · Vue.js · JavaScript · TypeScript', '◇'],
  ['03', 'Infrastructure', 'Nginx · Docker · Ubuntu · Bash', '▣'],
  ['04', 'Specialist', 'ORM performance · queues · APIs · migrations · auth', '✦'],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

function HeroScene({ theme }) {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return undefined;
    const colors = {
      terminal: ['#55f5d8', '#a58cff'], circuit: ['#d8fa52', '#ff6a3d'],
      signal: ['#ffbe43', '#ed674a'], holographic: ['#65d7ff', '#cf7cff'],
    }[theme];
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 7;
    const system = new THREE.Group();
    scene.add(system);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85, 2), new THREE.MeshBasicMaterial({ color: colors[0], wireframe: true }));
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38, 1), new THREE.MeshBasicMaterial({ color: colors[1] }));
    system.add(core, inner);
    [0, 0.75, 1.5].forEach((angle, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5 + index * 0.2, 0.016, 5, 96), new THREE.MeshBasicMaterial({ color: colors[index % 2], transparent: true, opacity: 0.84 }));
      ring.rotation.set(angle, angle * 0.7, angle * 1.15); system.add(ring);
    });
    const positions = [];
    for (let i = 0; i < 180; i += 1) { const a = Math.random() * Math.PI * 2; const r = 1.5 + Math.random() * 1.5; positions.push(Math.cos(a) * r, Math.sin(a) * r, (Math.random() - .5) * 1.2); }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: colors[1], size: .035, transparent: true, opacity: .9 })); system.add(particles);
    const pointer = { x: 0, y: 0 };
    const resize = () => { const { width, height } = canvas.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    const move = (event) => { const b = canvas.getBoundingClientRect(); pointer.x = ((event.clientX - b.left) / b.width - .5) * .9; pointer.y = ((event.clientY - b.top) / b.height - .5) * .55; };
    const observer = new ResizeObserver(resize); observer.observe(canvas); canvas.addEventListener('pointermove', move); resize();
    let frame; const render = (time) => { system.rotation.y = time * .00032 + pointer.x; system.rotation.x = Math.sin(time * .0004) * .18 - pointer.y; core.rotation.x = time * .0007; inner.rotation.y = -time * .001; particles.rotation.z = -time * .00018; renderer.render(scene, camera); frame = requestAnimationFrame(render); }; frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('pointermove', move); system.traverse((item) => { if (item.geometry) item.geometry.dispose(); if (item.material) item.material.dispose(); }); renderer.dispose(); };
  }, [theme, reduceMotion]);
  return <div className="scene-wrap" aria-label="Interactive 3D data orbit"><canvas ref={canvasRef} /><span className="scene-label">DRAG THE FIELD</span><div className="scene-fallback">SD</div></div>;
}

function TiltCard({ children, className = '' }) {
  const onMove = (event) => { const box = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--rx', `${((event.clientY - box.top) / box.height - .5) * -8}deg`); event.currentTarget.style.setProperty('--ry', `${((event.clientX - box.left) / box.width - .5) * 10}deg`); };
  return <div className={`tilt-card ${className}`} onPointerMove={onMove} onPointerLeave={(event) => { event.currentTarget.style.setProperty('--rx', '0deg'); event.currentTarget.style.setProperty('--ry', '0deg'); }}>{children}</div>;
}

function TruckScene({ theme }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const colors = { terminal: ['#55f5d8', '#7ea84d'], circuit: ['#d8fa52', '#729544'], signal: ['#ffbe43', '#8baa50'], holographic: ['#65d7ff', '#7c90c4'] }[theme];
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene(); scene.fog = new THREE.Fog('#91a984', 11, 34);
    const camera = new THREE.PerspectiveCamera(46, 1, .1, 100); camera.position.set(7, 5.6, 9);
    const light = new THREE.HemisphereLight('#e8f7ff', '#304a27', 2.8); scene.add(light);
    const sun = new THREE.DirectionalLight('#fff0c5', 2.5); sun.position.set(5, 10, 3); scene.add(sun);
    const terrainGeometry = new THREE.PlaneGeometry(42, 42, 34, 34); const terrainPoints = terrainGeometry.attributes.position; for (let i = 0; i < terrainPoints.count; i += 1) { const x = terrainPoints.getX(i); const y = terrainPoints.getY(i); terrainPoints.setZ(i, (Math.sin(x * .42) * Math.cos(y * .29) + Math.sin(y * .7)) * .16); } terrainGeometry.computeVertexNormals();
    const ground = new THREE.Mesh(terrainGeometry, new THREE.MeshLambertMaterial({ color: colors[1], flatShading: true })); ground.rotation.x = -Math.PI / 2; scene.add(ground);
    const road = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 42), new THREE.MeshLambertMaterial({ color: '#a68b65' })); road.rotation.x = -Math.PI / 2; road.position.y = .14; scene.add(road);
    for (let z = -19; z < 21; z += 3.2) { const dash = new THREE.Mesh(new THREE.PlaneGeometry(.13, 1.35), new THREE.MeshBasicMaterial({ color: '#f7df9c' })); dash.rotation.x = -Math.PI / 2; dash.position.set(0, .16, z); scene.add(dash); }
    const truck = new THREE.Group(); const truckPaint = new THREE.MeshLambertMaterial({ color: colors[0] }); const dark = new THREE.MeshLambertMaterial({ color: '#17211a' }); const chrome = new THREE.MeshLambertMaterial({ color: '#d6d6c5' });
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.6, .24, 1.3), dark); chassis.position.y = .58; truck.add(chassis); const body = new THREE.Mesh(new THREE.BoxGeometry(2.55, .62, 1.24), truckPaint); body.position.y = .91; truck.add(body);
    const bed = new THREE.Mesh(new THREE.BoxGeometry(1.35, .57, 1.18), truckPaint); bed.position.set(-.58, 1.38, 0); truck.add(bed); const bedRail = new THREE.Mesh(new THREE.BoxGeometry(1.42, .07, 1.28), chrome); bedRail.position.set(-.58, 1.69, 0); truck.add(bedRail);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(.95, .94, 1.18), truckPaint); cab.position.set(.76, 1.38, 0); truck.add(cab); const windshield = new THREE.Mesh(new THREE.BoxGeometry(.58, .44, 1.2), new THREE.MeshLambertMaterial({ color: '#36536b' })); windshield.position.set(1.05, 1.62, 0); truck.add(windshield);
    const bumper = new THREE.Mesh(new THREE.BoxGeometry(.12, .18, 1.28), chrome); bumper.position.set(1.36, .74, 0); truck.add(bumper); [-.38, .38].forEach((z) => { const lamp = new THREE.Mesh(new THREE.SphereGeometry(.09, 10, 8), new THREE.MeshBasicMaterial({ color: '#fff3a6' })); lamp.position.set(1.43, 1.02, z); truck.add(lamp); });
    const wheels = []; [-.8, .8].forEach((x) => [-.72, .72].forEach((z) => { const wheelGroup = new THREE.Group(); const tire = new THREE.Mesh(new THREE.CylinderGeometry(.34, .34, .22, 18), dark); tire.rotation.x = Math.PI / 2; const hub = new THREE.Mesh(new THREE.CylinderGeometry(.15, .15, .235, 12), chrome); hub.rotation.x = Math.PI / 2; wheelGroup.add(tire, hub); wheelGroup.position.set(x, .46, z); wheels.push(wheelGroup); truck.add(wheelGroup); })); truck.position.set(0, .12, 2.5); scene.add(truck);
    for (let i = 0; i < 4; i += 1) { const mountain = new THREE.Mesh(new THREE.ConeGeometry(3 + i, 4 + i * .7, 5), new THREE.MeshLambertMaterial({ color: i % 2 ? '#60775c' : '#536c56', flatShading: true })); mountain.position.set(-13 + i * 8, 2, -18 - (i % 2) * 3); scene.add(mountain); }
    for (let i = 0; i < 20; i += 1) { const tree = new THREE.Group(); const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.07, .12, .72, 5), new THREE.MeshLambertMaterial({ color: '#684c31' })); trunk.position.y = .36; const crown = new THREE.Mesh(new THREE.ConeGeometry(.5 + Math.random() * .4, 1.7, 6), new THREE.MeshLambertMaterial({ color: i % 2 ? '#3f6c3b' : '#4d7942' })); crown.position.y = 1.25; tree.add(trunk, crown); tree.position.set((Math.random() > .5 ? 1 : -1) * (3.3 + Math.random() * 9), 0, -12 + Math.random() * 29); scene.add(tree); }
    for (let z = -15; z < 17; z += 2.2) { [-2.55, 2.55].forEach((x) => { const post = new THREE.Mesh(new THREE.BoxGeometry(.07, .58, .07), new THREE.MeshLambertMaterial({ color: '#6f5a3c' })); post.position.set(x, .3, z); scene.add(post); }); }
    const keys = new Set(); const down = (event) => { if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(event.key)) { keys.add(event.key.toLowerCase()); event.preventDefault(); } }; const up = (event) => keys.delete(event.key.toLowerCase()); window.addEventListener('keydown', down); window.addEventListener('keyup', up);
    const resize = () => { const { width, height } = canvas.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); }; const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
    let frame; let velocity = 0; const render = () => { const forward = keys.has('w') || keys.has('arrowup'); const backward = keys.has('s') || keys.has('arrowdown'); const left = keys.has('a') || keys.has('arrowleft'); const right = keys.has('d') || keys.has('arrowright'); velocity += (forward ? .018 : backward ? -.014 : 0); velocity *= .94; if (left) truck.rotation.y += .045; if (right) truck.rotation.y -= .045; truck.translateZ(-velocity); truck.position.x = Math.max(-1.55, Math.min(1.55, truck.position.x)); wheels.forEach((wheel) => { wheel.rotation.y += velocity * 2.9; }); const target = truck.position.clone().add(new THREE.Vector3(5, 4.5, 6)); camera.position.lerp(target, .035); camera.lookAt(truck.position.x, .6, truck.position.z - 2); renderer.render(scene, camera); frame = requestAnimationFrame(render); }; frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); scene.traverse((item) => { if (item.geometry) item.geometry.dispose(); if (item.material) item.material.dispose(); }); renderer.dispose(); };
  }, [theme]);
  return <div className="truck-scene"><canvas ref={canvasRef} /><div className="truck-hud"><b>FIELD RUN / ACTIVE</b><span>WASD or ↑ ↓ ← → to drive</span></div></div>;
}

function NodePlayground() {
  const [node, setNode] = useState(2);
  const weights = [18, 32, 50, 67, 42, 78, 25];
  const weight = weights[node];
  return <div className="node-playground"><div className="node-grid" aria-label="Interactive system node map">{[0, 1, 2, 3, 4, 5, 6].map((item) => <button key={item} onClick={() => setNode(item)} className={node === item ? 'selected' : ''} aria-label={`Inspect node ${item + 1}`} style={{ '--n': item, top: `${21 + (item % 3) * 25}%` }}><i /></button>)}</div><div className="balance-unit"><div className="beam" style={{ '--tilt': `${(weight - 50) * .34}deg` }}><i className="weight left" /><i className="weight right" style={{ transform: `scale(${.62 + weight / 105})` }} /></div><b /><span>LOAD BALANCE {weight}%</span></div><div className="node-readout"><span>NODE_{String(node + 1).padStart(2, '0')}</span><b>{node === 2 ? 'CORE ONLINE' : 'ROUTE STABLE'}</b><small>CLICK A NODE — SEE THE LOAD REBALANCE</small></div></div>;
}

function WavePlayground() {
  const [level, setLevel] = useState(58);
  const [frequency, setFrequency] = useState(2.4);
  const [phase, setPhase] = useState(0);
  useEffect(() => { let frame; const animate = (time) => { setPhase(time * .001); frame = requestAnimationFrame(animate); }; frame = requestAnimationFrame(animate); return () => cancelAnimationFrame(frame); }, []);
  const makeWave = (offset, multiplier = 1) => Array.from({ length: 91 }, (_, index) => { const x = index * (600 / 90); const y = 120 + Math.sin((index / 90) * Math.PI * 2 * frequency * multiplier + phase + offset) * (level * .72); return `${index ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' ');
  return <div className="wave-playground" style={{ '--level': `${level}%` }}><div className="wave-screen"><svg viewBox="0 0 600 240" preserveAspectRatio="none" aria-hidden="true"><path d={makeWave(0)} /><path className="wave-two" d={makeWave(1.4, .65)} /></svg><span>LIVE FREQUENCY / {frequency.toFixed(1)}Hz</span></div><div className="wave-controls"><label>AMPLITUDE {level}<input type="range" min="20" max="100" value={level} onChange={(event) => setLevel(Number(event.target.value))} /></label><label>FREQUENCY {frequency.toFixed(1)}<input type="range" min=".8" max="6" step=".1" value={frequency} onChange={(event) => setFrequency(Number(event.target.value))} /></label></div></div>;
}

function CubePlayground() {
  const [rotation, setRotation] = useState({ x: -24, y: 18 });
  const drag = useRef(null);
  const start = (event) => { drag.current = { x: event.clientX, y: event.clientY, rotation }; event.currentTarget.setPointerCapture(event.pointerId); };
  const move = (event) => { if (!drag.current) return; setRotation({ x: drag.current.rotation.x - (event.clientY - drag.current.y) * .45, y: drag.current.rotation.y + (event.clientX - drag.current.x) * .45 }); };
  const end = () => { drag.current = null; };
  return <div className="cube-playground"><div className="cube-stage" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} style={{ '--turn': `${rotation.y}deg`, '--pitch': `${rotation.x}deg` }}><div className="cube"><i /><i /><i /><i /><i /><i /></div></div><div className="cube-controls"><span>DRAG TO ROTATE IN 3D</span><button onClick={() => setRotation({ ...rotation, y: rotation.y - 45 })}>←</button><button onClick={() => setRotation({ ...rotation, y: rotation.y + 45 })}>→</button></div></div>;
}

export default function Home() {
  const [theme, setTheme] = useState('terminal');
  const [layout, setLayout] = useState('orbit');
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => { setLoaded(true); setTheme(themes[Math.floor(Math.random() * themes.length)].id); setLayout(layouts[Math.floor(Math.random() * layouts.length)].id); const update = () => setProgress((window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100); update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  const reveal = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: .65, ease: 'easeOut' } };

  return <><Head><title>Sital Dulal — Backend Engineer</title><meta name="description" content="Backend engineer crafting scalable, resilient platforms." /><meta name="theme-color" content="#10131d" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,600;1,600&display=swap" rel="stylesheet" /></Head>
    <AnimatePresence>{!loaded && <motion.div className="loader" exit={{ opacity: 0 }}><span>SD</span><i /></motion.div>}</AnimatePresence>
    <main className={`portfolio theme-${theme} layout-${layout}`}>
      <style jsx global>{`
        .layout-switcher{display:flex;gap:4px;margin-left:auto;margin-right:20px}.layout-switcher button{border:1px solid var(--line);background:transparent;color:var(--muted);padding:5px 7px;font:10px 'DM Mono',monospace;cursor:pointer}.layout-switcher button.active{border-color:var(--accent);background:var(--accent);color:#10131d}.layout-name{position:absolute;left:clamp(20px,8vw,130px);top:30px;font:10px 'DM Mono',monospace;letter-spacing:.13em;color:var(--accent)}
        .node-playground,.wave-playground,.cube-playground{width:min(100%,520px);min-height:390px;border:1px solid var(--line);background:color-mix(in srgb,var(--surface) 88%,transparent);box-shadow:0 25px 70px rgba(0,0,0,.22);position:relative}.node-grid{position:absolute;inset:30px;background:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:44px 44px}.node-grid:before{content:"";position:absolute;left:20%;right:20%;top:49%;border-top:1px solid var(--accent);transform:rotate(-21deg);box-shadow:0 0 12px var(--accent)}.node-grid button{position:absolute;left:calc(12% + (var(--n) * 12%));top:calc(21% + ((var(--n) % 3) * 25%));width:34px;height:34px;padding:0;border:1px solid var(--accent);border-radius:50%;background:var(--bg);cursor:pointer;transition:.25s}.node-grid button i{display:block;margin:auto;width:7px;height:7px;border-radius:50%;background:var(--accent)}.node-grid button.selected{transform:scale(1.45);box-shadow:0 0 24px var(--accent);background:var(--accent)}.node-grid button.selected i{background:var(--bg)}.node-readout{position:absolute;left:0;right:0;bottom:0;padding:17px;display:grid;grid-template-columns:1fr 1fr;gap:8px;border-top:1px solid var(--line);font:10px 'DM Mono',monospace}.node-readout span{color:var(--muted)}.node-readout b{color:var(--accent);text-align:right}.node-readout small{grid-column:1/-1;color:var(--muted);letter-spacing:.08em}
        .wave-playground{display:grid;place-items:center;padding:30px}.wave-screen{width:100%;height:245px;position:relative;overflow:hidden;border:1px solid var(--line);background:linear-gradient(180deg,transparent,var(--glow))}.wave-screen svg{width:100%;height:100%;overflow:visible}.wave-screen path{fill:none;stroke:var(--accent);stroke-width:3;filter:drop-shadow(0 0 6px var(--accent));transform:translateY(calc((60% - var(--level)) * .55));transition:transform .25s}.wave-screen .wave-two{stroke:var(--accent2);stroke-width:2;opacity:.7;transform:translateY(calc((var(--level) - 60%) * .4))}.wave-screen span{position:absolute;top:11px;left:12px;font:10px 'DM Mono',monospace;color:var(--accent)}.wave-playground label{width:100%;margin-top:23px;font:10px 'DM Mono',monospace;color:var(--muted);letter-spacing:.1em}.wave-playground input{display:block;width:100%;accent-color:var(--accent);margin-top:12px}
        .cube-playground{display:grid;place-items:center;perspective:850px}.cube-stage{width:230px;height:250px;display:grid;place-items:center;perspective:650px}.cube{width:135px;height:135px;position:relative;transform-style:preserve-3d;transform:rotateX(-24deg) rotateY(var(--turn));transition:transform .65s}.cube i{position:absolute;inset:0;border:1px solid var(--accent);background:color-mix(in srgb,var(--accent) 13%,transparent);box-shadow:inset 0 0 28px var(--glow),0 0 13px var(--glow)}.cube i:nth-child(1){transform:translateZ(67px)}.cube i:nth-child(2){transform:rotateY(180deg) translateZ(67px)}.cube i:nth-child(3){transform:rotateY(90deg) translateZ(67px)}.cube i:nth-child(4){transform:rotateY(-90deg) translateZ(67px)}.cube i:nth-child(5){transform:rotateX(90deg) translateZ(67px)}.cube i:nth-child(6){transform:rotateX(-90deg) translateZ(67px)}.cube-controls{position:absolute;bottom:18px;left:18px;right:18px;display:flex;align-items:center;gap:8px;font:10px 'DM Mono',monospace;color:var(--muted)}.cube-controls span{margin-right:auto}.cube-controls button{width:30px;height:30px;color:var(--accent);background:transparent;border:1px solid var(--line);cursor:pointer}
        .layout-nodes .hero{grid-template-columns:1.2fr .8fr}.layout-nodes .hero-copy,.layout-wave .hero-copy,.layout-cube .hero-copy{order:0}.layout-nodes .hero-scene,.layout-wave .hero-scene,.layout-cube .hero-scene{order:1}.layout-nodes .about{grid-template-columns:1fr .7fr .8fr}.layout-wave .hero{grid-template-columns:.8fr 1.2fr;background:linear-gradient(135deg,var(--bg),var(--surface))}.layout-wave .principle-grid{grid-template-columns:1.4fr .8fr .8fr}.layout-cube .skills-grid{grid-template-columns:repeat(2,1fr)}.layout-cube .skill-card{height:195px}
        .balance-unit{position:absolute;z-index:2;left:35px;right:35px;bottom:82px;height:72px;display:grid;justify-items:center;align-content:end}.balance-unit>b{width:0;height:0;border-left:14px solid transparent;border-right:14px solid transparent;border-bottom:24px solid var(--accent);filter:drop-shadow(0 0 8px var(--accent))}.balance-unit span{font:9px 'DM Mono',monospace;color:var(--accent);letter-spacing:.08em;margin-top:6px}.beam{width:180px;height:3px;background:var(--accent);position:relative;transform:rotate(var(--tilt));transform-origin:center;transition:transform .65s cubic-bezier(.2,.8,.2,1);box-shadow:0 0 10px var(--accent)}.weight{position:absolute;bottom:3px;width:17px;height:17px;border-radius:50% 50% 35% 35%;background:var(--accent);box-shadow:0 0 12px var(--accent);transition:transform .65s cubic-bezier(.2,.8,.2,1)}.weight.left{left:8px;transform:scale(.8)}.weight.right{right:8px}.wave-controls{width:100%;display:grid;grid-template-columns:1fr 1fr;gap:17px;margin-top:22px}.wave-playground .wave-controls label{margin:0}.cube-stage{touch-action:none;cursor:grab}.cube-stage:active{cursor:grabbing}.cube{transform:rotateX(var(--pitch)) rotateY(var(--turn));transition:transform .12s ease-out}
        .truck-scene{width:min(100%,600px);height:420px;position:relative;overflow:hidden;border:1px solid var(--line);background:linear-gradient(#8ec9e2 0 48%,#7da157 49%);box-shadow:0 25px 70px rgba(0,0,0,.22)}.truck-scene canvas{width:100%;height:100%;display:block}.truck-hud{position:absolute;left:16px;bottom:15px;display:grid;gap:5px;font:10px 'DM Mono',monospace;letter-spacing:.08em;pointer-events:none}.truck-hud b{color:var(--accent);text-shadow:0 0 8px var(--accent)}.truck-hud span{color:#eaf6e4;background:rgba(16,25,18,.55);padding:6px 8px}.layout-field .hero{grid-template-columns:1.25fr .75fr;background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 8%,var(--bg)),var(--bg))}.layout-field .hero-scene{order:0}.layout-field .hero-copy{order:1}.layout-field .about{grid-template-columns:.2fr 1fr .8fr}
        @media(max-width:850px){.layout-switcher{margin-left:auto;margin-right:12px}.layout-nodes .hero,.layout-wave .hero,.layout-cube .hero,.layout-field .hero{grid-template-columns:1fr}.node-playground,.wave-playground,.cube-playground{min-height:300px}.layout-wave .principle-grid,.layout-cube .skills-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.layout-switcher{position:absolute;right:55px;margin:0}.layout-switcher button{padding:4px 5px}.layout-name{top:20px}.node-playground,.wave-playground,.cube-playground{width:100%;min-height:270px}.node-grid{inset:18px}.cube-stage{transform:scale(.85)}.layout-wave .principle-grid,.layout-cube .skills-grid{grid-template-columns:1fr}.theme-switcher{position:absolute;right:20px}.wave-controls{grid-template-columns:1fr}.truck-scene{height:300px}}
      `}</style>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <header><a className="brand" href="#top"><b>SD</b><span>SITAL<br />DULAL</span></a><nav><a href="#about">About</a><a href="#experience">Experience</a><a href="#skills">Skills</a></nav><div className="layout-switcher" aria-label="Choose layout">{layouts.map((item) => <button key={item.id} className={layout === item.id ? 'active' : ''} onClick={() => setLayout(item.id)} title={`${item.label} layout`}>{item.code}</button>)}</div><div className="theme-switcher" aria-label="Choose visual theme">{themes.map((item) => <button key={item.id} className={theme === item.id ? 'active' : ''} onClick={() => setTheme(item.id)} aria-label={`Use ${item.label} theme`} title={item.label} style={{ '--swatch': item.swatch }} />)}</div></header>
      <section className="hero" id="top"><div className="hero-noise" /><div className="layout-name">{layouts.find((item) => item.id === layout)?.label.toUpperCase()} MODE / {layouts.find((item) => item.id === layout)?.code}</div><div className="hero-scene">{layout === 'orbit' && <HeroScene theme={theme} />}{layout === 'nodes' && <NodePlayground />}{layout === 'wave' && <WavePlayground />}{layout === 'cube' && <CubePlayground />}{layout === 'field' && <TruckScene theme={theme} />}</div><div className="hero-copy"><motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><i /> AVAILABLE FOR CHALLENGING PROBLEMS</motion.p><motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>Systems that<br /><em>hold up</em> under pressure.</motion.h1><motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}>Backend engineer crafting scalable, resilient platforms.</motion.p><div className="hero-actions"><a className="button primary" href="#experience">Explore work <Arrow /></a><a className="button quiet" href="#contact">Start conversation <Arrow /></a></div></div><a className="scroll-cue" href="#about">SCROLL TO DISCOVER <span>↓</span></a></section>
      <motion.section {...reveal} className="about" id="about"><div className="section-id">01 / ABOUT</div><div className="portrait-zone"><div className="portrait-frame"><span>SD</span><i /><i /><i /></div><small>PHOTO-READY FRAME</small></div><div className="about-copy"><p className="eyebrow">THE ENGINEER BEHIND THE SYSTEM</p><h2>Depth over <em>noise.</em></h2><p>I’m a backend developer who loves diving into production issues and optimizing systems from first principles. I prefer database-level solutions over application loops and enjoy mentoring through clear, testable code.</p><div className="data-panel"><div className="panel-head">LIVE ENGINEERING READOUT <b>●</b></div>{[['Focus', 'Scalable backend systems'], ['Working on', 'Data pipelines & platform performance'], ['Based in', 'Nepal · working globally']].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}<svg viewBox="0 0 320 46" aria-hidden="true"><path d="M0 38 L30 25 L56 31 L84 8 L112 25 L145 16 L172 27 L201 6 L230 21 L260 14 L288 29 L320 4" /></svg></div></div></motion.section>
      <motion.section {...reveal} className="principles"><div className="section-title"><span>02 / PRINCIPLES</span><h2>How I make<br />complexity <em>useful.</em></h2></div><div className="principle-grid">{principles.map(([number, title, text]) => <TiltCard key={number} className="principle"><span>{number}</span><div className="card-face"><h3>{title}</h3><p>{text}</p></div><div className="card-glow">EXPLORE</div></TiltCard>)}</div></motion.section>
      <motion.section {...reveal} className="experience" id="experience"><div className="section-title"><span>03 / EXPERIENCE</span><h2>Real products.<br /><em>Real stakes.</em></h2></div><div className="timeline">{experience.map(([company, location, role, description, tags], i) => <TiltCard key={company} className="experience-card"><div className="experience-head"><span>{location}</span>{i === 0 && <b>NOW</b>}</div><h3>{company}</h3><p className="role">{role}</p><p>{description}</p><div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="card-index">0{i + 1}</div></TiltCard>)}</div></motion.section>
      <motion.section {...reveal} className="skills" id="skills"><div className="section-title"><span>04 / CAPABILITIES</span><h2>Tools with<br /><em>intention.</em></h2></div><div className="skills-grid">{skills.map(([number, title, tools, glyph]) => <article className="skill-card" tabIndex="0" key={title}><div className="skill-inner"><div className="skill-front"><span>{number}</span><h3>{title}</h3><p>{tools}</p></div><div className="skill-back"><b>{glyph}</b><small>{title.toUpperCase()} / READY</small></div></div></article>)}</div></motion.section>
      <motion.section {...reveal} className="contact" id="contact"><div className="contact-mesh" /><span>05 / OPEN CHANNEL</span><h2>Have a knotty problem?<br /><em>Let’s untangle it.</em></h2><p>Production debugging, Django ORM patterns, PostgreSQL optimization, robust systems, or the scaling challenge currently keeping you curious.</p><div className="contact-actions"><a className="button primary" href="mailto:your-email">Send an email <Arrow /></a><a href="your-github-url">GitHub <Arrow /></a><a href="your-profile">LinkedIn <Arrow /></a></div></motion.section>
      <footer><span>© {new Date().getFullYear()} SITAL DULAL</span><span>BUILT WITH CARE, NOT CLUTTER.</span><span>NEPAL ↔ GLOBAL</span></footer>
    </main>
  </>;
}
