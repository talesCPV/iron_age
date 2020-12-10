// IRON AGE 2020
let screen = [800,600];
let sprites;
let back_sprites;
let pixel = 3; // tamanho do pixel
let fps = [0,45]; // 1- contador | 2- qtd de frames
let score = 0;
let player_speed = 3;
let sprite_name = "main"
let shooting = [];
let bombing = [];
let scene = [];



let player = {
    x :  screen[0] / 2,
    y : screen[1] /2
}


let p1 = player;
let enemy = [];

function preload() {
    sprites = loadJSON('assets/ironage.json');
    back_sprites = loadJSON('assets/background.json');
}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);
    scene.push(new Background("top","cavern","teste2",48));
    scene.push(new Background("down","cavern","ceiling_01",48));

}

function draw() {
    background(0, 0, 0);
    fill(255,0,0);
    text("SCORE: "+score, 10, 10, 150, 150);

    fps[0] += 1;
    if(fps[0] >= fps[1]){
        fps[0] = 0;


    }

    for(let i=0;i<shooting.length;i++){
        shooting[i].draw();
    }


    draw_background();

    joystick();
    draw_sprite(p1.x,p1.y,"player",sprite_name);

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

    if(dir == "top"){
        draw_pixel(x,y,dots);
        draw_pixel(x,y,lines);
    }else{
        push();
        scale(1,-1)
        draw_pixel(x,y,dots);
        draw_pixel(x,y,lines);
        pop();

    }



    scene[i].move();


  }

}


function Shoting(x,y){
    this.x = x + 25 * pixel;
    this.y = y - 5 * pixel;
}

Shoting.prototype.draw = function(){
    this.x += 6;
    draw_sprite(this.x,this.y,"weapons","main")

    if(this.x > width + 10){
        shooting.splice(0,1);
    }
}

function Bombing(x,y){
    this.x = x + 5 * pixel;
    this.y = y + pixel;
    this.start = [x + 5* pixel,y];
}

Bombing.prototype.draw = function(){
    let SPT;
    if(this.x < this.start[0] + 8 * pixel){
        this.x += 1;
        SPT = "bomb";
    }else{
        this.x += 1;
        this.y += 3;
        SPT = "falling_bomb";
    }
    draw_sprite(this.x,this.y,"weapons",SPT)

    if(this.y > height + 10){
        shooting.splice(0,1);
    }

}

function Background(dir,kind,name,width){
  this.dir = dir;
  this.name = name;
  this.kind = kind;
  this.width = width;
  this.count = 0;
  this.x =  screen[0]+100 ;
  if(dir == "top"){
    this.y = 70;
  }else{
    this.y = -height + 40;
  }
}

Background.prototype.move = function(){
  this.x --;
  this.count ++;

  if(this.count == (this.width * pixel) - 3 * pixel ) {
    scene.push(new Background(this.dir, this.kind,this.name, this.width));
  }
  if(this.x <= -50*pixel){
    scene.splice(0,1);
  }

}

function joystick(){
    if(keyIsDown(LEFT_ARROW) && p1.x > 20) {
        p1.x -= player_speed;
    }else if(keyIsDown(RIGHT_ARROW) && p1.x < width - 100) {
        p1.x += player_speed;
    }

    if(keyIsDown(UP_ARROW) && p1.y > 50) {
        p1.y -= player_speed;
        sprite_name = "up";
    }else if(keyIsDown(DOWN_ARROW) && p1.y < height - 40) {
        p1.y += player_speed;
        sprite_name = "down";
    }else{
        sprite_name = "main";
    }
}



function keyPressed() {
    keyIndex = key.charCodeAt(0);

//    alert(keyIndex)

    if(keyIndex == 32 || keyIndex == 122 ){ // SPACE OR UP => TURN THE PIECE
        shooting.push(new Shoting(player.x,player.y));
    }
    if( keyIndex == 120 ){ // SPACE OR UP => TURN THE PIECE
        shooting.push(new Bombing(player.x,player.y));
    }
}
