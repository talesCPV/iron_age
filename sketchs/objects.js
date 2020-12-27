
class Player{
  constructor(){
    this.x = screen[0] / 2;
    this.y = screen[1] / 2;
    this.power = 5;
    this.speed = 3;
    this.weapon = 0;
    this.max_shot = 3;
    this.max_special = 1;
    this.shield = 100;
    this.name = "main";
    this.hitbox = [0, 0];
    this.pivot = [1,1];
    this.delay = 0;
    this.life = 3;
    this.tank = 0;
  }
}

Player.prototype.move = function (x,y) {

  if(!pause){
    this.x += x * this.speed;

    if(this.x < 20){ // borda esquerda
      this.x = 20;
    }

    if(this.x > width - 50){ // borda direita
      this.x = width - 50;
    }

    this.y += y * this.speed;  

    if(this.y < 50){ // borda superior
      this.y = 50;
    }
    if(this.y > height - 100){ // borda inferior
      this.y = height - 100;
    }

  }

}

Player.prototype.draw = function(){
  if(this.delay > 0){
    this.delay--;
  }

  if(ready > 0){
    text("READY", width/2, height/2, width, height);
    ready --;
  }

  if(this.delay == 0 || (this.delay % 5 == 0 && this.shield > 0)){ // show player or blink it

      draw_sprite(this.x,this.y,pl_sprites.player[this.name]);    



    if(this.shield <= 0){ // energy is over
      this.life --;

      if(this.life == 0){ // game over
        stage = 3; 
      }else{
        start_stage(stage);
      }
    }
  }
}

Player.prototype.shot = function(N){

  if(N == 1){
    m_buster();    
  }else if(this.weapon == 1 && N == 2 && energy_wep[this.weapon] > 0){
    fireball();
  }else if(this.weapon == 2 && N == 2 && energy_wep[this.weapon] > 0){
    iceball();
  }else if(this.weapon == 3 && N == 2 && energy_wep[this.weapon] > 0){
    laser();
  }else if(this.weapon == 4 && N == 2 && energy_wep[this.weapon] > 0){
    ripple();
  }else if(this.weapon == 5 && N == 2 && energy_wep[this.weapon] > 0){
    spread();
  }else if(this.weapon == 6 && N == 2 && energy_wep[this.weapon] > 0){
    force_field();
  }else if(this.weapon == 7 && N == 2 && energy_wep[this.weapon] > 0){
    atomic();
  }else if(this.weapon == 8 && N == 2 && energy_wep[this.weapon] > 0 ){
    torp();
  }

  if(energy_wep[this.weapon] < 0){
    energy_wep[this.weapon] = 0;
  }

}

Player.prototype.hit = function(N){
  if(this.delay == 0){
    this.shield -= N;
    this.delay = 30
  }

}

// WEAPONS FUNCTIONS
function m_buster(){
  if(shooting.length < player.max_shot){
      shooting.push(new Shot(player.x,player.y));
      sound_efects[1].play();
  }  
}

function laser(){
  if(special.length < player.max_special){
    special.push(new Laser(player.x,player.y));
    energy_wep[player.weapon] -= 3;
    sound_efects[6].play();  
  }
}

function ripple(){
  if(special.length < player.max_special){
      special.push(new Ripple(player.x,player.y,3));      
      energy_wep[player.weapon] -= 3;
      sound_efects[6].play();
  }  
}

function fireball(){
  if(special.length < player.max_special){
    special.push(new Laser(player.x,player.y));
    special[special.length-1].name = "fireball";
    special[special.length-1].power = 25;
    special[special.length-1].speed = 12;
    energy_wep[player.weapon] -= 7;
    sound_efects[1].play();  
  }
}

function iceball(){
  if(special.length < player.max_special){
    special.push(new Laser(player.x,player.y));
    special[special.length-1].name = "iceball";
    special[special.length-1].power = 10;
    special[special.length-1].speed = 12;
    energy_wep[player.weapon] -= 3;
    sound_efects[1].play();  
  }
}

function spread(){
    if(special.length < player.max_special){
      for(let i=-3; i<4; i++){
        special.push(new Spread(player.x,player.y,i));
        sound_efects[1].play();  
      }
        energy_wep[player.weapon] -= 1;
    }
}

function atomic(){
    if(special.length < player.max_special){
      special.push(new Atomic(player.x,player.y));
      energy_wep[player.weapon] -= 50;
    }  
}

function torp(){
    if(special.length < player.max_special){
      special.push(new Torp(player.x,player.y));
      energy_wep[player.weapon] -= 5;
    }  
}

function force_field(){
    if(special.length == 0){
      special.push(new Shield());
    }else{
      special = [];
    }
}

//WEAPONS CLASS

class Fire{
  constructor(x,y){
    this.x = x  ;
    this.y = y +8 ;
    this.power = 1;
    this.speed = 6;
    this.name = "m_buster";
    this.hitbox = [pixel,pixel];
    this.pivot = [1,1];
  }
}

class Shot extends Fire{
  constructor(x,y){
    super(x,y);
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

class Laser extends Fire{
  constructor(x,y){
    super(x,y);
    this.x += 10;
    this.name = "laser";
    this.power = 5;
    this.speed = 8;
  }
}

Laser.prototype.move = function(N){
  this.x += this.speed;
  draw_sprite(this.x,this.y,pl_sprites.weapons[this.name]);
  if(this.x > width + 10){
      special.splice(N,1);
  }
}

class Spread extends Fire{
  constructor(x,y,d){
    super(x,y);
    this.name = "spread";
    this.direction = d;
    this.speed = 12;
  }
}

Spread.prototype.move = function(N){

  this.x += this.speed;
  if(this.direction != 0){
    this.y += this.speed  *  this.direction * 0.2;
  }
  draw_sprite(this.x,this.y,pl_sprites.weapons[this.name]);

  if(this.x > width + 10 || this.y > height + 10 || this.y < -10){
      special.splice(N,1);
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
      special.splice(N,1);
  }

}

class Atomic extends Fire{
  constructor(x,y){
    super(x,y);
    this.name = "atomic";
    this.power = 50;
    this.count = 0;
    this.fall = 0;
    this.scale = [1,1];
    this.speed = 2;
    this.hitbox = [0,0];
  }
}

Atomic.prototype.move = function(N){

  this.count++;

  if(this.count == 20){
    this.fall = this.speed
  } else if(this.count >= 80){
    this.speed = 0;
    this.fall = 0;
    this.scale[0] += 0.2;
    this.scale[1] += 0.2;
    this.hitbox[0] += 2.5;
    this.hitbox[1] += 2.5;
  }
  if(this.count >= 180){
    special.splice(N,1);
  }

  this.x += this.speed;
  this.y += this.fall;

  push();
  translate(this.x,this.y);
  scale(this.scale);
  draw_sprite(0,0,pl_sprites.weapons[this.name]);
  pop();

}

class Ripple extends Fire{
  constructor(x,y,n){
    super(x,y);
    this.name = ["ripple_01","ripple_02","ripple_03"];
    this.power = 3;
    this.start = x;
    this.count = 0;
    this.i = 0;
    this.repeat = n-1;
  }
}

Ripple.prototype.move = function(N){
  this.x += this.speed;
  this.count++;

  if(this.count == 8){
    this.i = 1;
    if(this.repeat > 0){
      special.push(new Ripple(player.x,player.y,this.repeat));
    }
  }else if( this.count == 16){
    this.i = 2;

  }

  draw_sprite(this.x,this.y,pl_sprites.weapons[this.name[this.i]]);

  if(this.x > width + 10){
      special.splice(N,1);
  }

}

class Shield {
  constructor(){
    this.x = player.x;
    this.y = player.y;
    this.sprite = pl_sprites.weapons.shield;
    this.angle = 0;
    this.power = 2;
    this.pivot = [1,1];
    this.hitbox = [this.sprite.x,this.sprite.y];
  }
}

Shield.prototype.move = function(N){
  this.angle += 0.1;
  this.x = player.x;
  this.y = player.y;
  energy_wep[player.weapon] -= 0.1;
  player.delay = 26;

  if(energy_wep[player.weapon] <= 0){
    special.splice(N,1);
  }

  push();
  translate(this.x, this.y);
  rotate(this.angle);
  draw_sprite(0,0,this.sprite);
  pop();

}


// ITENS

function new_item(x,y,N){
    itens.push(new Itens(x,y,N));
}

class Itens{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.name = "";
    this.hitbox = [0,0];
    this.pivot = [1,1];
    this.value = 0;
    this.type = 0;
  }
}

Itens.prototype.hit = function(N){
  if(this.type == 1 && energy_wep[player.weapon] < 100){ // + energy weapon

      sound_efects[5].playMode('restart');
      sound_efects[5].play();
      energy_wep[player.weapon] += this.value;

  }else if(this.type == 2 && player.shield < 100){ // + energy player

      sound_efects[5].playMode('restart');
      sound_efects[5].play();
      player.shield += this.value;

  }else if(this.type == 3 && player.max_shot < 13){ // + max shots
      player.max_shot += 1;
  }else if(this.type == 4 && player.max_special < 6){ // + max bombs
      player.max_special += 1;
  }else if(this.type == 5 && player.speed < 10){ // + player speed
      player.speed += 1;
  }else if(this.type == 6 && player.speed > 3){ // - player speed
      player.speed -= 1;
  }else if(this.type == 10 && player.life < 9){ // + player life
      player.life += 1;         
  }

  itens.splice(N,1); // kill item

}

class Energy_Weapon extends Itens{
  constructor(x,y){
    super(x,y);
    this.name = ["energy_weapon_01","energy_weapon_02"];
    this.index = 0;
    this.count = 0;
    this.hitbox = [pl_sprites.itens.energy_weapon_01.x,pl_sprites.itens.energy_weapon_01.y];
    this.value = 25;
    this.type = 1;
  }
}

Energy_Weapon.prototype.move = function(N){
  this.x -= scene_speed + this.speed;
  this.count++;
  if(this.count == 10){
    this.index = 1;
  }else if(this.count == 20){
    this.count = 0
    this.index = 0;
  }

  draw_sprite(this.x,this.y,pl_sprites.itens[this.name[this.index]]);

  if(this.x < -10){
      itens.splice(N,1);
  }

}

class Small_Energy_Weapon extends Energy_Weapon{
  constructor(x,y){
    super(x,y);
    this.name = ["small_w_ball_01","small_w_ball_02"];
    this.value = 5;
    this.hitbox = [pl_sprites.itens.small_w_ball_01.x,pl_sprites.itens.small_w_ball_01.y];    
  }
}

class Energy_Ball extends Energy_Weapon{
  constructor(x,y){
    super(x,y);
    this.name = ["energy_ball_01","energy_ball_02"];
    this.type = 2;
    this.hitbox = [pl_sprites.itens.energy_ball_01.x,pl_sprites.itens.energy_ball_01.y];
  }
}

class Small_Energy_Ball extends Energy_Ball{
  constructor(x,y){
    super(x,y);
    this.name = ["small_e_ball_01","small_e_ball_02"];
    this.value = 5;
    this.hitbox = [pl_sprites.itens.small_e_ball_01.x,pl_sprites.itens.small_e_ball_01.y];
  }
}

class Plus_shot extends Energy_Weapon{
  constructor(x,y){
    super(x,y);
    this.name = ["plus_shot","blank"];
    this.type = 3;
    this.hitbox = [pl_sprites.itens.blank.x,pl_sprites.itens.blank.y];  
  }
}

class Plus_special extends Energy_Weapon{
  constructor(x,y){
    super(x,y);
    this.name = ["plus_bomb","blank"];
    this.type = 4;
    this.hitbox = [pl_sprites.itens.blank.x,pl_sprites.itens.blank.y];  
  }
}

class Speed_up extends Energy_Weapon{
  constructor(x,y){
    super(x,y);
    this.name = ["plus_speed","blank"];
    this.type = 5;
    this.hitbox = [pl_sprites.itens.blank.x,pl_sprites.itens.blank.y];  
  }
}

class Speed_down extends Energy_Weapon{
  constructor(x,y){
    super(x,y);
    this.name = ["less_speed","blank"];
    this.type = 6;
    this.hitbox = [pl_sprites.itens.blank.x,pl_sprites.itens.blank.y];  
  }
}

class Life extends Energy_Weapon{
  constructor(x,y){
    super(x,y);
    this.name = ["life","blank"];
    this.type = 10;
    this.hitbox = [pl_sprites.itens.blank.x,pl_sprites.itens.blank.y];  
  }
}

// BACKGROUNDS

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

class Second_plan{
  constructor(x){
    this.x = x;
    this.spaw = x;
    this.index = 0;
    this.name = ["degrade_01","degrade_02","degrade_03","degrade_04"];
    this.pivot = [bk_sprites.fundos[this.name[this.index]].pivot_x,bk_sprites.fundos[this.name[this.index]].pivot_y];
    this.width = bk_sprites.fundos[this.name[this.index]].x * pixel;
    this.height = bk_sprites.fundos[this.name[this.index]].y * pixel;
    this.bk_color = bk_sprites.fundos[this.name[this.index]].dots[0].color;
    this.speed = scene_speed / 2;
    this.count = 0;
  }
}

Second_plan.prototype.move = function(N){
  this.x -= this.speed;
  this.count ++;
  let y = 0 + (this.height/2);

  for(let i=0; i<this.name.length; i++){
    draw_sprite(this.x,y,bk_sprites.fundos[this.name[i]]);
    y += bk_sprites.fundos[this.name[i]].y * pixel;
  }

  if(y < height){
    fill(this.bk_color)
    rect(this.x,y,this.width,height)
  }

  if(this.count ==  Math.floor(this.width / this.speed) ) {
    scene_bk.push(new Second_plan(this.spaw));
  }
  if(this.x <= -this.width * 1.5){
    scene_bk.splice(N,1);
  }

}

function fill_second_plan(){

  let w = bk_sprites.fundos.degrade_01.x * pixel;
  let i;
  scene_bk = [];

  for(i=0; i<width+w; i+= w-1 ){      
    scene_bk.push(new Second_plan(i));
    if( i < width ){
      scene_bk[scene_bk.length-1].count = 10000;
    }
  }

  
    

}