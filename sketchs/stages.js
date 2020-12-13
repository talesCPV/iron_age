

function draw_screen(sel_stage){

//    let  = stage;

    if(sel_stage == 0){

        draw_sprite(width/2 - 85 * pixel / 2,250,"splash","logo");
        fill(255);

        text("PUSH ENTER TO START ", 210, 400, width, 150);
        text("2020 - by Tales & Cabelo ", 160, 550, width, 150);

        if(keyIsDown(ENTER) ) {
            song.playMode('restart');
            song.play();
            stage = 1;
        }
        
    }else if(sel_stage == 1){

        text("SCORE: "+score, 10, 25, width, 150);


        // show all shottings
        for(let i=0;i<shooting.length;i++){
            shooting[i].draw();
        }
    
        // show all enemys
        for(let i=0;i<enemy.length;i++){
            enemy[i].move();
        }
    
        draw_background();
    
        joystick();

        // draw player
        draw_sprite(p1.x,p1.y,"player",sprite_name);

    }

}

