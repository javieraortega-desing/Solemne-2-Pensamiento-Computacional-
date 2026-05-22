// ==========================================
// Burbujas Moradas 
// ==========================================

// Variables Globales 

// arrays para guardar posiciones
let x = [];
let y = [];

// array para tamaños
let tamano = [];

// cantidad total de partículas
let cantidad = 1100;


// variables para mover partículas con teclado
let moverX = 0;
let moverY = 0;


// activar caritas
let caritas = false;



// ==========================================
// FUNCIÓN PROPIA
// dibuja burbujas
// ==========================================

function dibujarBurbuja(px, py, ptamano) {

  // burbuja exterior
  fill(120, 70, 255, 30);

  ellipse(
    px,
    py,
    ptamano,
    ptamano
  );


  // centro brillante
  fill(220, 200, 255, 50);

  ellipse(
    px,
    py,
    ptamano / 2,
    ptamano / 2
  );

}



// ==========================================
// SETUP
// ==========================================

function setup() {

  // crear lienzo
  createCanvas(800, 600);

  // quitar bordes
  noStroke();

  // PROCESO:
  // crear partículas iniciales
  for (let i = 0; i < cantidad; i++) {

    // posición aleatoria en eje x
    x[i] = random(width);

    // posición aleatoria en eje y
    y[i] = random(height);

    // tamaños distintos
    // genera variación visual
    tamano[i] = random(20, 50);

  }

}



// ==========================================
// DRAW
// ==========================================

function draw() {

  // fondo negro
  background(10);

  // PROCESO:
  // recorrer todas las partículas
  for (let i = 0; i < cantidad; i++) {


    // ==========================================
    // MOVIMIENTO
    // ==========================================

    // random genera pequeñas variaciones
    // esto crea movimiento
    x[i] = x[i] + random(-1, 1);

    y[i] = y[i] + random(-1, 1);


    // ==========================================
    // MOVIMIENTO CON TECLADO
    // ==========================================

    // las partículas se desplazan
    // según input del teclado
    x[i] = x[i] + moverX;

    y[i] = y[i] + moverY;



    // ==========================================
    // INTERACCIÓN MOUSE
    // ==========================================

    // mouse está a la derecha
    if (mouseX > x[i] && mouseX - x[i] < 80) {

      // partícula se aleja
      x[i] = x[i] - 2;

    }


    // mouse está a la izquierda
    if (mouseX < x[i] && x[i] - mouseX < 80) {

      // partícula se aleja
      x[i] = x[i] + 2;

    }


    // mouse está abajo
    if (mouseY > y[i] && mouseY - y[i] < 80) {

      // partícula se aleja
      y[i] = y[i] - 2;

    }


    // mouse está arriba
    if (mouseY < y[i] && y[i] - mouseY < 80) {

      // partícula se aleja
      y[i] = y[i] + 2;

    }



    // ==========================================
    // BORDES
    // ==========================================

    // si las partículas salen del lienzo
    // reaparecen al lado contrario

    if (x[i] > width) {
      x[i] = 0;
    }

    if (x[i] < 0) {
      x[i] = width;
    }

    if (y[i] > height) {
      y[i] = 0;
    }

    if (y[i] < 0) {
      y[i] = height;
    }



    // ==========================================
    // OUTPUT VISUAL
    // las partículas cambian de forma
    // según cercanía del mouse
    // ==========================================


    // distancia entre mouse y partícula
    let distancia = dist(
      x[i],
      y[i],
      mouseX,
      mouseY
    );


    // ------------------------------------------
    // BURBUJAS
    // ------------------------------------------

    if (distancia > 150) {

      dibujarBurbuja(
        x[i],
        y[i],
        tamano[i]
      );

    }


    // ------------------------------------------
    // CERCA = CARITAS
    // ------------------------------------------

    else if (distancia > 70) {

      // burbuja
      fill(180, 120, 255, 40);

      ellipse(
        x[i],
        y[i],
        tamano[i],
        tamano[i]
      );


      // si se hizo click
      // aparecen caritas
      if (caritas == true) {

        // ojos
        fill(0);

        ellipse(
          x[i] - 5,
          y[i] - 3,
          3,
          3
        );

        ellipse(
          x[i] + 5,
          y[i] - 3,
          3,
          3
        );


        // boca
        noFill();

        stroke(0);

        arc(
          x[i],
          y[i] + 2,
          10,
          8,
          0,
          PI
        );

        noStroke();

      }

    }


  }

}



// ==========================================
// INPUT TECLADO
// ==========================================

function keyPressed() {

  // izquierda
  if (key == 'a' || key == 'A') {

    moverX = -2;
    moverY = 0;

  }


  // derecha
  if (key == 'd' || key == 'D') {

    moverX = 2;
    moverY = 0;

  }


  // arriba
  if (key == 'w' || key == 'W') {

    moverY = -2;
    moverX = 0;

  }


  // abajo
  if (key == 's' || key == 'S') {

    moverY = 2;
    moverX = 0;

  }

}



// ==========================================
// CLICK MOUSE
// ==========================================

function mousePressed() {

  // activar caritas
  caritas = true;

  // recorrer partículas
  for (let i = 0; i < cantidad; i++) {

    // distancia al mouse
    let distancia = dist(
      x[i],
      y[i],
      mouseX,
      mouseY
    );

    // solo partículas cercanas
    if (distancia < 120) {

      // explosión suave
      x[i] = x[i] + random(-50, 50);

      y[i] = y[i] + random(-50, 50);

    }

  }

}