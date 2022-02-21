const table = document.querySelector(".ttable");
const selectCourse = document.querySelector(".selectCourse");
const objSel = document.getElementById("mySelect");
const dateStatr =document.querySelector('.dateBefore')
const dateEnd =document.querySelector('.dateAfter')
const allData = [];
let arr = [];
let ID = 0;
let CUR_NAME;
const config = {};
let myChart;
let objDateCourse = {};
///////kalendar
dateStatr.addEventListener('change', input)
dateEnd.addEventListener('change', input)
function input() {
  if(dateStatr.value&&dateEnd.value) {
    table.innerHTML = "";
    getCourseFromT(selectCourse.value, dateStatr.value, dateEnd.value)
  }
}
function dateBeforeAfter(start, end) {
  
  dateStatr.value=start
  dateEnd.value=end
}
///////////worker
if (window.Worker) {
  const worker = new Worker("JS/worker.js");
  worker.addEventListener("message", ({ data }) => {
    data.forEach((el) => {
      addAllData(el);
    });
    addOptions();
  });
}
/////////// worker 2
function getCourseFromT(id, startDate, endDate) {
  dateBeforeAfter(startDate,dayjs().format('YYYY-MM-DD'))
  const dateL = [];
  const coursL = [];
  if (window.Worker) {
    const worker2 = new Worker("JS/worker2.js");
    worker2.addEventListener("message", ({ data }) => {
      data.reverse().forEach((el) => {
        dateL.push(el.Date.slice(0, 10));
        coursL.push(el.Cur_OfficialRate);
        renderTable(el.Date.slice(0, 10), el.Cur_OfficialRate);
        
      });
    });
    objDateCourse.lCourse = coursL;
    objDateCourse.lDate = dateL;

    worker2.postMessage({
      id: id,
      startDate: startDate,
      endDate: endDate,
    });
  }

}

function addAllData(el) {
  allData.push({
    Cur_ID: el.Cur_ID,
    Cur_Name: el.Cur_Name,
    Cur_DateStart: el.Cur_DateStart,
    Cur_DateEnd: el.Cur_DateEnd,
  });
}
function addOptions() {
  allData.forEach((el, i) => {
    objSel.options[i] = new Option(`${el.Cur_Name}`, `${el.Cur_ID}`);
  });
}



selectCourse.addEventListener("change", () => {
  table.innerHTML = "";
  arr = allData.filter((number) => Number(number.Cur_ID) == Number(selectCourse.value));
  arr.forEach((el) => {
    getCourseFromT(
      el.Cur_ID,
      el.Cur_DateStart.slice(0, 10),
      el.Cur_DateEnd.slice(0, 10) );
    ID = el.Cur_ID;
    CUR_NAME= el.Cur_Name
  });
});

//вызовы
function day() {
  table.innerHTML = "";
  let now = String(dayjs().format("YYYY-MM-DD"));
  dateBeforeAfter(now, now)
  getCourseFromT(ID, now, now);
  

}
function week() {
  table.innerHTML = "";

  

  let now = String(dayjs().format("YYYY-MM-DD"));
  let to = String(dayjs().add(-7, "day").format("YYYY-MM-DD"));
  dateBeforeAfter(to,now)
  getCourseFromT(ID, to, now);
  grafic()
  
}
function month() {
  table.innerHTML = "";
  let now = String(dayjs().format("YYYY-MM-DD"));
  let to = String(dayjs().add(-1, "month").format("YYYY-MM-DD"));
  dateBeforeAfter( to,now)
  getCourseFromT(ID, to, now);
}
function year() {
  table.innerHTML = "";
  let now = String(dayjs().format("YYYY-MM-DD"));
  let to = String(dayjs().add(-1, "year").format("YYYY-MM-DD"));
  dateBeforeAfter( to,now)
  getCourseFromT(ID, to, now);
}
/////////////////графики
// const moment= require('moment') 
// function hoursEarlier(hours) {
//   return moment().subtract(day, 'd').toDate();
// };
// console.log('moment',hoursEarlier(objDateCourse.lDate));