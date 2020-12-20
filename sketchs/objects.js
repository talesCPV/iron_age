


class Player{
  constructor(){
    this.x = screen[0] / 2;
    this.y = screen[1] / 2;
    this.power = 5;
    this.speed = 3;
    this.weapon = 1;
    this.bomb = 0;
    this.max_shot = 3;
    this.max_bomb = 0;
    this.shield = 100;
    this.name = "main";
    this.hitbox = [0, 0];
    this.pivot = [1,1];
    this.delay = 0;
  }
}

Player.prototype.move = function (x,y) {
  this.x += x * this.speed;
  this.y += y * this.speed;  
}

Player.prototype.draw = function(){
  if(this.delay > 0){
    this.delay--;
  }

  if(this.delay == 0 || (this.delay % 5 == 0 && this.shield > 0)){ // show player or blink it
    draw_sprite(this.x,this.y,pl_sprites.player[this.name]);
    if(this.shield <= 0){
      stage = 3; // game over
    }
  }
  for(let i=0; i<this.shield; i+=5){
    draw_sprite(30,150-i,pl_sprites.player["energy_bar"]);
  }
}

Player.prototype.hit = function(N){
  if(this.delay == 0){
    this.shield -= N;
    this.delay = 30
  }
/*
  if(this.shield <= 0){
    this.delay = 50;
  }
*/

}


function new_item(x,y,N){
    itens.push(new Itens(x,y,N));
}

class Itens{
  constructor(x,y, N){
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.name = itens_name[N];
    this.item = N;
    this.hitbox = [15,15];
    this.pivot = [1,1];
  }
}

Itens.prototype.move = function(N){

  this.x -= scene_speed + this.speed;

  draw_sprite(this.x,this.y,pl_sprites.itens[this.name]);

  if(this.x < -10){
      itens.splice(N,1);
  }

}



function shot(N){
  if(N == 1){
    shooting.push(new Shot(player.x,player.y));
  }else if(N == 2){
    shooting.push(new Shot(player.x,player.y));
    shooting[shooting.length-1].name = "laser";
    shooting[shooting.length-1].power = 5;
    shooting[shooting.length-1].speed = 8;
  }else if(N == 4){
    bombing.push(new Torp(player.x,player.y));
  }

}

class Fire{
  constructor(x,y){
    this.x = x  ;
    this.y = y +8 ;
    this.power = 1;
    this.speed = 6;
    this.name = "main";
    this.hitbox = [pixel,pixel];
    this.pivot = [1,1];
  }
}


class Shot extends Fire{
  constructor(x,y){
    super(x,y);
    this.hitbox = [3*pixel,pixel];
    this.x += 10;
  }
}


Shot.prototype.move = function(N){
  this.x += this.speed;
  draw_sprite(this.x,this.y,pl_sprites.weapons[this.name]);
  if(this.x > width + 10){
      shooting.splice(N,1);
  }

}

class Torp extends Fire{
  constructor(x,y){
    super(x,y);
    this.name = "torp";
    this.power = 5;
    this.start_fall = x + 9 * pixel;
    this.speed = 1;
    this.fall = 0;
  }
}

Torp.prototype.move = function(N){
  this.x += this.speed;
  this.y += this.fall;

  if(this.x > this.start_fall){
      this.name = "falling_torp";
      this.fall = 3;
  }
  draw_sprite(this.x,this.y,pl_sprites.weapons[this.name]);
  
  if(this.y > height + 10){
      bombing.splice(N,1);
  }

}


class Ground{
  constructor(kind,name,flip = false ,rep = true){
    this.flip = flip;
    this.name = name;
    this.kind = kind;
    this.width = bk_sprites[kind][name].x;
    this.height = bk_sprites[kind][name].y;
    this.count = 0;
    this.x =  width+50 ;
    this.hitbox = [this.width,this.height];
    this.pivot = [bk_sprites[kind][name].pivot_x,bk_sprites[kind][name].pivot_y];
    this.repeat = rep ;
    this.hit =  true;
  
    if(flip){
      this.y = -50;
      this.vertical = -1;
    }else{
      this.y = height - 20;
      this.vertical = 1;
    }  
  }
}


Ground.prototype.move = function(N){

  push();
  scale(1,this.vertical);
  draw_sprite(this.x,this.y,bk_sprites[this.kind][this.name]);
  pop();

  this.x -= scene_speed;
  this.count ++;

  if(this.count ==  Math.floor(this.width / scene_speed * pixel) && this.repeat ) {
    scene.push(new Ground(this.kind,this.name,this.flip,true));
  }
  if(this.x <= -this.width*pixel){
    scene.splice(N,1);
  }

}

Ground.prototype.fill = function(){

  for(let i=8; i<width+50;i+=this.width*pixel){
      scene.push(new Ground(this.kind,this.name,this.flip,false));
      scene[scene.length-1].x = i;
  }

}

class Cloud extends Ground{

  constructor(y){
    super("sea","cloud",false,false);
    this.repeat = false;
    this.y = y;
    this.hit = false;
  }

}

Cloud.prototype.move = function(N){

  draw_sprite(this.x,this.y,bk_sprites[this.kind][this.name]);

  this.x -= scene_speed;
  this.count ++;




  if(this.count % 150 == 0  ) {
    enemy.push(new Thunder(this.x,this.y + this.height * pixel));

  }
  if(this.x <= -this.width*pixel){
    scene.splice(N,1);
  }

}