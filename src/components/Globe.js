import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { geoInterpolate } from "d3";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CITIES = [
  { lat: "23.062283", long: "-109.699951" },
  { lat: "25.566699", long: "-108.467305" },
  { lat: "22.890533", long: "-109.916740" },
  { lat: "24.13811", long: "-110.30973" },
  { lat: "24.13811", long: "-110.30973" },
  { lat: "19.432608", long: "-99.133209" },
  { lat: "20.66682", long: "-103.39182" },
  { lat: "32.522499", long: "-117.046623" },
];

const FLIGHTS = [
  {
    start: { lat: "23.062283", long: "-109.699951" },
    end: { lat: "32.522499", long: "-117.046623" },
  },
  {
    start: { lat: "5", long: "109.699951" },
    end: { lat: "-32.522499", long: "-117.046623" },
  },
];

const RAILS = [
  {
    start: { lat: "20.062283", long: "-19.699951" },
    end: { lat: "30.522499", long: "-17.046623" },
  },
];

const SAILS = [
  {
    start: { lat: "10.062283", long: "-119.699951" },
    end: { lat: "10.522499", long: "-171.046623" },
  },
];

const addPath = (start, end, radius, color, scene) => {
  // Convert latitude/longitude to XYZ on the globe
  const startXYZ = toVector(start.lat, start.long, radius + 0.3);
  const endXYZ = toVector(end.lat, end.long, radius + 0.3);

  // D3 interpolates along the great arc that passes
  // through both the start and end point
  const d3Interpolate = geoInterpolate(
    [start.long, start.lat],
    [end.long, end.lat]
  );
  const control1 = d3Interpolate(0.25);
  const control2 = d3Interpolate(0.5);
  const control3 = d3Interpolate(0.75);

  // Set the arc height to half the distance between points
  const controlXYZ1 = toVector(control1[1], control1[0], radius + 0.3);
  const controlXYZ2 = toVector(control2[1], control2[0], radius + 0.3);
  const controlXYZ3 = toVector(control3[1], control3[0], radius + 0.3);

  // CubicBezier allows for curves which travel half way
  // around the globe without penetrating the sphere
  const curve = new THREE.CatmullRomCurve3([
    startXYZ,
    controlXYZ1,
    controlXYZ2,
    controlXYZ3,
    endXYZ,
  ]);

  const material = new THREE.LineBasicMaterial({
    linewidth: 2,
    color,
  });

  const geometry = new THREE.BufferGeometry();

  geometry.setFromPoints(curve.getPoints(3000));
  const line = new THREE.Line(geometry, material);
  scene.add(line);
  // Set the draw range to show only the first vertex
  geometry.setDrawRange(0, 1);

  drawAnimatedLine(geometry, performance.now());
};

const addCurve = (start, end, radius, scene) => {
  // Convert latitude/longitude to XYZ on the globe
  const startXYZ = toVector(start.lat, start.long, radius);
  const endXYZ = toVector(end.lat, end.long, radius);

  // D3 interpolates along the great arc that passes
  // through both the start and end point
  const d3Interpolate = geoInterpolate(
    [start.long, start.lat],
    [end.long, end.lat]
  );
  const control1 = d3Interpolate(0.25);
  const control2 = d3Interpolate(0.75);

  // Set the arc height to half the distance between points
  const arcHeight = startXYZ.distanceTo(endXYZ) * 0.5 + radius;
  const controlXYZ1 = toVector(control1[1], control1[0], arcHeight);
  const controlXYZ2 = toVector(control2[1], control2[0], arcHeight);

  // CubicBezier allows for curves which travel half way
  // around the globe without penetrating the sphere
  const curve = new THREE.CubicBezierCurve3(
    startXYZ,
    controlXYZ1,
    controlXYZ2,
    endXYZ
  );

  // Arcs are curved tubes with 0.5px radius and 8 sides
  // Each curve is broken into 44 segments
  const geometry = new THREE.TubeBufferGeometry(curve, 44, 0.3, 8);
  const material = new THREE.MeshBasicMaterial({
    color: "#EF4444",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // Set the draw range to show only the first vertex
  geometry.setDrawRange(0, 1);

  drawAnimatedLine(geometry, performance.now());
};

const drawAnimatedLine = (geometry, startTime) => {
  let drawRangeCount = geometry.drawRange.count;
  const timeElapsed = performance.now() - startTime;

  // Animate the curve for 2.5 seconds
  const progress = timeElapsed / 2500;

  // Arcs are made up of roughly 3000 vertices
  drawRangeCount = progress * 3000;

  if (progress < 0.999) {
    // Update the draw range to reveal the curve
    geometry.setDrawRange(0, drawRangeCount);
    requestAnimationFrame(() => drawAnimatedLine(geometry, startTime));
  }
};

const visibilityForCoordinate = (t, e, n) => {
  const i = 4 * n.width,
    r = parseInt(((t + 180) / 360) * n.width + 0.5),
    s = n.height - parseInt(((e + 90) / 180) * n.height - 0.5),
    o = parseInt(i * (s - 1) + 4 * r) + 3;
  return n.data[o] > 90;
};

const getImageData = (t) => {
  const e = document.createElement("canvas").getContext("2d");
  return (
    (e.canvas.width = t.width),
    (e.canvas.height = t.height),
    e.drawImage(t, 0, 0, t.width, t.height),
    e.getImageData(0, 0, t.width, t.height)
  );
};

const loadMap = () =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = "images/map.png";
  });

const polar2Cartesian = (lat, lng, rad, relAltitude = 0) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((90 - lng) * Math.PI) / 180;
  const r = rad * (1 + relAltitude);
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
};

const toVector = (lat, lng, rad, relAltitude = 0) => {
  const c = polar2Cartesian(lat, lng, rad, relAltitude);
  return new THREE.Vector3(c.x, c.y, c.z);
};

const Globe = () => {
  const el = useRef();
  useEffect(() => {
    const init = async () => {
      const image = await loadMap();
      const imageData = getImageData(image);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        el.current.offsetWidth / el.current.offsetHeight
      );
      camera.updateProjectionMatrix();
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(el.current.offsetWidth, el.current.offsetHeight);
      // document.body.appendChild( renderer.domElement );
      // use ref as a mount point of the Three.js scene instead of the document.body
      el.current.appendChild(renderer.domElement);
      const radius = 80;
      const globe = new THREE.SphereGeometry(radius, 32, 32);
      const globeMaterial = new THREE.MeshBasicMaterial({
        color: "#1F2937",
      });
      const globeShape = new THREE.Mesh(globe, globeMaterial);
      scene.add(globeShape);

      const vertices = [];
      const D2R = Math.PI / 180;
      const r = 200;
      for (let lat = -90; lat <= 90; lat += 180 / r) {
        const t = Math.cos(Math.abs(lat) * D2R) * 25 * Math.PI * 2 * 2;
        for (let r = 0; r < t; r++) {
          const long = (360 * r) / t - 180;
          if (!visibilityForCoordinate(long, lat, imageData)) continue;

          const c = polar2Cartesian(lat, long, radius);
          vertices.push(c.x, c.y, c.z);
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const material = new THREE.PointsMaterial({
        size: 0.8,
        color: "#C7D2FE",
      });

      const points = new THREE.Points(geometry, material);

      scene.add(points);

      const citiesVertices = [];
      CITIES.forEach((city) => {
        const cl = polar2Cartesian(city.lat, city.long, radius);
        const ch = polar2Cartesian(city.lat, city.long, radius + 5);
        citiesVertices.push(cl.x, cl.y, cl.z);
        citiesVertices.push(ch.x, ch.y, ch.z);
      });

      const citiesGeometry = new THREE.BufferGeometry();
      citiesGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(citiesVertices, 3)
      );

      const citiesMaterial = new THREE.LineBasicMaterial({
        color: "#FCD34D",
        linewidth: 2,
        fog: true,
      });

      const citiesLines = new THREE.LineSegments(
        citiesGeometry,
        citiesMaterial
      );

      scene.add(citiesLines);

      FLIGHTS.forEach((f) => {
        addCurve(f.start, f.end, radius, scene);
      });
      RAILS.forEach((f) => {
        addPath(f.start, f.end, radius, "#10B981", scene);
      });
      SAILS.forEach((f) => {
        addPath(f.start, f.end, radius, "#3B82F6", scene);
      });
      camera.orbitControls = new OrbitControls(camera, renderer.domElement);
      camera.orbitControls.enablePan = true;
      camera.orbitControls.enableRotate = true;
      camera.orbitControls.autoRotate = true;

      camera.position.z = 265;
      const animate = function () {
        requestAnimationFrame(animate);
        camera.orbitControls.update();
        renderer.render(scene, camera);
      };
      animate();
    };
    init();
  }, []);

  return <div className="h-screen w-2/3 bg-gray-900" ref={el} />;
};

export default Globe;
