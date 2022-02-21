const ctx = document.getElementById("myChart").getContext('2d')

function renderTable(date, cur_OfficialRate) {
  console.log(1);
  
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const tr = document.createElement("tr");

//   const th1 = document.createElement("th");
//   const th2 = document.createElement("th");
//  const thead = document.createElement('thead')
//   const tr = document.createElement("tr");
//   th1.innerText ="Data1"
//   th2.innerText ="Course"
//   thead.append(th1, th2);
//   table.append(thead);

  tr.append(td1, td2);
  table.append(tr);
  td1.innerText = `${date}`;
  td2.innerText = `${cur_OfficialRate}`;


}

function grafic() {
 

  const labels =  objDateCourse.lDate;
  const data = {
    labels: labels,
    datasets: [
      {
        label: CUR_NAME,
        data:   objDateCourse.lCourse,
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
    hoverBackgroundColor: 'red',
    scales: {
      x: {
        display: true,
        type: 'time',
        time: {
          unit: 'month'
      },
        title: {
          display: true,
          text: 'Дата',
          color: '#808080',
          font: {
            family: 'Times',
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 }
        }
      },
      y: {
        display: true,
        
        title: {
          display: true,
          text: 'Курс',
          color: '#808080',
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




  Object.assign(
    config,
    {
      type: "line",
      data: data,
      options: options
    }
  )

  if (!myChart) {
    myChart = new Chart(document.getElementById("myChart"), config);
  } else {
    myChart.update();
  }
}