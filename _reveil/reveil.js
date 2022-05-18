const display = document.getElementById('clock');

// set audio for alarm	
const audio = new Audio('<https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3>');	
audio.loop = true

let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  // Liste de toutes les alarmes 


// Quand l'alarme sonne 
function ringing(now){
    audio.play();
    alert(`Il est ${now} !`)
}


// Update le temps à chaque secondes
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    display.innerText=`${hour}:${minutes}:${seconds}`;
    
//     check if the alarmList includes the current time , "now"
//     if yes, ringing() is called
    if(alarmList.includes(now) ){
        ringing(now);
    } 
}


// Affiche le bon format de temps (rajoute un zéro quand il n'y qu'une seul chiffre)
function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


// Fonction pour supprimer une alarme
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      

// Supprimer l'alarme de la liste aussi
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// Supprime l'alarme de l'array 
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                 
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// Ajoute une nouvelle alarme dans une liste 
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Supprimer</button>       
    </li>`
    myList.innerHTML += html
};


// Ajouter une nouvelle alarme dès que le form est rempli
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    // const newAlarm = addAlarm.alarmTime.value;
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=formatTime(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=formatTime(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
    
    const newAlarm = `${new_h}:${new_m}:${new_s}`

//     Ajoute la nouvelle alarme dans la 
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`L'alarme ${newAlarm} à déjà été rentrer.`);
        }
    } else{
        alert("Temps invalide")
    }        
})


// Update le temps
setInterval(updateTime, 1000);
