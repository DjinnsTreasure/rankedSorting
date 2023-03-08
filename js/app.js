
APP = {
fetchData: () => {
    let url = 'https://splatoon3.ink/data/schedules.json'
    fetch(url)
    .then((response)=>{
        if( !response.ok ) throw new Error
        return response.json();
    })
    .then((data)=>{
        let schedules = data.data.bankaraSchedules.nodes;
        // let filteredSchedules = [];
        // schedules.forEach(element => {
        //     let mode = element.bankaraMatchSettings;
        //     let zones = mode.forEach(el => {
        //        let rule = el.vsRule.rule;
        //        if (rule === 'AREA') {
        //         filteredSchedules.push(mode);
        //        }
        //     })
        // });
        // console.log(filteredSchedules)
        const challengeBattles = schedules
        .map(schedule => schedule.bankaraMatchSettings.filter(setting => setting.mode === 'CHALLENGE'))
        .flat();
        // console.log(challengeBattles)
        return challengeBattles
    }).then((data)=>{
        console.log(data);
        let ul = document.getElementById('displaySeries');
        data.forEach(setting => {
            const li = document.createElement('li');
            li.textContent = `${setting.vsRule.name}`;
            ul.appendChild(li);
          });
    })
    .catch((err)=>{
        console.log(err);
    })
},

init: () => {
    let btn = document.getElementById('fetchSeries');
    btn.addEventListener('click', APP.fetchData);
}    
}

document.addEventListener('DOMContentLoaded', ()=>{
   APP.init();


//Tower control = LOFT
//Rainmaker = GOAL
//Clam blitz = CLAM
//Splat zones = AREA
})