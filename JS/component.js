class Course extends HTMLTableElement {
    constructor() {
        super();
        const tbody = document.createElement('tbody')
        function getCourseTable(id){
            fetch(`https://www.nbrb.by/api/exrates/rates/${id}`)
            .then((response) => response.json())
            .then((data) => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                    <tr>
                        <td>${data.Cur_Scale} ${data.Cur_Abbreviation}</td>
                        <td>${data.Cur_OfficialRate}</td>
                    </tr>
                    `
                    tbody.append(tr)
                }
            )
        }
        getCourseTable(431)
        getCourseTable(451)
        getCourseTable(456)
        this.setAttribute('class','tablee')
        this.append(tbody)
        let style = document.createElement('style');
        style.innerText =`
        .tablee {
            margin: auto;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  color: #595959;
  box-shadow: 2px 2px 5px #BABECC,
             -5px -5px 10px #ffffff73;
        }
        .tablee tr td {
            text-align: center;
            width: 100px;
            height: 35px;
            
            border-spacing: 0px;
  box-shadow: 2px 2px 5px #BABECC,
             -5px -5px 10px #ffffff73;
            
                    } 
      
        }
        `
        this.append(style);
    }
  }
customElements.define('course-money', Course, {extends: 'table'});