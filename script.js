let start_time=0;
let elapsed_time=0;
let timer_interval;
let is_Running=false;
let lapcount=0;

const display=document.getElementById("display");
const start_stop=document.getElementById("start-stop");
const reset=document.getElementById("reset");
const lap_button=document.getElementById("lap");
const lap_list=document.getElementById("laps");

//converting hours to seconds

function format_time(ms){
    const milliseconds=ms%1000;
    const seconds=Math.floor((ms/1000)%60);
    const minutes=Math.floor((ms/(1000*60))%60);
    const hours=Math.floor(ms/(1000*60*60));

     return (
        String(hours).padStart(2,'0')+ ':' +
        String(minutes).padStart(2,'0')+ ':'+
        String(seconds).padStart(2,'0')+ ':' +
        String(milliseconds).padStart(3,'0')

        );
    }

function update_display(){
    display.textContent=format_time(elapsed_time);

}

function start_timer(){
    start_time=Date.now()-elapsed_time;
    timer_interval=setInterval(()=>{
        elapsed_time=Date.now()-start_time;
        update_display();

    },10);
    is_Running=true;
    start_stop.textContent="Stop";

}

function stop_timer(){
    clearInterval(timer_interval);
    is_Running=false;
    start_stop.textContent='start';

}

//start/stop toggle
start_stop.addEventListener('click',()=>{
    is_Running? stop_timer(): start_timer();

});

reset.addEventListener('click',()=>{
    stop_timer();
    elapsed_time=0;
    update_display();
    lap_list.innerHTML=''
    lapcount=0;

});



lap_button.addEventListener('click',()=>{
    if(!is_Running) return ;
    lapcount++;
    const li= document.createElement('li');
    li.textContent = `Lap ${lapcount}: ${format_time(elapsed_time)}`;
    lap_list.appendChild(li);

});
