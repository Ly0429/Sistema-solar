const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ================= TRANSFORMACIONES =================

// Traslación
function translatePoint(point, tx, ty){
    return{
        x: point.x + tx,
        y: point.y + ty
    };
}

// Escalar
function scalePoint(point, sx, sy){
    return{
        x: point.x * sx,
        y: point.y * sy
    };
}

// Rotación
function rotatePoint(point, angle){
    return{
        x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
        y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
    };
}

// ================= DIBUJAR CIRCULO =================

function drawCircle(x, y, radius, color){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

// ================= VARIABLES =================

let circleAngle = 0;

let moveX = 0;

let circleScale = 1;
let circleGrowing = true;

// ================= FUNCIONES DE CADA CIRCULO =================

// 1️⃣ CÍRCULO NORMAL
function normalCircle(){
    drawCircle(150, 400, 30, "blue");
}

// 2️⃣ CÍRCULO QUE ROTA
function rotatingCircle(){
    let rotated = rotatePoint({x: 0, y: -60}, circleAngle);
    drawCircle(600 + rotated.x, 150 + rotated.y, 30, "green");
}

// 3️⃣ CÍRCULO QUE SE TRASLADA
function movingCircle(){
    drawCircle(150 + moveX, 150, 30, "purple");
}

// 4️⃣ CÍRCULO QUE ESCALA
function scalingCircle(){
    drawCircle(600, 400, 30 * circleScale, "orange");
}

// ================= ANIMACIÓN =================

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    normalCircle();
    rotatingCircle();
    movingCircle();
    scalingCircle();

    // Actualizar rotación
    circleAngle += 0.03;

    // Actualizar traslación
    moveX += 2;
    if(moveX > 300){
        moveX = 0;
    }

    // Actualizar escala
    if(circleGrowing){
        circleScale += 0.01;
        if(circleScale > 1.5) circleGrowing = false;
    } else {
        circleScale -= 0.01;
        if(circleScale < 0.5) circleGrowing = true;
    }

    requestAnimationFrame(animate);
}

animate();