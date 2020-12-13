class Enemy{
    constructor(x,y){
        this.x = width + x ;
        this.y = y;
        this.name = "moais_close";
        this.energy = 1;
        this.speed = 1;
    }
}
/*
Enemy.prototype.move = function(N){
    this.x -= this.speed;
    draw_sprite(this.x,this.y,"enemys",this.name);

    if(this.x < -100 || this.energy == 0){
        enemy.splice(N,1);
    }
}
*/

class Enemy_ball extends Enemy{
    constructor(x,y){
        super(x,y);
        this.speed = 3;
        this.name = "enemy_ball";
        this.energy = 1;
        this.angle = 0;
    }
}

Enemy_ball.prototype.move = function(N){
    this.x -= this.speed;

    this.angle += 0.1;

    if(this.angle > 360){
        this.angle = 0;
    }


    push();
    translate(this.x, this.y);
    rotate(this.angle);
    draw_sprite(0,0,"enemys",this.name);
    pop();



    if(this.x < -100 || this.energy == 0){
        enemy.splice(N,1);
    }
}