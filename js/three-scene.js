/* ==========================================================================
   THREE.JS 3D SCIENTIFIC VISUALIZATION & BACKGROUND
   Interactive 3D particle constellation + glowing scientific core
   ========================================================================== */

(function () {
  let scene, camera, renderer;
  let particleSystem, heroCoreGroup, innerCrystal, outerCage, ring1, ring2;
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let clock;

  function initThree() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    clock = new THREE.Clock();

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.0012);

    // Camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 850;

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a1628, 2.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f5a0, 2);
    dirLight1.position.set(500, 400, 300);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 2.2);
    dirLight2.position.set(-500, -300, 200);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00d9f5, 3, 900);
    pointLight.position.set(0, 0, 150);
    scene.add(pointLight);

    // 1. Create Scientific 3D Constellation Particles
    createParticles();

    // 2. Create Senku Formula 3D Hero Core (Nested Gyro & Crystal)
    createHeroCore();

    // Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);

    // Canvas drag interaction
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging && heroCoreGroup) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        heroCoreGroup.rotation.y += deltaX * 0.008;
        heroCoreGroup.rotation.x += deltaY * 0.008;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    // Touch support for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        mouseX = (e.touches[0].clientX - windowHalfX) * 0.5;
        mouseY = (e.touches[0].clientY - windowHalfY) * 0.5;
      }
    }, { passive: true });

    animate();
  }

  function createParticles() {
    const particleCount = window.innerWidth < 768 ? 400 : 850;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00f5a0); // Senku Green
    const color2 = new THREE.Color(0x00d9f5); // Electric Cyan
    const color3 = new THREE.Color(0x8b5cf6); // Purple Cosmic

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Cylindrical / volumetric distribution
      const radius = 600 + Math.random() * 1100;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i] = radius * Math.cos(phi) * Math.sin(theta);
      positions[i + 1] = radius * Math.sin(phi);
      positions[i + 2] = radius * Math.cos(phi) * Math.cos(theta);

      // Color variation
      const mixRatio = Math.random();
      let pColor;
      if (mixRatio < 0.45) {
        pColor = color1;
      } else if (mixRatio < 0.8) {
        pColor = color2;
      } else {
        pColor = color3;
      }

      colors[i] = pColor.r;
      colors[i + 1] = pColor.g;
      colors[i + 2] = pColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite using canvas
    const particleTexture = createParticleTexture();

    const material = new THREE.PointsMaterial({
      size: 14,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.8
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
  }

  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(0, 245, 160, 0.8)');
    gradient.addColorStop(0.6, 'rgba(0, 217, 245, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  function createHeroCore() {
    heroCoreGroup = new THREE.Group();

    // Inner Glowing Icosahedron (The Science Core)
    const crystalGeo = new THREE.IcosahedronGeometry(75, 1);
    const crystalMat = new THREE.MeshPhongMaterial({
      color: 0x052e16,
      emissive: 0x00f5a0,
      emissiveIntensity: 0.35,
      specular: 0xffffff,
      shininess: 90,
      flatShading: true,
      transparent: true,
      opacity: 0.85
    });
    innerCrystal = new THREE.Mesh(crystalGeo, crystalMat);
    heroCoreGroup.add(innerCrystal);

    // Outer Wireframe Polyhedron
    const cageGeo = new THREE.IcosahedronGeometry(110, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x00d9f5,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    outerCage = new THREE.Mesh(cageGeo, cageMat);
    heroCoreGroup.add(outerCage);

    // Orbiting Gyro Ring 1
    const ring1Geo = new THREE.TorusGeometry(140, 1.8, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f5a0,
      transparent: true,
      opacity: 0.6
    });
    ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    heroCoreGroup.add(ring1);

    // Orbiting Gyro Ring 2
    const ring2Geo = new THREE.TorusGeometry(170, 1.4, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.5
    });
    ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    heroCoreGroup.add(ring2);

    // Position in right-side 3D space
    positionHeroCore();
    scene.add(heroCoreGroup);
  }

  function positionHeroCore() {
    if (!heroCoreGroup) return;
    if (window.innerWidth < 1024) {
      // Mobile / tablet: center behind
      heroCoreGroup.position.set(0, 80, 200);
      heroCoreGroup.scale.set(0.7, 0.7, 0.7);
    } else {
      // Desktop: floating on hero right
      heroCoreGroup.position.set(380, 50, 250);
      heroCoreGroup.scale.set(1.15, 1.15, 1.15);
    }
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    positionHeroCore();
  }

  function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);

    targetRotationY = (mouseX / windowHalfX) * 0.4;
    targetRotationX = (mouseY / windowHalfY) * 0.3;
  }

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // 1. Constellation slow rotation
    if (particleSystem) {
      particleSystem.rotation.y = elapsedTime * 0.04;
      particleSystem.rotation.x = elapsedTime * 0.02;
    }

    // 2. Senku Hero Core scientific dynamics
    if (heroCoreGroup) {
      // Smooth mouse follow
      heroCoreGroup.rotation.y += (targetRotationY - heroCoreGroup.rotation.y) * 0.05;
      heroCoreGroup.rotation.x += (targetRotationX - heroCoreGroup.rotation.x) * 0.05;

      // Organic idle floating
      heroCoreGroup.position.y += Math.sin(elapsedTime * 1.5) * 0.4;

      // Internal component rotations
      if (innerCrystal) {
        innerCrystal.rotation.x += 0.008;
        innerCrystal.rotation.y += 0.012;
      }

      if (outerCage) {
        outerCage.rotation.x -= 0.005;
        outerCage.rotation.z += 0.007;
      }

      if (ring1) {
        ring1.rotation.z += 0.015;
      }

      if (ring2) {
        ring2.rotation.x += 0.01;
        ring2.rotation.y -= 0.012;
      }
    }

    // Camera subtle drift
    camera.position.x += (mouseX * 0.08 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.08 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThree);
  } else {
    initThree();
  }
})();
