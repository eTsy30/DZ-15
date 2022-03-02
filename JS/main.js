const table = document.querySelector(".ttable");
const selectCourse = document.querySelector(".selectCourse");
const objSel = document.getElementById("mySelect");
const dateStatr = document.querySelector('.dateBefore')
const dateEnd = document.querySelector('.dateAfter')
const element = document.querySelector('.anim');
const allData = [];
let ID = 0;
let CUR_NAME = null;// нужно для реедера таблицы

///////kalendar
dateStatr.addEventListener('change', onChangeInput)
dateEnd.addEventListener('change', onChangeInput)

function onChangeInput() {
  if (dateStatr.value && dateEnd.value) {
    table.innerHTML = "";
    getCourseFromT(selectCourse.value, dateStatr.value, dateEnd.value)
  }
}

function setDatainInput(start, end) {
  dateStatr.value = start
  dateEnd.value = end
}

/////////// worker 2
function getCourseFromT(id, startDate, endDate) {
  setDatainInput(startDate, dayjs().format('YYYY-MM-DD'))
  if (window.Worker) {
    const worker2 = new Worker("JS/worker2.js");
    worker2.addEventListener("message", ({ data }) => {
      renderTable(data)
      grafic(data)
    });

    worker2.postMessage({ id, startDate, endDate });
  }
}

function addAllData(data) {
  data.forEach((el) =>
    allData.push({
      Cur_ID: el.Cur_ID,
      Cur_Name: el.Cur_Name,
      Cur_DateStart: el.Cur_DateStart,
      Cur_DateEnd: el.Cur_DateEnd,
    }))
  addOptions();
}

function addOptions() {
  // const options = allData.reduce((accum, el) => {
  //   accum.push(new Option(`${el.Cur_Name}`, `${el.Cur_ID}`))
  //   return accum
  // }, [])

  // objSel.options = options

  allData.forEach((el, i) => {
    objSel.options[i] = new Option(`${el.Cur_Name}`, `${el.Cur_ID}`);
  });
}


selectCourse.addEventListener("change", () => {
  table.innerHTML = "";
  const selectElement = allData.find((number) => Number(number.Cur_ID) === Number(selectCourse.value))

  getCourseFromT(
    selectElement.Cur_ID,
    selectElement.Cur_DateStart.slice(0, 10),
    selectElement.Cur_DateEnd.slice(0, 10));
  ID = selectElement.Cur_ID;
  CUR_NAME = selectElement.Cur_Name

});

//вызовы
function day() {
  table.innerHTML = "";
  let now = String(dayjs().format("YYYY-MM-DD"));
  getCourseFromT(ID, now, now);
  // element.classList.toggle("animate__flash");
  element.classList.toggle("animate__flash")
 


}

function chooseDataRate(dataRate) {
  table.innerHTML = "";
  const now = String(dayjs().format("YYYY-MM-DD"));
  const to = String(dayjs().add(-1, dataRate).format("YYYY-MM-DD"));
  getCourseFromT(ID, to, now);
  element.classList.toggle("animate__flash");
}

///////////worker
if (window.Worker) {
  const worker = new Worker("JS/worker.js");
  worker.addEventListener("message", ({ data }) => {
    addAllData(data);
  });
};
//////////////
const excengeOne = document.querySelector('.excengeOne')
const excengeTwo = document.querySelector('.excengeTwo')
const excangeFirstCurse = document.querySelector('.excangeFirstCurse')
const excangeSecondCurse = document.querySelector('.excangeSecondCurse')
const otvet = document.querySelector('.otvet')
let allexcenge = {}
fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0')
  .then((response) => response.json())
  .then((data) => {
    allexcenge= data
     console.log('c fetcch',allexcenge);
    data.forEach((data, i) => {
      excangeFirstCurse.options[i] = new Option(`${data.Cur_Name}`, `${data.Cur_ID}`);
      excangeSecondCurse.options[i] = new Option(`${data.Cur_Name}`, `${data.Cur_ID}`);
      
    })
  })

  excengeOne.addEventListener('change', excenge)
  excengeTwo.addEventListener('change', excenge)
  function excenge (){
    const selectElementexcangeFirstCurse =  allexcenge.find((number) => Number(number.Cur_ID) === Number(excangeFirstCurse.value))
     const selectElementexcangeSecondCurse = allexcenge.find((number) => Number(number.Cur_ID) === Number(excangeSecondCurse.value))
   console.log(selectElementexcangeFirstCurse);
   otvet.value =Number(excengeOne.value)*(selectElementexcangeFirstCurse.Cur_OfficialRate/selectElementexcangeFirstCurse.Cur_Scale )/(selectElementexcangeSecondCurse.Cur_OfficialRate/selectElementexcangeSecondCurse.Cur_Scale )

 }

//  const canva = document.querySelector('.texePresentation')
//  const ctx1 = canva.getContext("2d");
//  const gradient = ctx1.createLinearGradient(0, 0, 0, 0);
//  gradient.addColorStop(0.0, 'rgba(0, 0, 255, 1)');
//  gradient.addColorStop(0.3, 'rgba(128, 0, 255, 0.6)');
//  gradient.addColorStop(0.6, 'rgba(0, 0, 255, 0.4)');
//  gradient.addColorStop(1.0, 'rgba(0, 255, 0, 0.2)');
//  ctx1.fillStyle = gradient;
//  ctx1.fillText("Fill text", 0, 0);