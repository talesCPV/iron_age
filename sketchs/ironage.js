// SPACE INVADERS
let screen = [800,600];
let sprites;
let pixel = 3; // tamanho do pixel
let fps = [0,45]; // 1- contador | 2- qtd de frames
let score = 0;
let player_speed = 3;
let sprite_name = "main"
let shooting = [];
let bombing = [];



let player = {
    x :  screen[0] / 2,
    y : screen[1] /2
}


let p1 = player;
let enemy = [];

function preload() {

    sprites = loadJSON('assets/ironage.json');

}

function setup() {
    createCanvas(screen[0], screen[1]);
    textSize(20);
    textAlign(10, 10);

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



    joystick();
    draw_sprite(p1.x,p1.y,"player");  
    
}



function draw_sprite(x,y,EN){
    dots = sprites[EN][sprite_name].dots
    for(let i=0;i<dots.length;i++){ 
        let color = dots[i].color;
        fill(color);
        for(let j=0; j<dots[i].data.length; j++){
            let x1 = x + dots[i].data[j][0]*pixel;
            let y1 = y - dots[i].data[j][1]*pixel;
            rect(x1,y1, pixel, pixel);
        }
    }
    lines = sprites[EN][sprite_name].lines
    for(let i=0;i<lines.length;i++){ 
        let color = lines[i].color;
        fill(color);
        for(let j=0; j<lines[i].data.length; j++){
            let x1 = x + lines[i].data[j][0]*pixel;
            let y1 = y - lines[i].data[j][1]*pixel;
            let x2 =  lines[i].data[j][2]*pixel;
            let y2 =  lines[i].data[j][3]*pixel;
            rect(x1,y1, x2, y2);
        }
    }    
}


function Shoting(x,y){
    this.x = x + 25 * pixel;
    this.y = y - 5 * pixel;
}

Shoting.prototype.draw = function(){
    this.x += 6;
    sprite_name = "main";
    draw_sprite(this.x,this.y,"weapons")

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
    if(this.x < this.start[0] + 8 * pixel){
        this.x += 1;
        sprite_name = "bomb";
    }else{
        this.x += 1;
        this.y += 3;
        sprite_name = "falling_bomb";
    }
    draw_sprite(this.x,this.y,"weapons")

    if(this.y > height + 10){
        shooting.splice(0,1);
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

