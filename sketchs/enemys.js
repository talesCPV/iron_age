class Enemy{
    constructor(x,y){
        this.x = width + x ;
        this.y = y;
        this.value = 100;
        this.hitbox = [0,0];
        this.power = 1;
        this.energy = 1;
    }
}

function new_enemy_balls(N){
    for(let i=0; i<N;i++){
        enemy.push(new Enemy_ball(200 + pixel*i*20));
    }
}

class Enemy_ball extends Enemy{
    constructor(x){
        let y = Math.floor(2,4) * 100;
        super(x,y);
        this.speed = 3;
        this.name = "enemy_ball";
        this.angle = 0;
        this.fall = false;
        this.side = random(0,2);
        this.hitbox = [en_sprites.enemys[this.name].x * pixel, en_sprites.enemys[this.name].y * pixel];
    }
}

Enemy_ball.prototype.move = function(N){
    this.x -= this.speed;
    if(this.fall){
        if(this.side > 1){
            this.y -= this.speed;
        }else{
            this.y += this.speed;
        }
    }

    if(!this.fall && this.x < width/2){
        this.fall = true;
    }

    this.angle += 0.2;

    if(this.angle > 360){
        this.angle = 0;
    }

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    draw_sprite(0,0,en_sprites.enemys[this.name]);
    pop();

    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
        }
        enemy.splice(N,1);
    }
}

function new_moais(N){
    enemy.push(new Moais(N));
}

class Moais extends Enemy{    
    constructor(side){
        let y = height - 110 ;
        if(side == "top"){
            y = 140;
        }
        super(200,y);
        this.speed = 3;
        this.name =  "moais_close";
        this.energy = 10;
        this.open = false;
        this.count = 0;
        this.side = side
        this.value = 800;
        this.hitbox = [en_sprites.enemys[this.name].x * pixel, en_sprites.enemys[this.name].y * pixel];               
    }
}

Moais.prototype.move = function(N){
    this.x -= scene_speed;
    this.count ++;
    if(this.count >= 200){
        this.name = "moais_open";
        if(this.count % 10 == 0){
            if(this.side == "top"){
                enemy.push(new Enemy_ring(this.x - width - 50,this.y - 20));
            }else{
                enemy.push(new Enemy_ring(this.x - width - 50,this.y + 20));                
            }
        }

    } if(this.count > 300){
        this.count = 0;
        this.name = "moais_close";
    }

    push();
    translate(this.x,this.y);
    if(this.side == "top"){
        scale(1,-1);
    }
    draw_sprite(0,0,en_sprites.enemys[this.name]);
    pop();

    if(this.x < -100){
        enemy.splice(N,1);
    }else if(this.energy <= 0){   
        if(this.name != "moais_broken"){
        score += this.value;            
        }
        this.name = "moais_broken";
        this.count = -1000;
        this.hitbox = [0,0];
    }
}

class Enemy_ring extends Enemy{
    constructor(x,y){
        super(x,y);
        this.speed = 3;
        this.name = "ring";
        this.fall = false;
        this.value = 50;
        this.hitbox = [en_sprites.shoot[this.name].x * pixel, en_sprites.shoot[this.name].y * pixel];
    }
}

Enemy_ring.prototype.move =  function(N){
    this.x -= this.speed;
    if(this.fall){    
        this.y -= this.speed;
    }else{
        this.y += this.speed;
    }

    if(this.y < 60){
        this.fall = false;
    }else if(this.y > height - 90){
        this.fall = true;
    }

    draw_sprite(this.x,this.y,en_sprites.shoot[this.name]);

    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
        }
        enemy.splice(N,1);
    }    

}

function new_viper(N){
    for(let i=0; i<N;i++){
        enemy.push(new Viper(200 + pixel*i*50));
    }
}

class Viper extends Enemy{
    constructor(x){
        let y = Math.floor(2,4) * 300;
        super(x,y);
        this.speed = 3;
        this.name = "viper";
        this.energy = 3;
        this.angle = 0;
        this.fall = false;
        this.count = 0;
        this.hitbox = [en_sprites.enemys[this.name].x * pixel, en_sprites.enemys[this.name].y * pixel];
    }
}

Viper.prototype.move = function(N){
    this.count ++;

    if(this.count % 50 == 0){
        enemy.push(new Viper_shot(this.x,this.y));
    }

    if(this.x < player.x){
        this.x += this.speed/2;        
    }else{
        this.x -= this.speed/2;        
    }

    if(this.y < player.y){
        this.y += this.speed/2;        
    }else{
        this.y -= this.speed/2;        
    }    

    this.angle = Math.atan2(  Math.floor(this.y - player.y) * pixel , (this.x - player.x) * pixel );

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    draw_sprite(0,0,en_sprites.enemys[this.name]);
    pop();

    if(this.x < -100 || this.energy <= 0){
        if(this.energy <= 0){
            score += this.value;
        }
        enemy.splice(N,1);
    }
}

class Viper_shot extends Enemy{
    constructor(x,y){
        super(x - width,y);
        this.speed = 3;
//        this.name = "ring";
        this.name = "viper_shoot";
        this.power = 1;
        this.energy = 1;

        this.offset_x = (x - player.x)/100;
        this.offset_y = (y - player.y)/100;
        this.hitbox = [pixel,pixel];

    }
}

Viper_shot.prototype.move =  function(N){
    
//    this.x -=  this.offset_x;
    this.y -=  this.offset_y;
    this.x -= 2;

//    alert([this.x,this.y])


    draw_sprite(this.x,this.y,en_sprites.shoot[this.name]);

    if(this.x < -100 || this.x > 1000 || this.energy <= 0){
        enemy.splice(N,1);
    }    

}