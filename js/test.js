function fetchData () {
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
        let filtered = [];
        

        schedules.forEach((el)=>{
            let mode = el.bankaraMatchSettings
            // const open = el.filter(file => file.mode === 'OPEN');
            // const openFiles = data.filter(file => file.mode === 'OPEN');

            console.log(mode);
        })
        console.log(filtered);
    })
}
fetchData();