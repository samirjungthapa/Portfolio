import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CinematicLayer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Light
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight('#ff7a00', 5, 20); // Warm orange glow
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Create Bokeh particle system
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Custom parameters for sine wave animation
    const randomScales = new Float32Array(particleCount);
    const randomSpeeds = new Float32Array(particleCount);
    const randomOffsets = new Float32Array(particleCount);

    const colorOrange = new THREE.Color('#ff7a00');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      // Color mix: Warm orange and soft white
      const mixedColor = new THREE.Color().copy(colorWhite).lerp(colorOrange, Math.random() * 0.85);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      // Sizes
      sizes[i] = Math.random() * 2.5 + 0.5;

      // Wave physics parameters
      randomScales[i] = Math.random() * 0.5 + 0.1;
      randomSpeeds[i] = Math.random() * 0.4 + 0.1;
      randomOffsets[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Texture for smooth circular bokeh particle
    const createBokehTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 64;
      pCanvas.height = 64;
      const ctx = pCanvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(pCanvas);
    };

    const material = new THREE.PointsMaterial({
      size: 0.28,
      map: createBokehTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let reqId;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow LERP
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Parallax camera angle shift
      camera.position.x = mouseX * 0.6;
      camera.position.y = mouseY * 0.6;
      camera.lookAt(0, 0, 0);

      // Animate particles via position coordinate offsets
      const positionsAttr = geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const xIdx = i * 3;
        const yIdx = i * 3 + 1;

        // Slow horizontal and vertical floating oscillations using sine/cosine waves
        positionsAttr.array[xIdx] += Math.sin(elapsed * randomSpeeds[i] + randomOffsets[i]) * 0.0012 * randomScales[i];
        positionsAttr.array[yIdx] += Math.cos(elapsed * randomSpeeds[i] + randomOffsets[i]) * 0.0016 * randomScales[i];
      }
      positionsAttr.needsUpdate = true;

      // Rotate particle cloud as a whole very slowly
      particles.rotation.y = elapsed * 0.012;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="cinematic-canvas-overlay" />;
};

export default CinematicLayer;
