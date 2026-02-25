//vertices del poligono

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const Polivertices =[
    { x: -50, y: -50 },
    { x: -50, y: -50 },
    { x:  80, y:  50 },
    { x:   0, y:  80 },
    { x: -80, y:  50 },
]

//Translación

function translatePoint(point, tx, ty){
    return{
        x: point.x + tx,
        y: point.y + ty
    };
}

//Escalar

function scalePoint(point, sx, sy){
    return{
        x: point.x * sx,
        y: point.y * sy
    };
}

//Rotación

function rotatePoint(point, angle){
    return{
        x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
        y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
    };
}

//Dibujar poligono

function drawPolygon(vertices){
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);

    for (let i = 1; i < vertices.length; i++){
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }

    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    //Dibujar vertices
    vertices.forEach(v => {
        ctx.fillStyle = "red";
        ctx.fillRect(v.x - 3, v.y - 3, 6, 6);
    });
}

// NUEVA función para dibujar círculos
function drawCircle(x, y, radius, color){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

// variables de transformación del polígono

let angle = 0;
let scaleFactor = 1;
let growing= true;
let posX = 400;
let posY = 250;

// Variables para los círculos
let circleAngle = 0;
let circleScale = 1;
let circleGrowing = true;
let moveX = 0;

//Animación

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let transformedVertices = [];

    Polivertices.forEach(vertex => {
        
        //Escalamiento
        let scaled = scalePoint(vertex, scaleFactor, scaleFactor);

        //Rotación
        let rotated = rotatePoint(scaled, angle);

        //Traslación
        let translated = translatePoint(rotated, posX, posY);

        transformedVertices.push(translated);
    });

    drawPolygon(transformedVertices);

    // Normal
    drawCircle(100, 400, 30, "blue");

    // Rota
    let rotatedCircle = rotatePoint({x: 0, y: -60}, circleAngle);
    drawCircle(600 + rotatedCircle.x, 150 + rotatedCircle.y, 30, "green");

    // Traslada
    drawCircle(100 + moveX, 150, 30, "purple");

    // Escala
    drawCircle(600, 400, 30 * circleScale, "orange");

    //Actualizar transformaciones del polígono
    angle += 0.02;

    if (growing) {
        scaleFactor += 0.01;
        if (scaleFactor > 1.5) growing = false;
    } else {
        scaleFactor -= 0.01;
        if (scaleFactor < 0.5) growing = true;
    }

    //Actualizar transformaciones de los círculos
    circleAngle += 0.03;

    moveX += 2;
    if (moveX > 300) moveX = 0;

    if (circleGrowing) {
        circleScale += 0.01;
        if (circleScale > 1.5) circleGrowing = false;
    } else {
        circleScale -= 0.01;
        if (circleScale < 0.5) circleGrowing = true;
    }

    requestAnimationFrame(animate);
}

animate();


