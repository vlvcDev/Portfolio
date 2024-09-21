// Cursor.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // Cursor movement
    const onMouseMove = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.8, ease: "elastic.out" });
    };

    // Cursor hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor.querySelector('circle'), { attr: { stroke: '#ff0000' }, duration: 0.3 });
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor.querySelector('circle'), { attr: { stroke: '#ffffff' }, duration: 0.3 });
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      });
    });

    window.addEventListener('mousemove', onMouseMove);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', null);
        el.removeEventListener('mouseleave', null);
      });
    };
  }, []);

  return (
    <>
      <svg
        className="custom-cursor"
        ref={cursorRef}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 1000,
          overflow: 'visible',
          mixBlendMode: 'difference',
        }}
      >
        {/* SVG filter definitions will go here */}
        <defs>
          <filter id="wavy">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise">
              <animate
                attributeName="baseFrequency"
                dur="32s"
                values="0.02; 2.15; 0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="16"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          filter="url(#wavy)"
        />
      </svg>
    </>
  );
};

export default Cursor;
