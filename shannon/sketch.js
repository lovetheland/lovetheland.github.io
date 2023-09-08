let font;
let crop;
let shift;

let shaderblurh;
let shaderblurv;
let shaderdisp;

function preload() {
//  img = loadImage('images/amarillo.jpg');
  img = loadImage('images/grass.jpeg');
  
  font = loadFont("EBGaramond-Regular.ttf");
  
  shaderblurh = loadShader('shaders/base.vert', 'shaders/blur.frag');
  shaderblurv = loadShader('shaders/base.vert', 'shaders/blur.frag');
  shaderblurh2 = loadShader('shaders/base.vert', 'shaders/blur.frag');
  shaderblurv2 = loadShader('shaders/base.vert', 'shaders/blur.frag');
  shaderdisp = loadShader('shaders/disp.vert', 'shaders/disp.frag');
  shaderdispflip = loadShader('shaders/base.vert', 'shaders/blur.frag');
  shaderdispflip2 = loadShader('shaders/base.vert', 'shaders/blur.frag');
  shaderdisp2 = loadShader('shaders/disp.vert', 'shaders/disp.frag');
}

function setup() {
  
  crop = 50;
  shift = 50;
  
  canx = 800;
  cany = 800;
  planex = canx;
  planey = cany;
  
  canvas = createCanvas(canx, cany, WEBGL);

  perspective(1.05);

  textFont(font);
  //fill(255,0,0);
  textSize(32);
  textAlign(LEFT, BOTTOM);
  rensphere = createGraphics(canx, cany, WEBGL);
  rensphere2 = createGraphics(canx, cany, WEBGL);
  renspheremesh = createGraphics(canx, cany, WEBGL);
  renblurh = createGraphics(canx, cany, WEBGL);
  renblurv = createGraphics(planex, planey, WEBGL);
  renblurh2 = createGraphics(canx, cany, WEBGL);
  renblurv2 = createGraphics(planex, planey, WEBGL);
  rendisp = createGraphics(canx, cany, WEBGL);
  rendisp2 = createGraphics(canx, cany, WEBGL);
  renflip = createGraphics(canx, cany, WEBGL);
  renflip2 = createGraphics(canx, cany, WEBGL);
  renspheremesh.translate(-width/2, -height/2)

}

function draw() {
  
  rensphere.noStroke();
  rensphere.push();
  rensphere.clear();
  rensphere.rotateY(frameCount * 0.00015);
  rensphere.texture(img);
  rensphere.sphere(650);
  rensphere.pop();
  
  rensphere2.stroke(255);
  rensphere2.strokeWeight(.5)
  rensphere2.push();
  rensphere2.clear();
  rensphere2.rotateY(frameCount * 0.00075 + 20);
  rensphere2.texture(img);
  rensphere2.sphere(650);
  rensphere2.pop();
  
  
//  image(rensphere, -canx/2, -cany/2, canx, cany);
  


  renblurh.shader(shaderblurh)
  shaderblurh.setUniform('tex0', rensphere);
  shaderblurh.setUniform('texelSize', [1.0/width, 1.0/height]);
  shaderblurh.setUniform('direction', [1.0, 0.0]);
  
  renblurh.rect(0, 0, width, height);

  
  renblurv.shader(shaderblurv)
  shaderblurv.setUniform('tex0', renblurh);
  shaderblurv.setUniform('texelSize', [1.0/width, 1.0/height]);
  shaderblurv.setUniform('direction', [0.0, 1.0]);
  
  renblurv.rect(0, 0, width, height);
  
 // image(renspheremesh, -rensphere.width/2, -rensphere.height/2);
 // image(renblurv, -renblurv.width/2, -renblurv.height/2);


  
  renflip.shader(shaderdispflip);
  shaderdispflip.setUniform('tex0', rensphere);
  shaderdispflip.setUniform('texelSize', [1.0/width, 1.0/height]);
  shaderdispflip.setUniform('direction', [0.0, 0.0]);
  
  renflip.rect(0, 0, width, height);
  
  rendisp.shader(shaderdisp);
  shaderdisp.setUniform('tex0', renblurv);
  shaderdisp.setUniform('tex1', rensphere);
  shaderdisp.setUniform('amt', .01);
  
  rendisp.rect(0, 0, width, height);
  
//  background(0);
//  title = 'Shannon Forest'
//  text(title, -270, -260);
  
  renblurh2.shader(shaderblurh2);
  shaderblurh2.setUniform('tex0', rensphere2);
  shaderblurh2.setUniform('texelSize', [1.0/width, 1.0/height]);
  shaderblurh2.setUniform('direction', [1.0, 0.0]);
  
  renblurh2.rect(0, 0, width, height);

  
  renblurv2.shader(shaderblurv2);
  shaderblurv2.setUniform('tex0', renblurh2);
  shaderblurv2.setUniform('texelSize', [1.0/width, 1.0/height]);
  shaderblurv2.setUniform('direction', [0.0, 1.0]);
  
  renblurv2.rect(0, 0, width, height);
  
  renflip2.shader(shaderdispflip2);
  shaderdispflip2.setUniform('tex0', canvas);
  shaderdispflip2.setUniform('texelSize', [1.0/width, 1.0/height]);
  shaderdispflip2.setUniform('direction', [0.0, 0.0]);
  
  renflip2.rect(0, 0, width, height);

  rendisp2.shader(shaderdisp2);
  shaderdisp2.setUniform('tex0', renblurv2);
  shaderdisp2.setUniform('tex1', rensphere);
  shaderdisp2.setUniform('amt', .02);
  
  rendisp2.rect(0, 0, -width, -height);

//  image(rendisp2, crop-rendisp.width/2, crop-rendisp.height/2, rendisp.width-crop*2, rendisp.height-crop*2, crop, crop);
  
  
  image(rensphere2, -rendisp.width/2, -rendisp.height/2);

  
  image(rendisp2, crop-rendisp.width/2, crop-rendisp.height/2, rendisp.width-crop*2, rendisp.height-crop*2);
//  image(rendisp2, crop-rendisp.width/2, crop-rendisp.height/2, rendisp.width-crop*2, rendisp.height-crop*2);
 // push();
 // scale(-1, 1);

 // pop;
//  blendMode(LIGHTEST);

//  blendMode(BLEND);
//  image(rendisp2, crop-rendisp.width/2, crop-rendisp.height/2, rendisp.width-crop*2, rendisp.height-crop*2);
//  image(rendisp2, crop-rendisp.width/2, crop-rendisp.height/2, rendisp.width-crop*2, rendisp.height-crop*2);
//    image(renblurv, crop-rendisp.width/2, crop-rendisp.height/2, rendisp.width-crop*2, rendisp.height-crop*2, shift, shift, rendisp.width-shift*2, rendisp.height-shift*2);
 //   blendMode(LIGHTEST);
//  image(rendisp2, crop-rendisp.width/2, crop-rendisp.height/2, rendisp.width-crop*2, rendisp.height-crop*2);


 // text(round(frameRate(), 2), 20, 20);

}