
APP = {
    init: () => {
        APP.matchList = [],
        APP.fetchData();
        APP.addEventListener();
    },
    addEventListener: () => {
        let btnSeries = document.getElementById('fetchSeries');
        let btnOpen = document.getElementById('fetchOpen');
        let btnZonesSeries = document.getElementById('fetchZonesSeries');
        let btnZonesOpen = document.getElementById('fetchZonesOpen');
        btnSeries.addEventListener('click', APP.displaySeries);
        btnOpen.addEventListener('click', APP.displayOpen);
        btnZonesSeries.addEventListener('click', APP.displayZonesSeries);
        btnZonesOpen.addEventListener('click', APP.displayZonesOpen);
    },
    fetchData: () => {
        let url = 'https://splatoon3.ink/data/schedules.json'
        fetch(url)
        .then((response)=>{
            if( !response.ok ) throw new Error
            return response.json();
        })
        .then((data)=>{
            APP.matchList = data.data.bankaraSchedules.nodes;
        })
        .catch((err)=>{
            alert(`Can't connect to servers :/`);
            console.warn(err);
        })
    },
    displaySeries: () => {
        const challengeBattles = APP.matchList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            settings: schedule.bankaraMatchSettings.find(setting => setting.mode === 'CHALLENGE') || null
        }))
        .filter(schedule => schedule.settings !== null);
        const ul = document.getElementById('displaySeries');
        const fetchAll = true;

        APP.displayContent(challengeBattles, ul, fetchAll);
    },
    displayOpen: () => {
        const openBattles = APP.matchList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            settings: schedule.bankaraMatchSettings.find(setting => setting.mode === 'OPEN') || null
        }))
        .filter(schedule => schedule.settings !== null);
        const ul = document.getElementById('displayOpen');
        const fetchAll = true;

        APP.displayContent(openBattles, ul, fetchAll);
    },

    displayZonesSeries: () => {
        const challengeBattles = APP.matchList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            settings: schedule.bankaraMatchSettings.find(setting => setting.mode === 'CHALLENGE') || null
        }))
        .filter(schedule => schedule.settings !== null)
        .filter(schedule => schedule.settings.vsRule.rule === 'AREA');
        
        const ul = document.getElementById('displayZonesSeries');
        const fetchAll = false;

        APP.displayContent(challengeBattles, ul, fetchAll);
    },
    displayZonesOpen: () => {
        const openBattles = APP.matchList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            settings: schedule.bankaraMatchSettings.find(setting => setting.mode === 'OPEN') || null
        }))
        .filter(schedule => schedule.settings !== null)
        .filter(schedule => schedule.settings.vsRule.rule === 'AREA');
        
        const ul = document.getElementById('displayZonesOpen');
        const fetchAll = false;

        APP.displayContent(openBattles, ul, fetchAll);
    },

    displayContent: (data, ul, fetchAll) => {
        data.forEach(el => {
            let startDate = APP.convertDate(el.startTime);
            let endDate = APP.convertDate(el.endTime);
            const li = document.createElement('li');
            if (fetchAll === true)
            {
                li.textContent = `MODE: ${el.settings.vsRule.name} - STAGES: ${el.settings.vsStages[0].name} & ${el.settings.vsStages[1].name} - FROM: ${startDate} to ${endDate}`;
            } else {
                li.textContent = `STAGES: ${el.settings.vsStages[0].name} & ${el.settings.vsStages[1].name} - FROM: ${startDate} to ${endDate}`;
            }
            ul.appendChild(li);
            console.log(el);
        });
    },

    convertDate: (importedDate) => {
        const dateTimeString = importedDate;
        const dateTime = new Date(dateTimeString);
        
        const month = dateTime.toLocaleString('en-US', { month: 'long' });
        const day = dateTime.getDate();
        let hour = dateTime.getHours();
        const amOrPm = hour >= 12 ? 'pm' : 'am';
        
        hour = hour % 12 || 12;
        const formattedString = `${month} ${day}, ${hour}${amOrPm}`;
        return formattedString;
    }
 
}

document.addEventListener('DOMContentLoaded', ()=>{
   APP.init();
})

//Tower control = LOFT
//Rainmaker = GOAL
//Clam blitz = CLAM
//Splat zones = AREA