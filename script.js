(function () {
  "use strict";

  //clock

  document.addEventListener("DOMContentLoaded", function () {
    let c = document.getElementById("clock");

    //setTimeout(updateClock, 2000);
    setInterval(updateClock, 1000);

    function updateClock() {
      let date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let ampm = h >= 12 ? "pm" : "am";
      h = h % 12;
      // Kui kell on 0, siis kell peab näitama 12
      h = h ? h : 12;

      if (m < 10) {
        m = "0" + m;
      }

      if (s < 10) {
        s = "0" + s;
      }

      c.innerHTML = h + ":" + m + ":" + s + ampm;
    }
  });

  // forms

  document.getElementById("form").addEventListener("submit", estimateDelivery);

  let e = document.getElementById("delivery");
  e.innerHTML = "0,00 &euro;";

  const inputREGEX = /^[a-zA-Z ]+$/;

  function estimateDelivery(event) {
    event.preventDefault();

    let linn = document.getElementById("linn");
    let kingitus = document.getElementById("v1");
    let kontaktivaba = document.getElementById("v2");
    //console.log(linn.value);
    //console.log(kingitus.value);
    let v1 = kingitus.checked ? 5 : 0;
    let v2 = kontaktivaba.checked ? 1 : 0;

    let eesnimi = document.getElementById("fname").value;
    let perenimi = document.getElementById("lname").value;

    //Validate name inputs
    if (!inputREGEX.test(eesnimi)) {
      alert("Palun sisestage korrektne eesnimi");

      document.getElementById("fname").focus();

      return;
    } else if (!inputREGEX.test(perenimi)) {
      alert("Palun sisestage korrektne perenimi");

      document.getElementById("lname").focus();

      return;
    }

    //Validate radiobuttones
    if (
      !document.getElementById("jah").checked &&
      !document.getElementById("ei").checked
    ) {
      console.log("arve");
      alert("Palun valige kas te soovite arvet");
      return;
    }

    if (linn.value === "") {
      alert("Palun valige linn nimekirjast");

      linn.focus();

      return;
    } else if (linn.value === "tln") {
      let hind = v1 + v2;
      e.innerHTML = hind + "&euro;";
    } else if (linn.value === "trt" || linn.value === "nrv") {
      let hind = v1 + v2 + 2.5;
      e.innerHTML = hind + "&euro;";
    } else if (linn.value === "prn") {
      let hind = v1 + v2 + 3;
      e.innerHTML = hind + "&euro;";
    } else {
      e.innerHTML = "x,xx &euro;";
    }
    console.log("Tarne hind on arvutatud");
  }
})();

// map

let mapAPIKey =
  "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;
let infobox;

function GetMap() {
  "use strict";

  let centerPointUT = new Microsoft.Maps.Location(58.38104, 26.71992);
  let centerPointTyri = new Microsoft.Maps.Location(
    58.80657140651576,
    25.409647404967647
  );

  let x = (centerPointTyri.latitude + centerPointUT.latitude) / 2;
  let y = (centerPointTyri.longitude + centerPointUT.longitude) / 2;

  let kesk = new Microsoft.Maps.Location(x, y);

  map = new Microsoft.Maps.Map("#map", {
    credentials: mapAPIKey,
    center: kesk,
    zoom: 9,
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    disablePanning: true,
  });

  infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
    visible: false,
  });

  infobox.setMap(map);

  let pushpin = new Microsoft.Maps.Pushpin(centerPointUT);

  pushpin.metadata = {
    title: "Tartu Ülikool",
    description: "UT",
  };

  let pushpin2 = new Microsoft.Maps.Pushpin(centerPointTyri);

  pushpin2.metadata = {
    title: "Kevadpealinn Türi",
    description: "Minu kodulinn",
  };

  Microsoft.Maps.Events.addHandler(pushpin, "click", pushpinClicked);
  Microsoft.Maps.Events.addHandler(pushpin2, "click", pushpinClicked);

  map.entities.push(pushpin);
  map.entities.push(pushpin2);
}

function pushpinClicked(e) {
  //Make sure the infobox has metadata to display.
  console.log(e);
  if (e.target.metadata) {
    //Set the infobox options with the metadata of the pushpin.
    infobox.setOptions({
      location: e.target.getLocation(),
      title: e.target.metadata.title,
      description: e.target.metadata.description,
      visible: true,
    });
  }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
