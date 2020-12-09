let screen = [1200,800];
let header = 90;
let grid = 20;
let grid_size = [40,20]
let my_draw = [];
let color = [0,0,0];
let bg_color = [0,0,0];

function preload() {


}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(15);
    stroke(255);
    rSlider = createSlider(0, 255, 50);
    rSlider.position(30, 10);
    gSlider = createSlider(0, 255, 50);
    gSlider.position(30, 35);
    bSlider = createSlider(0, 255, 50);
    bSlider.position(30, 60);
    btnClear = createButton('New');
    btnClear.position(360, 15);
    btnClear.mousePressed(limpa);
    btnSave = createButton('Save');
    btnSave.position(360, 45);
    btnSave.mousePressed(generator);
    sld_X = createSlider(0, 150, grid_size[0]);
    sld_X.position(520, 17);
    sld_Y = createSlider(0, 150, grid_size[1]);
    sld_Y.position(520, 42);
    sld_Z = createSlider(4, 40, grid);
    sld_Z.position(520, 67);
    fill(100);
    limpa(0);
}

function draw() {
    background(0, 0, 0);
    draw_header();
    if (mouseIsPressed) {
        if(mouseY > header && mouseX < grid * grid_size[0] + grid && mouseX > grid ){
//            let hor = Math.floor(width/grid);
//            let ver = Math.floor(height/grid);
            let x = Math.floor( (mouseX - grid) / grid);
            let y = Math.floor((mouseY - header) / grid);
            if(mouseButton === LEFT){
                my_draw[x][y] = color;
            }
            if(mouseButton === CENTER){
                rSlider.elt.value = my_draw[x][y][0];
                gSlider.elt.value = my_draw[x][y][1];
                bSlider.elt.value = my_draw[x][y][2];
            }
        }else if(mouseX  >= 290 && mouseX <= 345 && mouseY >= 10 && mouseY <= 55){
          bg_color = color;
        }

      }
    draw_grid();


}

function draw_header(){
    const r = rSlider.value();
    const g = gSlider.value();
    const b = bSlider.value();
    color = [r,g,b];
    grid = sld_Z.value();
    fill(0, 102, 153);
    noStroke();
    text('R', 5, 17);
    text('G', 5, 42);
    text('B', 5, 67);
    text(r, 190, 17);
    text(g, 190, 42);
    text(b, 190, 67);
    text("BRUSH", 225, 75);
    text("BCKGD", 290, 75);
    text("GRID X "+sld_X.value(), 435, 25);
    text("GRID Y "+sld_Y.value(), 435, 50);
    text("ZOOM "+sld_Z.value(), 435, 75);
    fill(color)
    stroke(150);
    rect(225,10, 55,45)
    fill(bg_color)
    rect(290,10, 55,45)
}

function draw_grid(){

  for(let i=0; i<grid_size[0]; i++){
    for(let j=0; j<grid_size[1];j++){
        fill(my_draw[i][j]);
        rect((i + 1) * grid,j * grid + header, grid, grid);
    }
  }

}

function limpa(N){
  if (N==0 || confirm('Deseja apagar todo o desenho?')) {
    my_draw = [];
    color = [0,0,0];
    bg_color = [0,0,0];
    grid_size = [sld_X.value(),sld_Y.value()];
    for(let i=0; i<grid_size[0]; i++){ // create grid array
      my_draw.push([]);
      for(let j=0; j<grid_size[1];j++){
          my_draw[i].push(color);
      }
    }
  }
}

function generator(){
  for(let i=0; i<my_draw.length ; i++){ // create grid array
    my_draw.push([]);
    for(let j=0; j<my_draw[i].length;j++){
        alert([j,i,my_draw[j][i]])
    }
  }
}
