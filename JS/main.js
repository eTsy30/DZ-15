

const table = document.querySelector('.ttable')
const selectCourse = document.querySelector('.selectCourse')
const allData = []
let arr = []
let ID = 0
const objSel = document.getElementById("mySelect");
///////////worker
if (window.Worker){
const worker = new Worker('JS/worker.js')
worker.addEventListener('message', ({data}) => {
    data.forEach(el =>{
        addAllData(el)  
    })
     addOptions()
});
}
/////////// worker 2
function getCourseFromT(id, startDate, endDate) {
    if (window.Worker){
        const worker2 = new Worker('JS/worker2.js')
        worker2.addEventListener('message', ({data})=>{
            console.log('main',data);
             data.reverse().forEach(el => {
               renderTable(el.Date.slice(0, 10), el.Cur_OfficialRate)})    
                                                        
    })
        worker2.postMessage({
           id: id, 
           startDate: startDate, 
           endDate:endDate
                            })
        
}
}


function addAllData(el){
    allData.push({
        Cur_ID: el.Cur_ID,
        Cur_Name: el.Cur_Name,
        Cur_DateStart: el.Cur_DateStart,
        Cur_DateEnd: el.Cur_DateEnd
    })
   
  
}
function addOptions() {//foreach
    for (let i = 0; i < allData.length; i++) {
        objSel.options[i] = new Option(`${allData[i].Cur_Name}`, `${allData[i].Cur_ID}`);
    }
}





function renderTable(date, cur_OfficialRate) {
    const tr = document.createElement('tr')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    tr.append(td1, td2)
    table.append(tr);
    td1.innerText = `${date}`;
    td2.innerText = `${cur_OfficialRate}`;
}


selectCourse.addEventListener('change', () => {
    table.innerHTML = '';
    arr = allData.filter((number) => Number(number.Cur_ID) == Number(selectCourse.value));

    arr.forEach(el => {

        getCourseFromT(el.Cur_ID, el.Cur_DateStart.slice(0, 10), el.Cur_DateEnd.slice(0, 10))
        ID = el.Cur_ID

    });

})


//вызовы




function day() {
    table.innerHTML = '';
    let now=String(dayjs().format('YYYY-MM-DD'))
    getCourseFromT(ID, now, now )

}

function week() {
    table.innerHTML = '';
    let now=String(dayjs().format('YYYY-MM-DD'))
    let to =String( dayjs().add(-7, 'day').format('YYYY-MM-DD'))
    getCourseFromT(ID, to, now );

}
function month() {
    table.innerHTML = '';
    let now=String(dayjs().format('YYYY-MM-DD'))
    let to =String( dayjs().add(-1, 'month').format('YYYY-MM-DD'))
    getCourseFromT(ID, to, now )
    


}
function year() {
    table.innerHTML = '';
    let now=String(dayjs().format('YYYY-MM-DD'))
    let to =String(dayjs().add(-1, 'year').format('YYYY-MM-DD'))
    getCourseFromT(ID, to, now )
    
}