let screen = [1200,800];
let header = 90;
let grid = 34;
let grid_size = [5,5]
let my_draw = [];
let color = [0,0,0];
let bg_color = [0,0,0];
let json_output;

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
            let x = Math.floor( (mouseX - grid) / grid);
            let y = grid_size[1] - 1 - (Math.floor((mouseY - header) / grid));
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
        fill(my_draw[i][grid_size[1]- 1 - j]); // inverte o eixo Y
        rect((i + 1) * grid,j * grid + header , grid, grid);
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

function Blank_obj(x,y){
  this.nome =  new Object();
  this.nome.x = x;
  this.nome.y = y;
  this.nome.dots = []
  this.nome.lines = []
}

function Data_obj(color){
  this.color = color;
  this.data = [];
}

Data_obj.prototype.add = function(data){
  this.data.push(data);
}


function generator(){
  let last_x;
  let colors = [];
  let dots = [];
  let lines = [];
  let r1,g1,b1,r2,g2,b2;
  let index = 0;

  let json_file = new Blank_obj(grid_size[0],grid_size[1]);

  for(let y=0; y<my_draw.length ; y++){ 
    last_x = 0;
    r1 = my_draw[0][y][0];
    g1 = my_draw[0][y][1];
    b1 = my_draw[0][y][2];

    for(let x=0; x<my_draw[y].length;x++){
        r2 = my_draw[x][y][0];
        g2 = my_draw[x][y][1];
        b2 = my_draw[x][y][2];
       
        if(r1!=r2 || g1!=g2 || b1!=b2){
          index = find_color(r1,g1,b1,colors);// colors.indexOf([r1,g1,b1]);
          if(index == -1){
            colors.push([r1,g1,b1])
            dots.push(new Data_obj([r1,g1,b1]))
            lines.push(new Data_obj([r1,g1,b1]))
            index = colors.length - 1; // aponta p/ ultimo registro
          }
        if(x - last_x == 1 ){
            dots[index].data.push([last_x,y]);
          }else{
            lines[index].data.push([last_x,y,x - last_x,1]);
          }
          last_x = x;
          r1 = my_draw[x][y][0];
          g1 = my_draw[x][y][1];
          b1 = my_draw[x][y][2];

      }

    }

  }
//  console.log("dots:"+JSON.stringify(dots));
//  console.log("lines:"+JSON.stringify(lines));

  json_file.nome.dots.push(dots);
  json_file.nome.lines.push(lines);
  json_output = JSON.stringify(json_file);

  console.log ("json:"+json_output);

}

function find_color(r,g,b, obj){
  for(let i=0; i< obj.length;i++){
    if(obj[i][0] == r && obj[i][1] == g && obj[i][2] == b ){
      return i;
    }
  }
  return -1;
}
