
APP = {
    init: () => {
        APP.matchList = [];
        APP.salmonList = [];
        fetch(`https://splatoon3.ink/data/schedules.json`)
        .then((response)=>{
            if( !response.ok ) throw new Error
            return response.json();
        })
        .then((data)=>{
            APP.matchList = data.data.bankaraSchedules.nodes;
            APP.salmonList = data.data.coopGroupingSchedule.regularSchedules.nodes;
            return;
        })
        .then(()=>{
            APP.addEventListener();
            APP.insertTitle();
        })
        .catch((err)=>{
            alert(`Can't connect to servers :/`);
            console.warn(err);
        })
        
    },
    insertTitle: () => {
        const h1 = document.getElementsByTagName('h1')[0];
        const h2a = document.createElement('h2');
        const h2b = document.createElement('h2');

        const lengthMatch = APP.matchList.length - 1;
        const startDateMatch = APP.convertDate(APP.matchList[0].startTime);
        const endDateMatch = APP.convertDate(APP.matchList[lengthMatch].endTime);

        h2a.textContent = `Modes available from ${startDateMatch} to ${endDateMatch}`;
        h1.insertAdjacentElement("afterend", h2a);

        const lengthSalmon = APP.salmonList.length - 1;
        const startDateSalmon = APP.convertDate(APP.salmonList[0].startTime);
        const endDateSalmon = APP.convertDate(APP.salmonList[lengthSalmon].endTime);

        h2b.textContent = `Salmon available from ${startDateSalmon} to ${endDateSalmon}`;
        h2a.insertAdjacentElement("afterend", h2b);
    },
    addEventListener: () => {
        let btnSeries = document.getElementById('fetchSeries');
        let btnOpen = document.getElementById('fetchOpen');
        let btnSalmon = document.getElementById('fetchSalmon');

        btnSeries.addEventListener('click', APP.displaySeries, {once : true});
        btnOpen.addEventListener('click', APP.displayOpen, {once : true});
        btnSalmon.addEventListener('click', APP.displaySalmon, {once : true});

        const modes = ['Series', 'Open'];
        const types = ['Zones', 'Tower', 'Rainmaker', 'Clams'];
        const btnIds = types.flatMap(type => modes.map(mode => `fetch${type}${mode}`));
        
        btnIds.forEach(btnId => {
            const btn = document.getElementById(btnId);
            btn.addEventListener('click', APP[`display${btnId.slice(5)}`], {once: true});
        });
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
    displaySalmon: () => {
        const salmonRun = APP.salmonList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            stages: schedule.setting.coopStage,
            weapons: schedule.setting.weapons
        }))
        .flat();
        const ul = document.getElementById('displaySalmon');
        console.log(salmonRun);

        salmonRun.forEach(el => {
            let startDate = APP.convertDate(el.startTime);
            let endDate = APP.convertDate(el.endTime);
                ul.innerHTML += `
                <p><b>TIME:</b> ${startDate} - ${endDate}</p>
                <b>STAGE</b>
                <ul>
                <li>${el.stages.name}</li>
                <li><img src="${el.stages.image.url}" /></li>
                </ul>
                <b>WEAPONS</b>
                <ul>
                <li>${el.weapons[0].name}</li>
                <li>${el.weapons[1].name}</li>
                <li>${el.weapons[2].name}</li>
                <li>${el.weapons[3].name}</li>
                </ul>
                <hr>
                `
        });
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
    displayTowerSeries: () => {
        const challengeBattles = APP.matchList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            settings: schedule.bankaraMatchSettings.find(setting => setting.mode === 'CHALLENGE') || null
        }))
        .filter(schedule => schedule.settings !== null)
        .filter(schedule => schedule.settings.vsRule.rule === 'LOFT');

        const ul = document.getElementById('displayTowerSeries');
        const fetchAll = false;

        APP.displayContent(challengeBattles, ul, fetchAll);
    },
    displayTowerOpen: () => {
        const openBattles = APP.matchList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            settings: schedule.bankaraMatchSettings.find(setting => setting.mode === 'OPEN') || null
        }))
        .filter(schedule => schedule.settings !== null)
        .filter(schedule => schedule.settings.vsRule.rule === 'LOFT');
        
        const ul = document.getElementById('displayTowerOpen');
        const fetchAll = false;

        APP.displayContent(openBattles, ul, fetchAll);
    },
    displayRainmakerSeries: () => {
        const challengeBattles = APP.matchList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            settings: schedule.bankaraMatchSettings.find(setting => setting.mode === 'CHALLENGE') || null
        }))
        .filter(schedule => schedule.settings !== null)
        .filter(schedule => schedule.settings.vsRule.rule === 'GOAL');

        const ul = document.getElementById('displayRainmakerSeries');
        const fetchAll = false;

        APP.displayContent(challengeBattles, ul, fetchAll);
    },
    displayRainmakerOpen: () => {
        const openBattles = APP.matchList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            settings: schedule.bankaraMatchSettings.find(setting => setting.mode === 'OPEN') || null
        }))
        .filter(schedule => schedule.settings !== null)
        .filter(schedule => schedule.settings.vsRule.rule === 'GOAL');
        
        const ul = document.getElementById('displayRainmakerOpen');
        const fetchAll = false;

        APP.displayContent(openBattles, ul, fetchAll);
    },
    displayClamsSeries: () => {
        const challengeBattles = APP.matchList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            settings: schedule.bankaraMatchSettings.find(setting => setting.mode === 'CHALLENGE') || null
        }))
        .filter(schedule => schedule.settings !== null)
        .filter(schedule => schedule.settings.vsRule.rule === 'CLAM');

        const ul = document.getElementById('displayClamsSeries');
        const fetchAll = false;

        APP.displayContent(challengeBattles, ul, fetchAll);
    },
    displayClamsOpen: () => {
        const openBattles = APP.matchList
        .map(schedule => ({
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            settings: schedule.bankaraMatchSettings.find(setting => setting.mode === 'OPEN') || null
        }))
        .filter(schedule => schedule.settings !== null)
        .filter(schedule => schedule.settings.vsRule.rule === 'CLAM');
        
        const ul = document.getElementById('displayClamsOpen');
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
                ul.appendChild(li);
            } else {
                ul.innerHTML += `
                <p><b>TIME:</b> ${startDate} - ${endDate}</p>
                <b>STAGES</b>
                <ul>
                <li>${el.settings.vsStages[0].name}</li>
                <li><img src="${el.settings.vsStages[0].image.url}" /></li>
                <li>${el.settings.vsStages[1].name}</li>
                <li><img src="${el.settings.vsStages[1].image.url}" /></li>
                </ul>
                <hr>
                `
            }
        });
    },

    convertDate: (importedDate) => {
        const dateTimeString = importedDate;
        const dateTime = new Date(dateTimeString);
        
        const month = dateTime.toLocaleString('en-US', { month: 'long' });
        const day = dateTime.getDate();
        let hour = dateTime.getHours();
        const amOrPm = hour >= 12 ? 'PM' : 'AM';
        
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