//id, startDate, endDate
self.addEventListener('message', function(data) {
    console.log(data.data);
    fetch(`https://www.nbrb.by/api/exrates/rates/dynamics/${data.data.id}?startdate=${data.data.startDate}&enddate=${data.data.endDate}`)
    .then((response) => response.json())
    // .catch((error)=>console.log(error))
     .then(postMessage)
})