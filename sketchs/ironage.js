// IRON AGE 2020
let screen = [800,600];
let sprites;
let back_sprites;
let pixel = 3; // tamanho do pixel
let score = 0;
let player_speed = 3;
let sprite_name = "main"
let player_weapon = "laser";
let player_bomb = "bomb";
let enemys = [];
let shooting = [];
let bombing = [];
let scene = [];
let scene_speed = 1;
let stage = 0;
let song;

let player = {
    x :  screen[0] / 2,
    y : screen[1] /2
}

let p1 = player;
let enemy = [];

function preload() {
    sprites = loadJSON('assets/ironage.json');
    back_sprites = loadJSON('assets/background.json');
    font = loadFont('assets/press_start.ttf');
    song = loadSound('assets/Trooper.mp3');

}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);
    textFont(font);
    scene.push(new Background("top","cavern","montanhas"));
    scene.push(new Background("down","cavern","arvores"));
    enemy.push(new Enemy(1000,500,"moais_open",50));

}

function draw() {
    background(0, 0, 0);
    fill(255);

    draw_screen(stage);



}

function draw_pixel(x,y,N){
    let x2 = pixel;
    let y2 = pixel;

    for(let i=0;i<N.length;i++){
        let color = N[i].color;
        fill(color);
        for(let j=0; j<N[i].data.length; j++){
            let x1 = x + N[i].data[j][0]*pixel;
            let y1 = y - N[i].data[j][1]*pixel;
            if(N[i].data[j].length > 2){
              x2 =  N[i].data[j][2]*pixel;
              y2 =  N[i].data[j][3]*pixel;
            }
            rect(x1,y1, x2, y2);
        }
    }
}


function draw_sprite(x,y,EN,SN){
    let dots = sprites[EN][SN].dots
    draw_pixel(x,y,dots);

    let lines = sprites[EN][SN].lines
    draw_pixel(x,y,lines);
}

function draw_background(){

  for(let i=0;i<scene.length;i++){

    let x = scene[i].x;
    let y = scene[i].y;
    let kind = scene[i].kind;
    let name = scene[i].name;
    let dir = scene[i].dir;
    let dots = back_sprites[kind][name].dots;
    let lines = back_sprites[kind][name].lines;

    push();
    if(dir == "top"){
        scale(1,-1);
    }
    draw_pixel(x,y,dots);
    draw_pixel(x,y,lines);
    pop();
    scene[i].move();
  }

}




