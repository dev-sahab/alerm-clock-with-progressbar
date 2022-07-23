// get elements
const timer_form = document.querySelector('.timer-form');
const timer = document.querySelector('.timer');
const timerSound = document.querySelector('.timer-sound');
const alerm = document.querySelector('.alerm');
const clickSound = document.querySelector('.click-sound');
const start = document.getElementById('submit');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const progressbar = document.querySelector('.progressbar');
const per = document.querySelector('.per');


const deg = 6;
const hr = document.querySelector("#hr");
const mn = document.querySelector("#mn");
const sc = document.querySelector("#sc");



setInterval(() => {

    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

    hr.style.transform = `rotateZ(${hh+(mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;

    
    
    timerSound.play();

}, 1000);

timerSound.volume = 0.3;


let count;

// timer form
timer_form.onsubmit = (e) =>{

    e.preventDefault();

    clearInterval(count);

    
    clickSound.play();

    // get form value
    const form_data = new FormData(e.target);
    const {date, time} = Object.fromEntries(form_data.entries());

    //get timestamp
    let start_time = Date.now();
    let end_time = new Date(date + ' ' + time);

    timer.innerHTML = `<h2>99 D : 99 H : 99 M : 99 S</h2>`;


    if (!date || !time){
        timer.innerHTML = msgAlert('All feilds are required');
    }
    else{

        count = setInterval(() => {
            
            countDown(date, time, timer, count);
            
            let countPer = counterPer(start_time, end_time);

            countPer && (progressbar.style.display = 'block')

            progress.style.width = countPer + '%';
            per.innerHTML = countPer + '%';

            if (countPer >= 80) {
                progress.style.background = 'green';
            }
            
            if( countPer < 80 ){
                progress.style.background = 'blue';
            }
            
            if( countPer < 50 ){
                progress.style.background = 'yellow';
            }
            
            if( countPer < 20 ){
                progress.style.background = 'red';
            }

            if(countPer <= 2){
                per.style.left = '0';
                per.style.right = 'inherit';
            }
            if(countPer <= 0){
                progress.style.width = '0';

                per.innerHTML = '0%';
            }


        }, 1000);

    }


}

// stop alerm
stop.onclick = (e) => {

    // reset default
    e.preventDefault();
    clearInterval(count);
    
    // form reset
    timer_form.reset();

    clickSound.play();

    // alerm stop
    alerm.pause();
    alerm.currentTime = 0;

    // text hide
    timer.innerHTML = '';


    // start/stop button show/hide
    stop.classList.add('hide');
    stop.classList.remove('show');
    start.classList.add('show');
    start.classList.remove('hide');

    
    // progressbar 
    progressbar.style.display = 'none';

}

