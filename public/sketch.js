var socket
var state
var cap
var img
var video
var input
var font

function preload() {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
    font = loadFont('assets/Walkway_Bold.ttf');
}
function setup() {
  createCanvas(windowWidth,windowHeight)
  socket = io.connect('http://localhost:3000');
  state = 1
  img = loadImage("assets/logo.png")
}

function draw() {
  if (state===1) {
    background(20,21,23)
    img.resize(800,316)
    image(img, (width/2)-400,(height/2)-158)
  }
  else if (state===2) {
    background(20,21,23)
    video = createVideo("assets/video.mp4")
    rect(((width/2)-(640/2))-1,((height/2)-(360/2))-1, 642,362)
    video.position((width/2)-(640/2),(height/2)-(360/2))
    state = 3
    setTimeout(capture,5000)
    setTimeout(WishtoSee,5000)
    video.play()
  }
}

function send(){
  var mail = input.value()
  console.log(mail)
  var data = {
    mail: mail
  };
  socket.emit('mail',data)
}

function restart(){
  redraw()
  state = 1
  Yes.remove()
  No.remove()
  input.remove()
  button.remove()
  cap.remove()
  redraw()
}
function capture(){
    socket.emit('capture')
}
function WishtoSee(){
    background(20,21,23)
    fill(255,140,140)
    video.hide()
    size_font=40
    textSize(size_font)
    Wish_text="DESEA VER SU FOTO?"
    textAlign(CENTER)
    text(Wish_text,(width/2), 50)
    Yes = createButton('Yes');
    Yes.position((width/2)-(183), (height/2)+100);
    Yes.size(180,50)
    Yes.id('submit')
    Yes.mousePressed(takePicture);
    No = createButton('No');
    No.position((width/2)+(183), (height/2)+100);
    No.size(180,50)
    No.id('submit')
    No.mousePressed(restart);
}
function takePicture(){
  background(20,21,23)
  Yes.remove()
  No.remove()
  img_w=windowWidth-(windowWidth/2)
  img_h=windowHeight-(windowHeight/2)
  rect((windowWidth/4)-1,(windowHeight/4)-1, img_w+2,img_h+2)
  cap=createImg("assets/picture.png")
  cap.size(img_w,img_h)
  cap.position((windowWidth/4),(windowHeight/4))
  socket.emit('command')
  video.hide()
  fill(255,140,140)
  size_font=40
  textSize(size_font)
  print_text="INGRESE SU CORREO"
  auten_text="ACERQUE TARJETA AL LECTOR, E IMPRIMA"
  textAlign(CENTER)
  text(print_text, (width/2), 50)
  textAlign(CENTER)
  text(auten_text,(width/2), 630)
  input = createInput()
  input.position((width/2)-(450/2), 90)
  input.size(450,30)
  button = createButton('Print');
  button.position((width/2)-(180/2), 680);
  button.size(180,50)
  button.id('submit')
  button.mousePressed(imprimir);
  setTimeout(restart,30000)
}
function imprimir(){
    socket.emit('print')
    restart()
}
function keyPressed(){
    if (state === 1) {
        state = 2
        redraw()
    }
  if (keyCode === 13 && state === 3) {
    send()
    restart()
  }
}

