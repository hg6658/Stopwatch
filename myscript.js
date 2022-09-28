var flag =0;
var countInterval;
var pause = false;
var Lap =0;
function startCounter(){
    /*
    Start function that first fetches all the current and next classes elements in array then there are two set interval function one for
    seconds min and hour and one for millisec the one sec min hour triggers increase counter every second. 
     */

    pause=false;


    var currentNos = document.querySelectorAll(".bBlock .curr");
    var nextNos = document.querySelectorAll(".bBlock .next");
    var msec = document.querySelectorAll(".cBlock .curr");    
    msec[0].innerHTML=0;
    msecInter = setInterval(function(){

        if(pause){
            clearInterval(msecInter);
        }

        if(msec[0].innerHTML=='99'){
            msec[0].innerHTML =0;
        }else{
            msec[0].innerHTML = parseInt(msec[0].innerHTML)+1;
        }

    },10);

    countInterval = setInterval(function(){

        if(pause){
            clearInterval(countInterval);
            return;
        }
        increaseCounter(currentNos, nextNos,2);
    },1000);

}

function increaseCounter(currentNos,nextNos, index){


    /* fetches current and next element for hur min or sec based on index note it is recursive function that is when min or sec reaches 59
    control is passed to other index and if not there is set timeout function that adds or removes animator class every 0.5 sec */

    let current  = currentNos[index];
    let next = nextNos[index];

    if(current.innerText<59){
        next.innerText = parseInt(current.innerText)+1;
        next.classList.add('animator');
        setTimeout(function(){
            current.innerText = parseInt(next.innerText);
            next.classList.remove('animator');
        },500);

    }else{
        current.innerText =0;
        next.innerText =1;
        increaseCounter(currentNos, nextNos,index-1);

    }


}

function pauseCounter(){
    pause=true;
}

function resetCounter(){

    /* make carousel display to none reset all current to 1 and next 0;*/


    document.getElementById('Carousel').style.display='none';
    pause = true;
    var currentNos = document.querySelectorAll(".bBlock .curr");
    var nextNos = document.querySelectorAll(".bBlock .next");
    var msec = document.querySelectorAll(".cBlock .curr");    
    setTimeout(function(){
        msec[0].innerHTML=0;
        for(let i=0;i<3;i++){
            currentNos[i].innerHTML=0;
            nextNos[i].innerHTML=1;
        }

    },1000);

    Lap =0;

    var slides = document.querySelectorAll(".slides .slide");

    for(let i=0;i<slides.length;i++){
        slides[i].remove();
    }

}


function leftScroll(){

    var slides = document.getElementsByClassName('slides');
    
    if(slides[0].scrollLeft<120){
        slides[0].scrollLeft =0;
    }else{
        slides[0].scrollLeft -=120;
    }

}

function registerLap(){

    /* this function create child elements in slides div and then registers the lap */

    Lap++;

    document.getElementById('Carousel').style.display='flex';

    var slides = document.getElementsByClassName('slides');
    slides = slides[0];
    
    var slide = document.createElement('div');
    slide.classList.add('slide');

    var LapTitle = document.createElement('div');

    LapTitle.classList.add('LapTitle');

    var TimeBar = document.createElement('div');

    TimeBar.classList.add('TimeBar');
 

    LapTitle.innerHTML = "Lap #"+Lap;

    var currentNos = document.querySelectorAll(".bBlock .curr");
    
    TimeBar.innerHTML = currentNos[0].innerHTML+" : "+currentNos[1].innerHTML+" : "+currentNos[2].innerHTML;
    

    slide.appendChild(LapTitle);
    slide.appendChild(TimeBar);

    slides.appendChild(slide);

}


function rightScroll(){

    var slides = document.getElementsByClassName('slides');
    slides[0].scrollLeft +=120;

}
