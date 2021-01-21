let screen = [1200,800];
let header = 200;
let grid = 34;
let grid_size = [25,10]
let my_draw = [];
let color = [0,0,0];
let bg_color = [0,0,0];
let json_output;
let undo = [];
let pivot = [1,1];
let copy = [[0,0],[0,0]];
let copy_mem = [];
let cp_click = false;
let count = 0;
let bank_sel = 0;
let bank_color = [];
let bank_size = 15;

// new one
let img;
let zoom = 1;

function setup() {
    createCanvas(screen[0], screen[1]);
    frameRate(6)
    textSize(15);
    stroke(255);

    for(let i=0;i<bank_size;i++){
      bank_color.push([0,0,0]);
    }

    btnClear = createButton('Clear');
    btnClear.position(25, 15);
    btnClear.mousePressed(clear_img);
    btnSave = createButton('Save');
    btnSave.position(25, 45);
//    btnSave.mousePressed();

//    sld_tool = createSlider(0, 1, 0);
//    sld_tool.position(110, 90);
    cmbTool = createSelect();
    cmbTool.position(120, 90);
    cmbTool.option('VIEW GRID');
    cmbTool.option('HIDE GRID');
    cmbTool.option('LINE');
    cmbTool.option('FILL');
    cmbTool.option('COPY');
    cmbTool.option('TURN');
    cmbTool.option('PASTE');

    sld_R = createSlider(0, 255, 50);
    sld_R.position(270, 10);

    sld_G = createSlider(0, 255, 50);
    sld_G.position(270, 35);
//    sld_G.input();
    sld_B = createSlider(0, 255, 50);
    sld_B.position(270, 60);
//    sld_B.input();

    sld_X = createSlider(1, 150, grid_size[0]);
    sld_X.position(560, 10);
    sld_Y = createSlider(1, 150, grid_size[1]);
    sld_Y.position(560, 35);
    sld_Z = createSlider(1, 200, 100);
    sld_Z.position(560, 60);
    sld_Z.input(change_zoom);

    input = createFileInput(open_file);
    input.position(800, 17);

    edtName = createInput();
    edtName.position(800, 50);
    edtName.elt.value = "object_name";
    edtName.size(170);
    cmbPivot = createSelect();
    cmbPivot.position(800, 90);
    cmbPivot.option('X Left   | Y Top');
    cmbPivot.option('X Center | Y Top');
    cmbPivot.option('X Rigth  | Y Top');
    cmbPivot.option('X Left   | Y Center');
    cmbPivot.option('X Center | Y Center');
    cmbPivot.option('X Rigth  | Y Center');
    cmbPivot.option('X Left   | Y Botton');
    cmbPivot.option('X Center | Y Botton');
    cmbPivot.option('X Rigth  | Y Botton');
    cmbPivot.selected('X Center | Y Center');
//    cmbPivot.changed();

    edtRGB = createInput();
    edtRGB.position(270, 90);
    edtRGB.size(120);
    edtRGB.elt.value = sld_R.value()+","+sld_G.value()+","+sld_B.value();
//    edtRGB.changed();

    btnFlipX = createButton('Flip X');
    btnFlipX.position(400, 90);
    btnFlipX.mousePressed();
    btnFlipY = createButton('Flip Y');
    btnFlipY.position(500, 90);
    btnFlipY.mousePressed();
    btnUnod = createButton('Undo');
    btnUnod.position(600, 90);
    btnUnod.mousePressed();

    background(0, 0, 0);

    fill(100);

}

function draw() {
    background(0, 0, 0);
    draw_header();

    if( img != undefined){  
      show_img();
      show_grid();
    }



}

function mousePressed() { // only once on click

  if( img != undefined){
    
    let img_x = 50;
    let img_y = header;
    let img_w = img.width*zoom;
    let img_h = img.height*zoom;

    if(mouseY > header  && mouseY < header + img_h && mouseX > 50 && mouseX < 50 + img_w && mouseButton === LEFT){
      
      alert("dentro da imagem");

    }


  }



}

function draw_header(){ // monta o cabeçalho com as ferramentas
    const r = sld_R.value();
    const g = sld_G.value();
    const b = sld_B.value();
    const rgb = edtRGB.value();

    color = [r,g,b];
    grid = sld_Z.value();


    fill(0, 102, 153);
    noStroke();
    text('R', 240, 17);
    text('G', 240, 42);
    text('B', 240, 67);

    text("COLOR", 110, 75);
    text("BCKGD", 175, 75);

    text("GRID "+sld_X.value(), 460, 17);
    text("GRID Y "+sld_Y.value(), 460, 42);
    text("ZOOM "+sld_Z.value(), 460, 67);
    text("Open:", 735, 32);
    text("Name:", 735, 65);
    text("Pivot:", 735, 105);
    fill(color)
    stroke(150);
    rect(110,10, 55,45)
    fill(bg_color)
    rect(175,10, 55,45)
    tool = cmbTool.value();

}


function open_file(file) {
  if( ["jpeg","png","bmp"].includes(file.subtype) ){

    img = createImg(file.data);
    img.hide();
    
    image(img,50,header);

  }else{
    alert("This format isn't suport.");
  }

}

function clear_img(){




}

function show_img(){

  if( img != undefined){    

    image(img,50,header, img.width*zoom,img.height*zoom);
  }

}

function change_zoom(){
    zoom = map(sld_Z.value(), 0, 200, 0.2, 2); 
}


function show_grid(){

    let img_x = 50;
    let img_y = header;
    let img_w = img.width*zoom;
    let img_h = img.height*zoom;
    let passo = sld_X.value();

    for(let x= img_x; x< img_x+img_w; x+= passo){
      line(x,img_y,x,img_y+img_h);
    }

    for(let y= img_y; y< img_y+img_h; y+= passo){
      line(img_x,y,img_x+img_w,y);
    }

}