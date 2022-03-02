const ctx = document.getElementById("myChart").getContext('2d')
let myChart;
const deg =6
const hr=document.querySelector('#hr')
const mn=document.querySelector('#mn')
const sc=document.querySelector('#sc')

function renderTable(date) {

  const thead = document.createElement("thead");
  table.appendChild(thead)
  const tRow = document.createElement('tr')
  const theadading_1 = document.createElement('th')
  const theadading_2 = document.createElement('th')
  const texDay = document.createTextNode("Дата");
  const texresult = document.createTextNode("Курс");
  theadading_1.appendChild(texDay)
  theadading_2.appendChild(texresult)
  tRow.appendChild(theadading_1)
  tRow.appendChild(theadading_2)
  thead.appendChild(tRow)
  
  date.reverse().forEach((el) => {
  
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const tr = document.createElement("tr");
  tr.append(td1, td2);
  table.append(tr);
  td1.innerText = `${el.Date.slice(0, 10)}`;
  td2.innerText = `${el.Cur_OfficialRate}`;

  })
}

function grafic(dat) {
  const dateL = [];
  const coursL = [];
  dat.forEach((el) => {
    dateL.push(el.Date.slice(0, 10));
    coursL.push(el.Cur_OfficialRate);
  });

  const data = {
    labels: dateL,
    datasets: [
      {
        label: CUR_NAME,
        data:   coursL,
        backgroundColor: "rgb(255, 255, 255, 0.3)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        fill: true,
        tension: 0.3,
      },
    ],
  };
  const options = {
    maintainAspectRatio: true,
    hoverRadius: 8,
    hoverBackgroundColor: '#3498db',
    scales: {
      x: {
        display: true,
        type: 'time',
        time: {
          unit: 'day'
      },
        title: {
          display: true,
          text: 'Дата',
          color: '#3498db',
          font: {
            family: 'Times',
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 }
        }
      },
      y: {
        display: true,
        
        title: {
          display: true,
          text: 'Курс',
          color: '#3498db',
          font: {
            family: 'Times',
            size: 20,
            style: 'normal',
            lineHeight: 1.2
          },
          padding: { top: 30, left: 0, right: 0, bottom: 0 }
        }
      }
    }

  };

  


  if (!myChart) {
    myChart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: data,
      options: options
    });
  } else {
    myChart.options = options
    myChart.data = data
    myChart.update();
  }
}

setInterval(()=>{
  let day = new Date()
  let hh =day.getHours()*30
  let mm = day.getMinutes()*deg
 let ss =day.getSeconds()*deg
 
 hr.style.transform =`rotateZ(${(hh)+(mm/12)}deg)`
  mn.style.transform =`rotateZ(${mm}deg)`
 sc.style.transform =`rotateZ(${ss}deg)`
})