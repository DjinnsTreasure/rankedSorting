function fetchData () {
    let url = 'https://splatoon3.ink/data/schedules.json'
    fetch(url)
    .then((response)=>{
        if( !response.ok ) throw new Error
        return response.json();
    })
    .then((data)=>{
        let schedules = data.data.coopGroupingSchedule.regularSchedules.nodes;
        let setting = schedules.forEach((set)=>{
            // console.log(set.setting.coopStage); //will get name and thumb image
            // console.log(set.setting.weapons) //will get weapon and weapon name
            // console.log(set.startTime);
            // console.log(set.endTime);

        })
        
        // console.log(schedules)
        
    })
}
fetchData();