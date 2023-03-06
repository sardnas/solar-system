function OrbitFactory(data) {
  const OrbitData = [];
  let xRadius = 20;
  let zRadius = 10;

  data.forEach((element) => {
    OrbitData.push({
      id: element.id,
      xRadius: xRadius,
      zRadius: zRadius,
      size: Math.random() * (2 - 1) + 1,
      speed: ((Math.random() * (1 - 0.02) + 1) / zRadius) * 15,
      offset: Math.random() * (2 * Math.PI - 0 + 2 * Math.PI),
      rotationSpeed: Math.random() * (0.03 - 0.01) + 0.03,
      name: element.name,
      gravity: element.gravity,
      radius: element.meanRadius,
      mass: element.massKg,
    });
    xRadius += 5;
    zRadius += 5;
  });
  return OrbitData;
}

export { OrbitFactory };

/*
for (let i = 0; i < number; i++) {
    OrbitData.push({
      id: i,
      xRadius: xRadius,
      zRadius: zRadius,
      size: Math.random() * (2 - 1) + 1,
      speed: ((Math.random() * (1 - 0.02) + 1) / zRadius) * 15,
      offset: 3,
      rotationSpeed: Math.random() * (0.03 - 0.01) + 0.03,
    });
    xRadius += 5;
    zRadius += 5;
  }

*/
