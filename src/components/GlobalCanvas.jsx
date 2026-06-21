import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobalCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene & Camera Setup
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Constants and Particle Coordinates Generation
    const particleCount = 2500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Create target coordinates for each shape
    const shapeStarfield = new Float32Array(particleCount * 3);
    const shapeHelix = new Float32Array(particleCount * 3);
    const shapeCube = new Float32Array(particleCount * 3);
    const shapeGlobe = new Float32Array(particleCount * 3);

    // Color definitions based on current theme accents (e.g. Cyan/Gold, Purples)
    const colorCyan = new THREE.Color('#00f2fe');
    const colorGold = new THREE.Color('#C9A227');
    const colorPurple = new THREE.Color('#9d00ff');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Color assignment (staggered mix of themes)
      const mixedColor = colorCyan.clone().lerp(
        i % 3 === 0 ? colorGold : colorPurple,
        Math.random()
      );
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // 1. Starfield Shape
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 30;
      shapeStarfield[i3] = r * Math.sin(phi) * Math.cos(theta);
      shapeStarfield[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      shapeStarfield[i3 + 2] = r * Math.cos(phi);

      // 2. Helix Shape
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const t = (i / particleCount) * 16 * Math.PI;
      const helixRadius = 8;
      shapeHelix[i3] = helixRadius * Math.cos(t + strand);
      shapeHelix[i3 + 1] = (i / particleCount) * 36 - 18;
      shapeHelix[i3 + 2] = helixRadius * Math.sin(t + strand);

      // 3. Cube Shape
      const size = Math.ceil(Math.pow(particleCount, 1 / 3));
      const xGrid = i % size;
      const yGrid = Math.floor((i % (size * size)) / size);
      const zGrid = Math.floor(i / (size * size));
      shapeCube[i3] = (xGrid / size - 0.5) * 22;
      shapeCube[i3 + 1] = (yGrid / size - 0.5) * 22;
      shapeCube[i3 + 2] = (zGrid / size - 0.5) * 22;

      // 4. Globe Shape
      const p = Math.acos(-1 + (2 * i) / particleCount);
      const th = Math.sqrt(particleCount * Math.PI) * p;
      const globeRadius = 11;
      shapeGlobe[i3] = globeRadius * Math.cos(th) * Math.sin(p);
      shapeGlobe[i3 + 1] = globeRadius * Math.sin(th) * Math.sin(p);
      shapeGlobe[i3 + 2] = globeRadius * Math.cos(p);

      // Initial position starts as starfield
      positions[i3] = shapeStarfield[i3];
      positions[i3 + 1] = shapeStarfield[i3 + 1];
      positions[i3 + 2] = shapeStarfield[i3 + 2];
    }

    // 3. Create Circle Texture Programmatically
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    // 4. Geometry and Material setup
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: createCircleTexture()
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 5. Track State (Scroll & Mouse)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollPercent = 0;

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 15;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 15;
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // 6. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      const posAttr = geometry.attributes.position;
      
      // Interpolate mouse movement smoothly
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Slow rotation on particle system
      particleSystem.rotation.y = time * 0.05;
      particleSystem.rotation.x = time * 0.02;

      // Determine active target shape based on scroll phase
      let targetArray = shapeStarfield;
      if (scrollPercent > 0.25 && scrollPercent <= 0.5) {
        targetArray = shapeHelix;
      } else if (scrollPercent > 0.5 && scrollPercent <= 0.75) {
        targetArray = shapeCube;
      } else if (scrollPercent > 0.75) {
        targetArray = shapeGlobe;
      }

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Base morph interpolation
        let tx = targetArray[i3];
        let ty = targetArray[i3 + 1];
        let tz = targetArray[i3 + 2];

        // Apply mouse interaction / gravitational ripple displacement
        const dx = posAttr.array[i3] - mouse.x;
        const dy = posAttr.array[i3 + 1] - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 8) {
          // Push particles slightly away from cursor coordinates
          const force = (8 - dist) * 0.12;
          tx += (dx / dist) * force;
          ty += (dy / dist) * force;
        }

        // LERP particle positions toward calculated targets
        posAttr.array[i3] += (tx - posAttr.array[i3]) * 0.04;
        posAttr.array[i3 + 1] += (ty - posAttr.array[i3 + 1]) * 0.04;
        posAttr.array[i3 + 2] += (tz - posAttr.array[i3 + 2]) * 0.04;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at center, #07070a 0%, #030305 100%)',
        overflow: 'hidden'
      }}
      aria-hidden="true"
    />
  );
};

export default GlobalCanvas;

