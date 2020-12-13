

function Shoting(x,y){
    this.x = x + 25 * pixel;
    this.y = y - 5 * pixel;
}

Shoting.prototype.draw = function(){
    this.x += 6;
    draw_sprite(this.x,this.y,"weapons",player_weapon)

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

function Background(dir,kind,name){
  this.dir = dir;
  this.name = name;
  this.kind = kind;
  this.width = back_sprites[kind][name].x;
  this.count = 0;
  this.x =  screen[0]+100 ;
  if(dir == "top"){
    this.y = -50;
  }else{
    this.y = height - 20;
  }
}

Background.prototype.move = function(){
  this.x -= scene_speed;
  this.count ++;

  if(this.count ==  Math.floor(this.width / scene_speed * pixel)  ) {
    scene.push(new Background(this.dir, this.kind,this.name));
  }
  if(this.x <= -50*pixel){
    scene.splice(0,1);
  }

}