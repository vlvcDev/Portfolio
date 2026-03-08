// app/page.tsx
// Drop-in optimized version (single file) while keeping your markup intact.
// Key changes:
// - Split scroll progress updates out of React state (rAF + ref -> no full-page re-render on scroll)
// - Defer IntersectionObserver hookup to idle time
// - Make loader hide based on readiness (two rAFs + fonts.ready) instead of fixed 1500ms
// - Keep the rest of your page unchanged

'use client';

import { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  {
    idx: '01',
    title: 'ML Pipeline Risk Assessment',
    desc: 'Quantitative ML model gauging oil & gas pipeline failure risk for the Colorado ECMC. Engineers risk factors from historical causal failure cases and trains on PHMSA regulatory data. Outputs integrate with a GIS-based scoring system for automated, scalable risk assessment.',
    stack: ['Python', 'TensorFlow', 'GIS', 'PostgreSQL'],
    links: [{ label: 'GitHub', href: 'https://github.com/vlvcDev' }],
  },
  {
    idx: '02',
    title: 'Campus Events App',
    desc: 'Cross-platform mobile app for MSU Denver surfacing on-campus events in real time. AWS Lambda parses and tags 10+ events/sec at 99% accuracy via NLP; Flutter renders thousands of events across 100+ map placemarks. Backed by a custom REST API, Firebase auth, and 8 MongoDB models over 100K+ entries.',
    stack: ['Flutter', 'AWS Lambda', 'Firebase', 'MongoDB', 'NLP'],
    links: [{ label: 'Website', href: 'https://roadrunnerconnect.co/' }],
  },
  {
    idx: '03',
    title: 'Deep Learning Study Tool',
    desc: 'Step-wise AI tutoring tool grounded in proven study methods. Uses prompt engineering and RAG to keep LLM responses accurate, relevant, and safely constrained to course material.',
    stack: ['Python', 'PyTorch', 'RAG', 'spaCy'],
    links: [{ label: 'GitHub', href: 'https://github.com/vlvcDev' }],
  },
  {
    idx: '04',
    title: 'Raspberry Pi HPC Cluster',
    desc: 'Built and benchmarked an 8-core Raspberry Pi cluster achieving a 12.51× program speedup and 156% efficiency per core. Analyzed parallel programming patterns using MPI4PY and identified optimal parallelization use cases.',
    stack: ['Python', 'MPI4PY', 'Raspberry Pi', 'Linux'],
    links: [{ label: 'GitHub', href: 'https://github.com/vlvcDev' }],
  },
];

const SKILLS = [
  { cat: 'Languages', items: ['Python', 'JavaScript', 'Java', 'C++', 'Dart', 'C', 'ARM Assembly', 'GLSL'] },
  { cat: 'Frameworks', items: ['TensorFlow', 'PyTorch', 'React', 'Flutter', 'Node.js', 'spaCy', 'MPI'] },
  { cat: 'Devtools & APIs', items: ['Git', 'Docker', 'Google Cloud', 'OpenAI / Gemini', 'Figma', 'Blender'] },
  { cat: 'Professional', items: ['Agile / Scrum', 'Leadership', 'Critical Thinking', 'Communication'] },
];

const CONTACT = [
  { type: 'Email', val: 'vlvc.dev@gmail.com', href: 'mailto:vlvc.dev@gmail.com' },
  { type: 'GitHub', val: 'github.com/vlvcDev', href: 'https://github.com/vlvcDev' },
  { type: 'LinkedIn', val: 'linkedin.com/in/vlvcdev', href: 'https://linkedin.com/in/vlvcdev' },
];

const BOOT_LINES = [
  '> init sys v4.2.0',
  '  crypto/aes-256-gcm ......... [OK]',
  '  net/tcp-stack .............. [OK]',
  '  fs/ext4 .................... [OK]',
  '> probing hardware',
  '  cpu  arch: x86_64  cores: 8',
  '  mem  available: 14.2 GB',
  '  gpu  vram: 8192 MB',
  '> resolving dependencies',
  '  numpy==1.26.4 .............. [OK]',
  '  torch==2.3.0+cu121 ......... [OK]',
  '  sklearn==1.4.2 ............. [OK]',
  '  transformers==4.41.0 ....... [OK]',
  '> loading model weights',
  '  ████░░░░░░░░  128 / 512 MB',
  '  ███████░░░░░  256 / 512 MB',
  '  █████████░░░  384 / 512 MB',
  '  ████████████  512 / 512 MB [OK]',
  '> establishing uplink',
  '  handshake: TLS 1.3 ......... [OK]',
  '  latency: 3ms / jitter: <1ms',
  '> compiling shaders',
  '  0x7fa3c2e1 vert ............ [OK]',
  '  0x2c18b44f frag ............ [OK]',
  '  0xe4010d22 comp ............ [OK]',
  '> spawning workers',
  '  thread[0]  inference-engine',
  '  thread[1]  io-dispatch',
  '  thread[2]  render-pipeline',
  '  thread[3]  data-loader',
  '> validating checksums',
  '  sha256: a3f9e21c ........... [OK]',
  '  sha256: 77de0f4a ........... [OK]',
  '  sha256: c8b1d930 ........... [OK]',
  '> syncing distributed state',
  '  nodes: 3/3 online',
  '  consensus: RAFT ............ [OK]',
  '> calibrating sensors',
  '  gyro  offset: ±0.003°',
  '  temp  42.1°C  nominal',
  '> activating inference engine',
  '  layers: 24  heads: 16',
  '  context window: 128k tokens',
  '  quantization: int8 ......... [OK]',
  '> scanning for anomalies',
  '  0 critical / 0 warnings .... [OK]',
  '> system ready.',
  ' ',
  '> ping 8.8.8.8',
  '  64 bytes  ttl=118  time=2.4ms',
  '  64 bytes  ttl=118  time=1.9ms',
  '> df -h /',
  '  /dev/nvme0n1p1  256G  89G  167G',
  '> uptime',
  '  up 42d  load: 0.72 0.68 0.61',
  '> ps aux | grep python',
  '  vlvcdev  train.py --epochs 50',
  '  vlvcdev  eval.py --model risk_v2',
  '> git log --oneline -3',
  '  a3f9e21 feat: add risk scoring',
  '  77de0f4 fix: normalize pipeline',
  '  c8b1d93 chore: update deps',
  ' ',
];

function nextPaint(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
}

function idle(cb: () => void) {
  // requestIdleCallback fallback for Safari/older browsers
  const ric = (window as any).requestIdleCallback as undefined | ((fn: () => void, opts?: any) => number);
  if (ric) return ric(cb, { timeout: 800 });
  return window.setTimeout(cb, 1);
}

export default function Home() {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderMounted, setLoaderMounted] = useState(true);

  const sbFillRef = useRef<HTMLDivElement | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const unmountTimerRef = useRef<number | null>(null);
  const idleHandleRef = useRef<number | null>(null);
  const bootTermRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    // ── LOADER: hide when the browser is actually ready (paint + fonts) ──
    const runLoader = async () => {
      await nextPaint();

      // Wait for web fonts (prevents reflow/jank right as loader disappears)
      try {
        // @ts-ignore
        if (document.fonts?.ready) {
          // @ts-ignore
          await document.fonts.ready;
        }
      } catch {
        // ignore
      }

      if (cancelled) return;

      setLoaderVisible(false);

      // Let your CSS transition finish, then unmount overlay
      unmountTimerRef.current = window.setTimeout(() => {
        if (!cancelled) setLoaderMounted(false);
      }, 220);
    };

    runLoader();

    // ── SCROLL BAR: rAF-throttled + direct DOM style update (no React state) ──
    const updateScrollProgress = () => {
      scrollRafRef.current = null;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;

      if (sbFillRef.current) sbFillRef.current.style.height = `${p * 100}%`;
    };

    const onScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = window.requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    // ── IN-VIEW ANIMS: defer IO hookup to idle time to avoid competing with initial render ──
    idleHandleRef.current = idle(() => {
      if (cancelled) return;

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add('in-view');
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.1 }
      );

      ioRef.current = io;

      document.querySelectorAll('.fl').forEach((el) => io.observe(el));
    });

    return () => {
      cancelled = true;

      window.removeEventListener('scroll', onScroll);

      if (scrollRafRef.current != null) cancelAnimationFrame(scrollRafRef.current);
      if (unmountTimerRef.current != null) clearTimeout(unmountTimerRef.current);

      if (ioRef.current) ioRef.current.disconnect();

      // best-effort cancel idle callback
      const cic = (window as any).cancelIdleCallback as undefined | ((id: number) => void);
      if (idleHandleRef.current != null) {
        if (cic) cic(idleHandleRef.current);
        else clearTimeout(idleHandleRef.current);
      }
    };
  }, []);

  // ── BOOT TERMINAL ──
  useEffect(() => {
    const el = bootTermRef.current;
    if (!el) return;
    let idx = 0;
    let timer: number;

    const addLine = () => {
      const text = BOOT_LINES[idx % BOOT_LINES.length];
      idx++;

      const div = document.createElement('div');
      div.className = 'bt-line' + (text.startsWith('>') ? ' bt-cmd' : '');
      if (text.includes('[OK]')) {
        div.innerHTML = text.replace('[OK]', '<span class="bt-ok">[OK]</span>');
      } else {
        div.textContent = text;
      }
      el.appendChild(div);
      el.scrollTop = el.scrollHeight;

      // keep DOM lean — max 40 lines
      while (el.children.length > 40) el.removeChild(el.firstChild!);

      const delay = text.startsWith('>') ? 600 + Math.random() * 400 : 250 + Math.random() * 200;
      timer = window.setTimeout(addLine, delay);
    };

    timer = window.setTimeout(addLine, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ── LOADER ── */}
      {loaderMounted && (
        <div
          className={`loader-overlay${loaderVisible ? '' : ' loader-out'}`}
          style={{
            // Optional but often helps compositing during fade
            willChange: 'opacity, transform',
            transform: 'translateZ(0)',
          }}
        >
          <div className="loading-wave">
            <div className="loading-bar" />
            <div className="loading-bar" />
            <div className="loading-bar" />
            <div className="loading-bar" />
          </div>
        </div>
      )}

      {/* ── SCROLL BAR ── */}
      <div className="sb-track">
        <div className="sb-rail" />
        <div className="sb-fill" ref={sbFillRef} />
      </div>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-brand">
          VC<span className="nav-brand-dot">.</span>
        </div>
        <div className="nav-links">
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#skills" className="nav-link">
            Skills
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-resume">
            Resume
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="hero">
<div className="hero-frame">
  <div className="hero-frame-title">PROFILE</div>

  <div className="hero-frame-content">

        
        <div className="hero-vert">2026 · Portfolio</div>

        <div className="hero-content">
          <div className="ha ha1">
            <div className="hero-label">
              <div className="hero-label-line" />
              <span className="hero-label-text">Computer Science Engineer</span>
            </div>
          </div>

          <div className="ha ha2">
            <h1 className="hero-name">
              VINCENT
              <br />
              CORDOVA<span className="cursor" aria-hidden="true">
                █
              </span>
            </h1>
          </div>

          <div className="ha ha3">
            <p className="hero-tagline">
              Driven by curiosity and the pursuit of
              <br />
              rigorous, applied learning.
            </p>
          </div>

          <div className="ha ha4">
            <div className="hero-actions">
              <a href="#projects" className="btn">
                View Work
              </a>
              <span className="hero-hint">scroll to explore</span>
            </div>
          </div>
        </div>
      </div>

  <div className="hero-frame-stripes" aria-hidden="true">
    {Array.from({ length: 6 }).map((_, i) => (
      <span key={i} className="hero-frame-stripe" />
    ))}
    <span className="hero-frame-stripe hero-frame-stripe--wide" />
  </div>
</div>
  <div className="hero-right">

    {/* scrolling boot terminal */}
    <div className="boot-terminal" ref={bootTermRef} aria-hidden="true" />

    {/* 2 × 3 grid — eye + terminal count as first two cells */}
    <div className="hw-grid" aria-hidden="true">

      {/* row 1: eye | terminal */}
      <div className="hero-widget hw-eye-cell">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/eye.png" alt="" />
      </div>

      <div className="hero-widget hw-terminal-cell">
        <span>{'┌─ '}<span className="terminal-accent">vlvcdev@csm</span>{' ────────┐'}</span>
        {`│                      │
│ user   vlvcdev       │
│ role   cs.eng.       │
│ deg    ms @ csm      │
│ status ● open        │
│ loc    denver / co   │
│                      │
└──────────────────────┘`}
      </div>

      {/* row 2: SYS_STAT | CONN_STATUS */}
      <div className="hero-widget">
        <div className="hw-title">SYS_STAT</div>
        <div className="hw-row">
          <span className="hw-key">CPU</span>
          <div className="hw-bar"><div className="hw-fill" style={{ width: '63%' }} /></div>
          <span className="hw-pct">63%</span>
        </div>
        <div className="hw-row">
          <span className="hw-key">MEM</span>
          <div className="hw-bar"><div className="hw-fill" style={{ width: '78%' }} /></div>
          <span className="hw-pct">78%</span>
        </div>
        <div className="hw-row">
          <span className="hw-key">NET</span>
          <div className="hw-bar"><div className="hw-fill" style={{ width: '31%' }} /></div>
          <span className="hw-pct">31%</span>
        </div>
      </div>

      <div className="hero-widget">
        <div className="hw-title">CONN_STATUS</div>
        <div className="hw-status-row"><span className="hw-dot hw-dot-on" />UPLINK ACTIVE</div>
        <div className="hw-status-row"><span className="hw-dot hw-dot-on" />TLS 1.3 SECURE</div>
        <div className="hw-status-row"><span className="hw-dot hw-dot-off" />VPNX STANDBY</div>
      </div>

      {/* row 3: GEO_LOC | KEY_FP */}
      <div className="hero-widget">
        <div className="hw-title">GEO_LOC</div>
        <div className="hw-status-row"><span className="hw-dot hw-dot-on" />LOCK ACQUIRED</div>
        <div className="hw-kv-row"><span>LAT</span><span>39.7392°N</span></div>
        <div className="hw-kv-row"><span>LNG</span><span>104.9903°W</span></div>
      </div>

      <div className="hero-widget">
        <div className="hw-title">KEY_FP</div>
        <div className="hw-kv-row"><span>ALG</span><span>ED25519</span></div>
        <div className="hw-kv-row"><span>FP</span><span>xK9mP2j4</span></div>
        <div className="hw-status-row"><span className="hw-dot hw-dot-on" />TRUSTED</div>
      </div>

    </div>

  </div>
  </div>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="sec-head fl">
          <span className="sec-num">// 01</span>
          <h2 className="sec-title">ABOUT</h2>
          <div className="sec-rule" />
        </div>

        <div className="about-body fl" style={{ transitionDelay: '0.12s' }}>
          <div className="about-text">
            <p>
              I&apos;m a Computer Science engineer currently pursuing an{' '}
              <strong>MS at Colorado School of Mines</strong>.
              My background spans machine learning, full-stack development, parallel computing, and computer graphics.
            </p>
            <p>
              I recently completed a <strong>full-stack internship at MSU Denver</strong> building a production mobile
              app used across campus, and I&apos;m currently conducting independent research developing ML models
              for pipeline risk assessment in <strong>partnership with the Colorado ECMC</strong>.  
            </p>
            <p>
              I&apos;m a two time hackathon winner, an Upsilon Pi Epsilon honors society member, and hold
              certificates in deep learning from NVIDIA and OpenCV. I&apos;m driven by curiosity and the pursuit
              of rigorous, applied learning.
            </p>
          </div>

          <div className="about-meta">
            <div className="meta-item hi">
              <div className="meta-label">Location</div>
              <div className="meta-val">Denver, CO</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Degree</div>
              <div className="meta-val">MS Computer Science (in progress)</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Status</div>
              <div className="meta-val">Open to opportunities</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Focus</div>
              <div className="meta-val">ML · Full-Stack · Systems</div>
            </div>
          </div>
        </div>

        {/* framed hero image — absolutely positioned, doesn't affect layout */}
        <div className="about-frame" aria-hidden="true">
          <span className="about-frame-title">IDENT</span>
          <div className="about-hero-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/heroimg.png" className="about-hero-img" alt="" />
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="sec-head fl">
          <span className="sec-num">// 02</span>
          <h2 className="sec-title">PROJECTS</h2>
          <div className="sec-rule" />
        </div>

        <div className="projects-body fl" style={{ transitionDelay: '0.12s' }}>
          {PROJECTS.map((p) => (
            <div key={p.idx} className="proj-card">
              <div className="proj-idx">{p.idx}</div>
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-stack">
                {p.stack.map((s) => (
                  <span key={s} className="proj-chip">
                    {s}
                  </span>
                ))}
              </div>
              <div className="proj-actions">
                {p.links.map((l) => (
                  <a key={l.label} href={l.href} className="proj-act">
                    {l.label} →
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="sec-head fl">
          <span className="sec-num">// 03</span>
          <h2 className="sec-title">SKILLS</h2>
          <div className="sec-rule" />
        </div>

        <div className="skills-body fl" style={{ transitionDelay: '0.12s' }}>
          {SKILLS.map((g) => (
            <div key={g.cat}>
              <div className="skill-cat-head">{g.cat}</div>
              <ul className="skill-list">
                {g.items.map((item) => (
                  <li key={item} className="skill-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="sec-head fl">
          <span className="sec-num">// 04</span>
          <h2 className="sec-title">CONTACT</h2>
          <div className="sec-rule" />
        </div>

        <div className="contact-body fl" style={{ transitionDelay: '0.12s' }}>
          <p className="contact-desc">
            I&apos;m open to interesting projects, full-time roles, and technical conversation. I'm always happy to make connections.
          </p>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn resume-btn">
            Download Resume ↓
          </a>
          <div className="contact-list">
            {CONTACT.map((c) => (
              <a key={c.type} href={c.href} className="contact-row">
                <span className="contact-row-type">{c.type}</span>
                <span>{c.val}</span>
                <span className="contact-row-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <span className="footer-copy">© 2026 Vincent Cordova. All rights reserved.</span>
        <span className="footer-mark">
          built <span>different</span>
        </span>
      </footer>
    </>
  );
}