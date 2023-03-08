
APP = {
    init: () => {
        APP.matchList = [],
        APP.fetchData();
        APP.addEventListener();
    },
    addEventListener: () => {
        let btnSeries = document.getElementById('fetchSeries');
        let btnOpen = document.getElementById('fetchOpen');
        btnSeries.addEventListener('click', APP.displaySeries);
        btnOpen.addEventListener('click', APP.displayOpen);
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
        console.log(challengeBattles);
        let ul = document.getElementById('displaySeries');

        challengeBattles.forEach(el => {
            let startDate = APP.convertDate(el.startTime);
            let endDate = APP.convertDate(el.endTime);
            const li = document.createElement('li');
            li.textContent = `MODE: ${el.settings.vsRule.name} - STAGES: ${el.settings.vsStages[0].name} & ${el.settings.vsStages[1].name} - FROM: ${startDate} to ${endDate}`;
            ul.appendChild(li);
            console.log(el);
        });
    },

    convertDate: (importedDate) => {
        const dateTimeString = importedDate;

        // Create a new Date object from the string
        const dateTime = new Date(dateTimeString);

        // Get the month, day, and hour components from the Date object
        const month = dateTime.toLocaleString('en-US', { month: 'long' });
        const day = dateTime.getDate();
        let hour = dateTime.getHours();
        const amOrPm = hour >= 12 ? 'pm' : 'am';

        // Convert the hour component to 12-hour format
        hour = hour % 12 || 12;

        // Construct the formatted string
        const formattedString = `${month} ${day}, ${hour}${amOrPm}`;
        return formattedString;
    }
 
}

document.addEventListener('DOMContentLoaded', ()=>{
   APP.init();


//Tower control = LOFT
//Rainmaker = GOAL
//Clam blitz = CLAM
//Splat zones = AREA
})