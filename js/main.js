///////// -------------- DOM DE LA PÁGINA -------------- //////
let element = document.getElementById("mydiv");
let cardConteiner = document.getElementById("cardConteiner");
let currentDate = "";

fetch("https://amazing-events.herokuapp.com/api/events")
  .then((response) => response.json())
  .then((data) => pushArray(data));
  const pushArray = (data) => {

    
  let arrayIndex = data.events.filter(
    (event) => parseInt(event.date) <= parseInt(data.currentDate)
  );
  let arrayComing = data.events.filter(
    (event) => parseInt(event.date) >= parseInt(data.currentDate)
  );
  let arrayPast = data.events.filter(
    (event) => parseInt(event.date) < parseInt(data.currentDate)
  );

  ///////// -------------- EJECUTAR FUNCIÓN FINAL -------------- //////
  checkPage();
  ///////// -------------- FUNCIÓN GENERAL DE CREAR CARTAS Y CATEGORIAS -------------- //////
  ////////////////////////////+/////-/////////////////////
  function cardPrinterFinal(finalArray) {
    ///////// ---------------------FUNCIÓN CREAR CARTAS---------------------//////
    function printCards(array) {
      cards += `<div class="cardConteiner">
            <div class="card"  >
            <div class="card-img"> <img class= "cardImg" src="${array.image}" alt="${array.name}"></div>
            <div class="card-info">
            <p class="text-title">${array.name}</p>
            <p class="text-body">${array.description}</p>
            </div>
            <h5> ${array.date} </h5>
            <div class="card-footer">
            <span class="text-title">$ ${array.price}</span>
            <div class="card-button">
            <a href="./details.html?id=${array._id}">+</a>
            </div>
            </div></div>
            </div>`;
      cardConteiner.innerHTML = cards;
      // console.log(cards)
    }
    ///////--------------------- CREAR ARRAY CATEGORIAS------------------//////
    let checkboxContainer = document.getElementById("checksContainer");
    let category = [...new Set(finalArray.map((event) => event.category))];

    // console.log(checkboxContainer);
    // console.log(category);

    ////////------------------CREAR FUNCIÓN CATERGORIAS------------------//////

    function printCategory(event) {
      printCheckbox = "";
      printCheckbox = `<div class="form-check form-switch">
 <input class="form-check-input " type="checkbox" role="switch" id="${event}">
 <label class="form-check-label text-light shadow rounded" for="${event}">${event}</label>
</div>`;
      checkboxContainer.innerHTML += printCheckbox;
    }
    ////////---------------- LEER EVENTO A CADA ARRAY Y CATEGORIA   --------------------////////

    category.forEach(printCategory);
    /////////------------------------LEER EL SEARCH---------------------/////////
    let search = document.getElementById("search");
    let text = "";
    // console.log(search);

    search.addEventListener("keyup", (event) => {
      text = event.target.value;
      //   console.log(text);

      filterinData();
    });

    ////////////---------------------LEER EL CHECKBOX--------------------//////
    let checkbox = document.querySelectorAll("input[type='checkbox']");
    // console.log(checkbox);

    //////------------------------ARRAY IMPORTANTE------------------------////
    let arrayChecked = [];
    checkbox.forEach((event) => event.addEventListener("click", clickValue));
    function clickValue(event) {
      let clickeo = event.target.checked;

      if (clickeo) {
        arrayChecked.push(event.target.id);
        // console.log(arrayChecked);
        // console.log(checkbox)
        filterinData();
      } else {
        arrayChecked = arrayChecked.filter((item) => item !== event.target.id);
        // console.log(arrayChecked);
        filterinData();
      }
    }
    ////////////----------------- FILTRO FINAL ---------------/////

    /////NECESITAMOS UN ARRAY, QUE SI CHECKBOX ESTA CHECK, NOS RETORNE LOS CHECKED///// CASO 1
    //// SI SEARCH ESTA CON TEXTO, NOSA AGREGUE AL ARRAY LO QUE COINCIDA CON EL TEXTO /// CASO 2
    /// SI SEARCH TIENE TEXTO Y CHECKBOX ESTA CHECKED, NOS AGUEGUE AMBOS ELEMENTOS AL ARRAY//// CASO 3
    /// ME MUESTRE TODAS LAS TARJETAS SIN NIGNÚN TIPO DE FILTRO/////

    function filterinData() {
      cards = "";
      let arrayCatLength = arrayChecked.length;
      let filterArray = []; //// ARRAY FINAL

      if (text !== "" && arrayCatLength > 0) {
        ////CASO 1   BUSCAR + CATEGORY
        filterArray.push(
          ...finalArray.filter(
            (event) =>
              event.name.toLowerCase().includes(text.toLowerCase().trim()) &&
              arrayChecked.some((item) => item == event.category)
          )
        );
      } else if (text == "" && arrayCatLength > 0) {
        /// CASO 2   CATEGORY
        filterArray.push(
          ...finalArray.filter((event) =>
            arrayChecked.some((item) => item == event.category)
          )
        );
      } else if (text !== "" && arrayCatLength === 0) {
        ///CASO 3   BUSCAR
        filterArray.push(
          ...finalArray.filter((event) =>
            event.name.toLowerCase().includes(text.toLowerCase().trim())
          )
        );
      } else {
        ////CASO 4
        filterArray.push(...finalArray); ///
      }

      if (filterArray.length > 0) {
        filterArray.forEach((event) => {
          printCards(event);
        });
      } else {
        cardConteiner.innerHTML = `<div class="cardConteiner mb-5">
  <div class="card" >
      <div class="card-img"> <img src="./assets/img/nef.webp" alt="Nofound" style="width: 100%;"></div>
      <div class="card-info">
        <p class="text-title">NO EVENTS FOUNDS  😔😔 </p>
        <p class="text-body"> </p>
      </div>
      </div>
  </div>`;
      }
    }
    filterinData();
  }
  ///////// -------------- CONDICIONAL DE EN QUÉ PÁGINA ESTOY -------------- //////
  function checkPage() {
    if (element.classList.contains("mainindex")) {
      console.log("Index =)");
      cardPrinterFinal(arrayIndex);
    } else if (element.classList.contains("mainupcoming")) {
      currentDate = 2021;
      console.log("Upcoming =)");
      cardPrinterFinal(arrayComing);
    } else if (element.classList.contains("mainpast")) {
      cardPrinterFinal(arrayPast);
      console.log("past =)");
    } else {
      getData();
      console.log("details =)");
    }
  }

  function getData() {
    ///////////Filtra el buscador por el ID ////////////
    const id = new URLSearchParams(location.search).get("id");
    console.log(id);
    data.events.find((event) => {
      if (event._id == id) {
        //////////////Entra a eventos y busca un evento y lo retorna según su ID//////////////////
        document.getElementById(
          "cardConteiner"
        ).innerHTML = `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="row-md-4">
    <img src="${event.image}" class="img-fluid rounded-start" alt="${
          event.name
        }">
    </div>
    <div>
    <div class="card-body">
    <h6 class="card-text">${event.date}</small></h6>
        <h4 class="card-title">${event.name}</h4>
        <h6 class="card-text">${event.description}</h6>
        <h6 class="card-text">Category: ${event.category}</small></h6>
        <h6 class="card-text">Place: ${event.place}</small></h6>
        <h6 class="card-text">Capacity: ${event.capacity} peoples</small></h6>
        <h6 class="card-text" id="keyArray"> ${Object.keys(event)[8]}: ${
          event.assistance || event.estimate
        } </small></h6>
        <div class="d-flex justify-content-around">
        <h6 class="card-text">Price: $${
          event.price
        } <button onclick="javascript:history.back()">Back</small></h6>
        </div>
        </div>
    </div>
  </div>
</div>`;
      }
    });
  }


    
};