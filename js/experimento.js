fetch("https://amazing-events.herokuapp.com/api/events")
  .then((response) => response.json())
  .then((data) => pushArray(data));
  const pushArray = (data) => {

let categoryFilter = [...data.events.filter((event) => event.assistance)];
let categoryFilter2 = [...data.events.filter((event) => event.estimate)];
let categoryMap = [...new Set(categoryFilter.map((event) => event.category))];
let categoryMapUp = [...new Set(categoryFilter2.map((event) => event.category))];
let pastAssistence = document.getElementById("pastAssistence");

///////////-----------PAST EVENT STATS--------////
categoryMap.forEach((event) => {
  let revenue = 0;
let assistence = 0;
let capacity = 0;

  categoryFilter.forEach((e) => {
    if (e.category == event) {
      revenue += (e.assistance * e.price);
      capacity += parseInt(e.capacity)
      assistence += parseInt(e.assistance)
      console.log(revenue)      
    }
  })
            pastAssistence.innerHTML += `
                      <tr class="table-success">
                      <td>${event}</td>
                      <td>$ ${revenue.toLocaleString('de-DE')}</td>
                      <td>${Math.round(assistence*100/capacity)}%</td>
                      </tr>
                      `
});

///////////-----------UP EVENT STATS--------/////////
let upEstimate = document.getElementById("upEstimate");
categoryMapUp.forEach((event) => {
  let revenue = 0;
let estimate = 0;
let capacity = 0;
  categoryFilter2.forEach((e) => {
    if (e.category == event) {
      revenue += (e.estimate * e.price);
      capacity += parseInt(e.capacity)
      estimate += parseInt(e.estimate)
      console.log(revenue)      
    }
  })
  upEstimate.innerHTML += `
                      <tr class="table-success">
                      <td>${event}</td>
                      <td>$ ${revenue.toLocaleString('de-DE')}</td>
                      <td>${Math.round(estimate*100/capacity)}%</td>
                      </tr>`})
                      
                      
/////////------------PRIMERA PREGUNTA-----------///////
let stats = document.getElementById("stats");
let arrAssist = data.events.filter( event => event.assistance) // [ eventos con assistance]

let maximo =arrAssist.map(assist => parseInt(assist.assistance) * 100 / parseInt(assist.capacity)) // [todas % las assistance]
let maxCapacity = data.events.map( event => event.capacity) // [arr completo de todas las capacity]

let max = Math.max(...maximo) // la assistance maxima
let min = Math.min(...maximo) // la assistance minima
let maxCap = Math.max(...maxCapacity) // capacity max

let eventoMax = arrAssist.find( event => parseInt(event.assistance) * 100 / parseInt(event.capacity) == max) // evento con mayor assistance
let eventoMin = arrAssist.find( event => parseInt(event.assistance) * 100 / parseInt(event.capacity) == min) // evento con menor assistance
let eventMaxCapacity = data.events.find ( event => event.capacity == maxCap) // evento con mayor capacidad


function createTableStats(){
  // HIGHT ATTENDANCE
  const row = document.createElement("td")
  row.innerHTML += 
  `<td> ${eventoMax.name} = ${max}%</td>`
  
  stats.appendChild(row)
  
  // LOW ATTENDANCE
  const row2 = document.createElement("td")
  row2.innerHTML += 
  `<td>${eventoMin.name} = ${min}%</td>`
  
  stats.appendChild(row2)
  
  // LARGE CAPACITY
  const row3 = document.createElement("td")
  row3.innerHTML += 
  `<td>${eventMaxCapacity.name} = ${maxCap}</td>`
  
  stats.appendChild(row3)
}
createTableStats()

}