const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Circulo
const segments = 20; 

function generateCircleVertices(r, segments){
    let vertices = [];
    for(let i = 0; i < segments; i++){
        let angle = (2 * Math.PI / segments) * i;
        vertices.push({ x: r * Math.cos(angle), y: r * Math.sin(angle) });
    }
    return vertices;
}

//Transformaciones
function translatePoint(point, tx, ty){
    return { x: point.x + tx, y: point.y + ty };
}

function rotatePoint(point, angle){
    return {
        x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
        y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
    };
}

// circulo
function drawShape(vertices, color){
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for(let i=1; i<vertices.length; i++){
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

//palnetas
const sunVertices      = generateCircleVertices(40, segments);
const mercuryVertices  = generateCircleVertices(5, segments);
const venusVertices    = generateCircleVertices(8, segments);
const earthVertices    = generateCircleVertices(10, segments);
const marsVertices     = generateCircleVertices(7, segments);
const jupiterVertices  = generateCircleVertices(20, segments);
const saturnVertices   = generateCircleVertices(17, segments);
const uranusVertices   = generateCircleVertices(14, segments);
const neptuneVertices  = generateCircleVertices(14, segments);

// animacion
let mercuryAngle = 0, venusAngle = 0, earthAngle = 0, marsAngle = 0; // para seguir a los planetas y saber su posicion 
let jupiterAngle = 0, saturnAngle = 0, uranusAngle = 0, neptuneAngle = 0;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const distances = {
    mercury: 60,
    venus: 90,
    earth: 120,
    mars: 150,
    jupiter: 200,
    saturn: 250,
    uranus: 300,
    neptune: 350
};

const speeds = {
    mercury: 0.04,
    venus: 0.03,
    earth: 0.02,
    mars: 0.018,
    jupiter: 0.015,
    saturn: 0.012,
    uranus: 0.01,
    neptune: 0.008
};

// Animacion
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sol - este si es fijo
    const sunPos = sunVertices.map(v => translatePoint(v, centerX, centerY));
    drawShape(sunPos, "orange");

    // FUNCION AUXILIAR: dibujar un planeta orbitando
    function drawPlanet(vertices, angle, distance, color){
        // Rotar el vector 
        let orbitX = distance * Math.cos(angle);
        let orbitY = distance * Math.sin(angle);

        // Trasladar todos los vértices del planeta a esa posición
        let planetPos = vertices.map(v => translatePoint(v, centerX + orbitX, centerY + orbitY));

        drawShape(planetPos, color);
    }

    // planetas
    drawPlanet(mercuryVertices, mercuryAngle, distances.mercury, "gray");
    drawPlanet(venusVertices, venusAngle, distances.venus, "yellow");
    drawPlanet(earthVertices, earthAngle, distances.earth, "blue");
    drawPlanet(marsVertices, marsAngle, distances.mars, "red");
    drawPlanet(jupiterVertices, jupiterAngle, distances.jupiter, "orange");
    drawPlanet(saturnVertices, saturnAngle, distances.saturn, "goldenrod");
    drawPlanet(uranusVertices, uranusAngle, distances.uranus, "lightblue");
    drawPlanet(neptuneVertices, neptuneAngle, distances.neptune, "darkblue");

    // Actualizar ángulos
    mercuryAngle += speeds.mercury;
    venusAngle   += speeds.venus;
    earthAngle   += speeds.earth;
    marsAngle    += speeds.mars;
    jupiterAngle += speeds.jupiter;
    saturnAngle  += speeds.saturn;
    uranusAngle  += speeds.uranus;
    neptuneAngle += speeds.neptune;

    requestAnimationFrame(animate);
}

animate();