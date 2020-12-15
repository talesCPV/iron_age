


function shot(N){
  if(N == 0){
    shooting.push(new Shot(player.x,player.y));
  }else if(N == 10){
    shooting.push(new Torp(player.x,player.y));
  }

}

class Fire{
  constructor(x,y){
    this.x = x  ;
    this.y = y +8 ;
    this.power = 1;
    this.speed = 6;
    this.name = "main";
  }
}


class Shot extends Fire{
  constructor(x,y){
    super(x,y);
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
    this.name = "bomb";
    this.start_fall = x + 9 * pixel;
    this.speed = 1;
    this.fall = 0;
  }
}

Torp.prototype.move = function(N){
  this.x += this.speed;
  this.y += this.fall;

  if(this.x > this.start_fall){
      this.name = "falling_bomb";
      this.fall = 3;
  }
  draw_sprite(this.x,this.y,pl_sprites.weapons[this.name]);
  
  if(this.y > height + 10){
      shooting.splice(N,1);
  }

}


class Background{
  constructor(pos,kind,name){
    this.pos = pos;
    this.name = name;
    this.kind = kind;
    this.width = bk_sprites[kind][name].x;
    this.height = bk_sprites[kind][name].y;
    this.count = 0;
    this.x =  screen[0]+100 ;
  
    if(pos == "up"){
      this.y = -50;
      this.flip = -1;
    }else{
      this.y = height - 20;
      this.flip = 1;
    }  
  }
}


Background.prototype.move = function(N){

  push();
  scale(1,this.flip);
  draw_sprite(this.x,this.y,bk_sprites[this.kind][this.name]);
  pop();

  this.x -= scene_speed;
  this.count ++;

  if(this.count ==  Math.floor(this.width / scene_speed * pixel)  ) {
    scene.push(new Background(this.pos, this.kind,this.name));
  }
  if(this.x <= -50*pixel){
    scene.splice(N,1);
  }

}