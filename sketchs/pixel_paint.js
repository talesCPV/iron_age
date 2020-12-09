let screen = [800,600];
let header = 80;
let grid = 20;
let my_draw = [];
let color = [0,0,0];


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
    btnSave = createButton('Save');
    btnSave.position(300, 15);
    btnClear = createButton('Clear');
    btnClear.position(380, 15);
    btnClear.mousePressed(limpa);

    fill(100);
    for(let i=0; i<width/grid; i++){ // create grid array
        my_draw.push([]);
        for(let j=0; j<(height - header)/grid;j++){
            my_draw[i].push(color);
        }
    }
}

function draw() {
    background(0, 0, 0);
    const r = rSlider.value();
    const g = gSlider.value();
    const b = bSlider.value();
    color = [r,g,b];
    fill(0, 102, 153);
    noStroke();
    text('R', 5, 17);
    text('G', 5, 42);
    text('B', 5, 67);
    text(r, 190, 17);
    text(g, 190, 42);
    text(b, 190, 67);
    stroke(150);
    fill(color)
    rect(225,10, 55,55)

    if (mouseIsPressed) {
        if(mouseY > header){
            let hor = Math.floor(width/grid);
            let ver = Math.floor(height/grid);
            let x = Math.floor(map(mouseX,0,width,0,hor));
            let y = Math.floor(map(mouseY ,0,height,0,ver));
        if(mouseButton === LEFT){
                my_draw[x][y - Math.floor(header/grid)] = color;        
            }
            if(mouseButton === CENTER){
                rSlider.elt.value = my_draw[x][y - Math.floor(header/grid)][0];
                gSlider.elt.value = my_draw[x][y - Math.floor(header/grid)][1];
                bSlider.elt.value = my_draw[x][y - Math.floor(header/grid)][2];
            }
        }
      }

    draw_grid();
    
}

function draw_grid(){
    for(let i=0; i<width/grid; i++){
        for(let j=0; j<(height - header)/grid;j++){
            fill(my_draw[i][j]);
            rect(i * grid,j * grid + header, grid, grid);
        }
    }
}

function limpa(){
    if (confirm('Deseja apagar todo o desenho?')) {
        for(let i=0; i<width/grid; i++){
            for(let j=0; j<(height - header)/grid;j++){
                my_draw[i][j] = [0,0,0];
            }
        }    
    }
}

function keyPressed() {
  keyIndex = key.charCodeAt(0);

  if(keyIndex == 32 || keyCode === UP_ARROW){ // SPACE OR UP => TURN THE PIECE

  }else if(keyCode === LEFT_ARROW){    

  }else if(keyCode === RIGHT_ARROW){

  }else if(keyCode === DOWN_ARROW){
 
  }
}

