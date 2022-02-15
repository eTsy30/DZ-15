
fetch('https://www.nbrb.by/api/exrates/currencies')
        .then((response) => response.json())
        .then((data) => data.filter((el) => Number(el.Cur_DateEnd.slice(0, 4)) >= 2022))
        .then(postMessage)
       