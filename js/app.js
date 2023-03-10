
APP = {
    init: () => {
        APP.matchList = [];
        APP.currentData = [];
        fetch(`https://splatoon3.ink/data/schedules.json`)
        .then((response)=>{
            if( !response.ok ) throw new Error
            return response.json();
        })
        .then((data)=>{
            APP.matchList = data.data;
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
        let anarchyData = APP.matchList.bankaraSchedules.nodes
        let salmonData = APP.matchList.coopGroupingSchedule.regularSchedules.nodes;
        const h1 = document.getElementsByTagName('h1')[0];
        const h2a = document.createElement('h2');
        const h2b = document.createElement('h2');

        const lengthMatch = anarchyData.length - 1;
        const startDateMatch = APP.convertDate(anarchyData[0].startTime);
        const endDateMatch = APP.convertDate(anarchyData[lengthMatch].endTime);

        h2a.textContent = `Modes available from ${startDateMatch} to ${endDateMatch}`;
        h1.insertAdjacentElement("afterend", h2a);

        const lengthSalmon = salmonData.length - 1;
        const startDateSalmon = APP.convertDate(salmonData[0].startTime);
        const endDateSalmon = APP.convertDate(salmonData[lengthSalmon].endTime);

        h2b.textContent = `Salmon available from ${startDateSalmon} to ${endDateSalmon}`;
        h2a.insertAdjacentElement("afterend", h2b);
    },

    addEventListener: () => {
        const section = document.getElementById('displayContent');
        let vsRules = document.getElementsByClassName('vsRuleButtons')[0];
        document.getElementById('fetchSeries').addEventListener('click', () =>{
            section.innerHTML = "";
            APP.getData('series');
        });
        document.getElementById('fetchOpen').addEventListener('click', ()=>{
            section.innerHTML = "";
            APP.getData('open');
        });
        document.getElementById('fetchSalmon').addEventListener('click', ()=>{
            vsRules.classList.add('hidden');
            section.innerHTML = "";
            APP.getData('salmon');
        });

        const btnIds = ['AREA', 'LOFT', 'GOAL', 'CLAM'];
        btnIds.forEach(btnId => {
            const btn = document.getElementById(btnId);
            btn.addEventListener('click', (ev)=>{
                let id = ev.target.id;
                APP.sortData(id);
            });
        });
    },

    getData: (type) => {
        let data;
        if ( type === 'series' || type === 'open' ) {
            const anarchyData = APP.matchList.bankaraSchedules.nodes
            let modeType;
            if ( type === 'series' ) { modeType = 'CHALLENGE' } else { modeType = 'OPEN' };
            data = anarchyData.map(schedule => ({
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                settings: schedule.bankaraMatchSettings.find(setting => setting.mode === modeType) || null
            }))
            .filter(schedule => schedule.settings !== null);
            APP.displayVS(data);
        } else if ( type === 'salmon' ) {
            const salmonData = APP.matchList.coopGroupingSchedule.regularSchedules.nodes;
            data = salmonData.map(schedule => ({
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                stages: schedule.setting.coopStage,
                weapons: schedule.setting.weapons
            }))
            .flat();
            APP.displayCOOP(data);
        } else { return };
    },

    displayVS: (data, isSort) => {
        if (!isSort) {
            APP.currentData = data;
        }
        let vsRules = document.getElementsByClassName('vsRuleButtons')[0];
        vsRules.classList.remove('hidden');

        const section = document.getElementById('displayContent');
        section.innerHTML = "";
        data.forEach(el => {
            let startDate = APP.convertDate(el.startTime);
            let endDate = APP.convertDate(el.endTime);
            section.innerHTML += `
                <p class="smallHeader"><b>TIME:</b> ${startDate} - ${endDate}</p>
                <p class="miniHeader"><b>MODE:</b> ${el.settings.vsRule.name}</p>
                <b>STAGES</b>
                <ul>
                <li>${el.settings.vsStages[0].name}</li>
                <li><img src="${el.settings.vsStages[0].image.url}" /></li>
                <li>${el.settings.vsStages[1].name}</li>
                <li><img src="${el.settings.vsStages[1].image.url}" /></li>
                </ul>
                <hr>
                `
        });
    },

    displayCOOP: (data) => {
        const section = document.getElementById('displayContent');
        data.forEach(el => {
            let startDate = APP.convertDate(el.startTime);
            let endDate = APP.convertDate(el.endTime);
            section.innerHTML += `
            <p class="miniHeader"><b>TIME:</b> ${startDate} - ${endDate}</p>
            <b>STAGE</b>
            <ul>
            <li>${el.stages.name}</li>
            <li><img src="${el.stages.thumbnailImage.url}" /></li>
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

    sortData: (id) => {
        const isSort = true;
        let filteredData = APP.currentData.filter(schedule => schedule.settings.vsRule.rule === id);
        APP.displayVS(filteredData, isSort);
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