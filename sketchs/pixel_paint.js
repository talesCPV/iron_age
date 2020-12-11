let screen = [1200,800];
let header = 150;
let grid = 34;
let grid_size = [25,10]
let my_draw = [];
let color = [0,0,0];
let bg_color = [0,0,0];
let json_output;
let tool = "BRUSH";
let undo = [];

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(15);
    stroke(255);

    btnNew = createButton('New');
    btnNew.position(25, 15);
    btnNew.mousePressed(new_file);
    btnSave = createButton('Save');
    btnSave.position(25, 45);
    btnSave.mousePressed(generator);

    sld_tool = createSlider(0, 1, 0);
    sld_tool.position(110, 90);

    sld_R = createSlider(0, 255, 50);
    sld_R.position(270, 10);
    sld_G = createSlider(0, 255, 50);
    sld_G.position(270, 35);
    sld_B = createSlider(0, 255, 50);
    sld_B.position(270, 60);

    sld_X = createSlider(1, 150, grid_size[0]);
    sld_X.position(560, 10);
    sld_Y = createSlider(1, 150, grid_size[1]);
    sld_Y.position(560, 35);
    sld_Z = createSlider(4, 40, grid);
    sld_Z.position(560, 60);

    input = createFileInput();
    input.position(790, 17);

    edtName = createInput();
    edtName.position(790, 50);
    edtName.elt.value = "object_name";
    btnFlipX = createButton('Flip X');
    btnFlipX.position(300, 90);
    btnFlipX.mousePressed(flip_x);
    btnFlipY = createButton('Flip Y');
    btnFlipY.position(400, 90);
    btnFlipY.mousePressed(flip_y);
    btnUnod = createButton('Undo');
    btnUnod.position(500, 90);
    btnUnod.mousePressed(restore_undo);
    fill(100);
    new_file(0);
}

function draw() {
    background(0, 0, 0);
    draw_header();
    if (mouseIsPressed) {
      if(mouseY > header && mouseX < grid * grid_size[0] + grid && mouseX > grid ){
        let x = Math.floor( (mouseX - grid) / grid);
        let y = grid_size[1] - 1 - (Math.floor((mouseY - header) / grid));
        if(mouseButton === LEFT){
//          add_undo();
          if(tool == "BRUSH"){
            my_draw[x][y] = color;
          }else{
            let old_col = [ my_draw[x][y][0],my_draw[x][y][1],my_draw[x][y][2] ];
            fill_color(x,y,color, old_col);
  
          }
        }
        if(mouseButton === CENTER){
          sld_R.elt.value = my_draw[x][y][0];
          sld_G.elt.value = my_draw[x][y][1];
          sld_B.elt.value = my_draw[x][y][2];
        }
      }else if(mouseX  >= 175 && mouseX <= 230 && mouseY >= 10 && mouseY <= 55){
        bg_color = color;
      }

    }
    draw_grid();


}

function mousePressed() {
  if(mouseY > header && mouseX < grid * grid_size[0] + grid && mouseX > grid && mouseButton === LEFT){   
      add_undo();
  }
}

function draw_header(){ // monta o cabeçalho com as ferramentas
    const r = sld_R.value();
    const g = sld_G.value();
    const b = sld_B.value();
    color = [r,g,b];
    grid = sld_Z.value();
    fill(0, 102, 153);
    noStroke();
    text('R', 240, 17);
    text('G', 240, 42);
    text('B', 240, 67);
    text(r, 430, 17);
    text(g, 430, 42);
    text(b, 430, 67);
    text(tool, 110, 75);
    text("BCKGD", 175, 75);
    text("TOOL", 30, 100);
    text("GRID X "+sld_X.value(), 460, 17);
    text("GRID Y "+sld_Y.value(), 460, 42);
    text("ZOOM "+sld_Z.value(), 460, 67);
    text("Name:", 725, 75);
    fill(color)
    stroke(150);
    rect(110,10, 55,45)
    fill(bg_color)
    rect(175,10, 55,45)
    if(sld_tool.value() == 0){
      tool = "BRUSH";
    }else{
      tool = "FILL"
    }
}

function draw_grid(){ // monta desenho na tela
  for(let i=0; i<grid_size[0]; i++){
    for(let j=0; j<grid_size[1];j++){
        fill(my_draw[i][grid_size[1]- 1 - j]); // inverte o eixo Y
        rect((i + 1) * grid,j * grid + header , grid, grid);
    }
  }

}

function new_file(N){ // novo arquivo => apaga tudo
  if (N==0 || confirm('Deseja apagar todo o desenho?')) {
    undo = [];
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

function Blank_obj(x,y,name){
  this[name] =  new Object();
  this[name].x = x;
  this[name].y = y;
  this[name].dots = []
  this[name].lines = []
}

function Data_obj(color){
  this.color = color;
  this.data = [];
}

Data_obj.prototype.add = function(data){
  this.data.push(data);
}

function generator(){ // gera o JSON dos sprites
  let last_x;
  let last_color;
  let colors = [];
  let dots = [];
  let lines = [];
  let json_file = new Blank_obj(grid_size[0],grid_size[1],edtName.elt.value);

  for(let y=0; y<my_draw[0].length ; y++){
    last_x = 0;
    last_color = my_draw[0][y];
    for(let x=0; x<my_draw.length;x++){
      if( !comp_colors(last_color,my_draw[x][y]) ){
        add_points(x,y,last_x,last_color,colors,dots,lines);
        last_x = x;
        last_color = my_draw[x][y];
      }

    }
    add_points(my_draw.length,y,last_x,last_color,colors,dots,lines);

  }
  let index = find_color(bg_color,colors);
  if(index >= 0 ){
    dots.splice(index,1);
    lines.splice(index,1);
  }

  json_file[edtName.elt.value].dots = dots;
  json_file[edtName.elt.value].lines = lines;
  json_output = JSON.stringify(json_file);
  alert(json_output);
  console.log ("json:"+json_output);
  saveJSON(json_output, edtName.elt.value+'.json');

}

function add_points(x,y,last_x,last_color,colors,dots,lines){ // adiciona os pontos nos vetores
  let index = find_color(last_color,colors);
  if(index == -1 ){
    colors.push(last_color)
    dots.push(new Data_obj(last_color))
    lines.push(new Data_obj(last_color))
    index = colors.length - 1; // aponta p/ ultimo registro
  }
  if(x - last_x == 1 ){
    dots[index].data.push([last_x,y]);
  }else{
    lines[index].data.push([last_x,y,x - last_x,1]);
  }
}

function find_color(col, obj){ // verifica se esta cor já apareceu antes, se sim retorna o indice
  for(let i=0; i< obj.length;i++){
    if(comp_colors(obj[i],col)){
      return i;
    }
  }
  return -1;
}

function comp_colors(C1,C2){ // compara duas cores
  if(C1[0] == C2[0] && C1[1] == C2[1] && C1[2] == C2[2] ){
    return true;
  }else{
    return false;
  }
}

function fill_color(x,y,new_col, old_col){ // pinta uma área
  if(comp_colors(my_draw[x][y],old_col) && !comp_colors(new_col,old_col)){
    my_draw[x][y] = [new_col[0],new_col[1],new_col[2]];

    // Verifica os vizinhos
    if(x > 0){
      if( comp_colors(my_draw[x-1][y][0], old_col[0]) ){
        fill_color(x-1,y,new_col, old_col);
      }
    }

    if(x < my_draw.length -1){
      if( comp_colors(my_draw[x+1][y][0], old_col[0]) ){
        fill_color(x+1,y,new_col, old_col);
      }
    }

    if(y > 0){
      if( comp_colors(my_draw[x][y-1][0], old_col[0]) ){
        fill_color(x,y-1,new_col, old_col);
      }
    }

    if(y < my_draw[0].length -1){
      if( comp_colors(my_draw[x][y+1][0], old_col[0]) ){
        fill_color(x,y+1,new_col, old_col);
      }
    }

  }
}

function flip_x(){
  add_undo();
  let copy_draw = my_draw.slice();
  for(let x=0; x<my_draw.length ; x++){
    my_draw[x] = copy_draw[my_draw.length - 1 - x];
  }
}

function flip_y(){
  add_undo();
  for(let x=0; x<my_draw.length ; x++){
    let copy_line = my_draw[x].slice();
    for(let y=0; y<copy_line.length ; y++){
      my_draw[x][y] = copy_line[copy_line.length - 1 - y];
    }
  }
}

function add_undo(){
//  if(my_draw.length > 0){
    let copy_draw =[];
    for(let x=0; x<my_draw.length ; x++){
      copy_draw.push([])
      let copy_line = my_draw[x].slice();
      for(let y=0; y<copy_line.length ; y++){
        copy_draw[x].push(copy_line[y]);
      }
    }
    undo.push(copy_draw);
    if(undo.length > 15){
      undo.splice(0,1);
    }
//  }
}

function restore_undo(){
//  alert(undo.length)
  if(undo.length > 0){
    let copy_draw = undo[undo.length-1].slice();
    my_draw = copy_draw;
    undo.splice(undo.length-1,1);
  }
}
