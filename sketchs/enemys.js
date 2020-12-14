class Enemy{
    constructor(x,y){
        this.x = width + x ;
        this.y = y;
        this.value = 100;
        this.hitbox = [50,50];
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
        this.energy = 1;
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

    if(this.x < -100 || this.energy == 0){
        enemy.splice(N,1);
        if(this.energy == 0){
            score += this.value;
        }
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
    }else if(this.energy == 0){    
        score += this.value;
        this.name = "moais_broken";
        this.count = -1000;
    }
}

class Enemy_ring extends Enemy{
    constructor(x,y){
        super(x,y);
        this.speed = 3;
        this.name = "ring";
        this.energy = 1;
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

    if(this.x < -100 || this.energy == 0){
        enemy.splice(N,1);
        if(this.energy == 0){
            score += this.value;
        }
    }    

}

