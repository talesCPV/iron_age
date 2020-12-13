
let button_press = false;


function draw_screen(sel_stage){



    if(sel_stage == 0){

        draw_sprite(width/2 - 85 * pixel / 2,250,"splash","logo");
        fill(255);

        text("PUSH ENTER TO START ", 210, 400, width, 150);
        text("2020 - by Tales & Cabelo ", 160, 550, width, 150);

        if(button_press){
            if(!sound_efects[0].isPlaying()){
                sound_efects[0].play();
            }  

            if( Math.floor(sound_efects[0].duration()) <  Math.ceil(sound_efects[0].currentTime()) ){
                song.playMode('restart');
                song.play();
                //            stage_length = Math.floor(song.duration());
                stage = 1;
                button_press = false;
            }


        }

        if(keyIsDown(ENTER) ) {
            button_press = true;
        }
        
    }else if(sel_stage == 1){

        text("SCORE: "+score, 10, 25, width, 150);
//        stage_percent = Math.floor(song.currentTime()/stage_length*100) ;
//        score = stage_percent;

        // show all shottings
        for(let i=0;i<shooting.length;i++){
            shooting[i].draw();
        }
    
        // show all enemys
        for(let i=0;i<enemy.length;i++){
            enemy[i].move(i);
        }
    
        draw_background();
    
        joystick();

        // draw player
        draw_sprite(p1.x,p1.y,"player",sprite_name);

    }

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


