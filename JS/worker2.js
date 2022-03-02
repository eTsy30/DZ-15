//id, startDate, endDate
const test =[]
self.addEventListener('message', function(data) {
    fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/${data.data.id}?startdate=${data.data.startDate}&enddate=${data.data.endDate}`)
    .then((response) => response.json())
    .then(postMessage)
})