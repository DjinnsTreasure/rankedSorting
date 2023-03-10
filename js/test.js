function fetchData () {
    let url = 'https://splatoon3.ink/data/schedules.json'
    fetch(url)
    .then((response)=>{
        if( !response.ok ) throw new Error
        return response.json();
    })
    .then((data)=>{
        let schedules = data.data.xSchedules.nodes
        schedules.forEach(el => {
            console.log(el)
        })
        
        // console.log(schedules)
        
    })
}
fetchData();