let grid = 34;
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


// new one
let screen = [1200,800];
let header = 200;
let border = 100;

let img;
let zoom = 1;
let grid_size = [20,20];
let grid_pos = [0,0,0,0];
let offset = [0,0];
let cel = [50,50];
let tool = 1;


function setup() {
    createCanvas(screen[0], screen[1]);
    frameRate(6)
    textSize(15);
    stroke(255);

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
    cmbTool.option('SELECT');
    cmbTool.option('MOVE');
    cmbTool.changed(change_tool);


    sld_OSX = createSlider(0, 200, 100);
    sld_OSX.position(270, 10);
    sld_OSX.input(change_grid);

    sld_OSY = createSlider(0, 200, 100);
    sld_OSY.position(270, 35);
    sld_OSY.input(change_grid);
//    sld_G.input();
    sld_B = createSlider(0, 255, 50);
    sld_B.position(270, 60);
//    sld_B.input();

    sld_X = createSlider(1, 150, 50);
    sld_X.position(560, 10);
    sld_X.input(change_grid);
    sld_Y = createSlider(1, 150, 50);
    sld_Y.position(560, 35);
    sld_Y.input(change_grid);
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
//    edtRGB.elt.value = sld_R.value()+","+sld_G.value()+","+sld_B.value();
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
      mouseStillPressed();
    }


}

function mousePressed() { // only once on click

  if( img != undefined){
    
    let img_x = border;
    let img_y = header;
    let img_w = img.width*zoom;
    let img_h = img.height*zoom;

    if(mouseY > header  && mouseY < header + img_h && mouseX > 50 && mouseX < 50 + img_w && mouseButton === LEFT){
      
//      alert("dentro da imagem");
        grid_pos[0] = (mouseX - border) / zoom;//- border;
        grid_pos[1] = (mouseY - header) / zoom;//- header;

    }


  }

}

function mouseStillPressed(){

    let img_w = img.width*zoom;
    let img_h = img.height*zoom;

    if (mouseIsPressed) {
        if(mouseY > header  && mouseY < header + img_h && mouseX > 50 && mouseX < 50 + img_w && mouseButton === LEFT && tool == "SELECT"){
            grid_pos[2] = (mouseX - border) / zoom - grid_pos[0];
            grid_pos[3] = (mouseY - header) / zoom - grid_pos[1];
            sld_OSX.elt.value = 100;
            sld_OSY.elt.value = 100;
            offset = [0,0];
        }
    }
}

function draw_header(){ // monta o cabeçalho com as ferramentas

    fill(0, 102, 153);
    noStroke();
    text('OFFSET X', 240, 17);
    text('OFFSET Y', 240, 42);
    text('B', 240, 67);

    text("COLOR", 110, 75);
    text("BCKGD", 175, 75);

    text("GRID X "+sld_X.value(), 460, 17);
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


    img = createImg(file.data, (result) =>{ // PROMISSE
 
        grid_pos = [border,header,img.width,img.height];

    }); 

    img.hide();

       
    image(img,border,header)

  }else{
    alert("This format isn't suport.");
  }

}

function clear_img(){


}

function show_img(){

  if( img != undefined){    


    if(width < (border + img.width*zoom) || height < (header + img.height*zoom)){

        resizeCanvas(50 + border + img.width*zoom, 50 + header + img.height*zoom);

    }


    image(img,border,header, img.width*zoom,img.height*zoom);
  }

}

function change_zoom(){
    zoom = map(sld_Z.value(), 0, 200, 0.2, 2); 
}

function change_grid(){
    grid_size[0] = sld_X.value() / zoom;
    grid_size[1] = sld_Y.value() / zoom;

    offset[0] = map(sld_OSX.value(), 0, 200, -1, 1);
    offset[1] = map(sld_OSY.value(), 0, 200, -1, 1);

}

function change_tool(){
    tool = cmbTool.value();
}



function show_grid(){

    let x = border + (grid_pos[0] * zoom) + (cel[0] * offset[0]) ;//+ offset[0];
    let y = header + (grid_pos[1] * zoom) + (cel[1] * offset[1]);//+ offset[1];
    let w = grid_pos[2] * zoom;
    let h = grid_pos[3] * zoom;

    cel[0] = grid_size[0] * zoom;
    cel[1] = grid_size[1] * zoom;


    for(let i= x; i< x+w; i+= cel[0]){
      line(i,y,i,y+h);
    }

    for(let i= y; i< y+h; i+= cel[1]){
      line(x,i,x+w,i);
    }

}   