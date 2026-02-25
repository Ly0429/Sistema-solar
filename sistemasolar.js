const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Aplico rotacion
function rotatePoint(point, angle){
    return {
        x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
        y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
    };
}

// Dibujo un circulo
function drawCircle(x, y, radius, color){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}



// El Sol
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

// Los planetas con sus distancias 
let planets = [
    {name: "Mercurio", distance: 60*0.5, radius: 5, color: "gray", angle: 0, speed: 0.04},
    {name: "Venus", distance: 90*0.5, radius: 8, color: "yellow", angle: 0, speed: 0.03},
    {name: "Tierra", distance: 120*0.5, radius: 10, color: "blue", angle: 0, speed: 0.02},
    {name: "Marte", distance: 160*0.5, radius: 8, color: "red", angle: 0, speed: 0.018},
    {name: "Jupiter", distance: 210*0.5, radius: 20, color: "orange", angle: 0, speed: 0.015},
    {name: "Saturno", distance: 270*0.5, radius: 17, color: "goldenrod", angle: 0, speed: 0.012},
    {name: "Urano", distance: 320*0.5, radius: 14, color: "lightblue", angle: 0, speed: 0.01},
    {name: "Neptuno", distance: 370*0.5, radius: 14, color: "darkblue", angle: 0, speed: 0.008}
];

// Animación
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // SOL
    drawCircle(centerX, centerY, 30, "orange");

    // PLANETAS
    planets.forEach(planet => {
        let pos = rotatePoint({x: planet.distance, y: 0}, planet.angle);
        drawCircle(centerX + pos.x, centerY + pos.y, planet.radius, planet.color);

        // Actualizar ángulo
        planet.angle += planet.speed;
    });

    requestAnimationFrame(animate);
}

animate();