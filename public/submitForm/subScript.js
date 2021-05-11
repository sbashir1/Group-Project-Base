// import express from 'express';
// const app = express();

// app.route('/submitForm/submit.html')
//   .get(async(req,res)=>{
//       console.log('GET request detected');
//       const data = await fetch('/http://localhost:3000/submitForm/submit.html');
//       const json = await data.json();
//       console.log('data from fetch', json);
//      res.json(json)
//  })
//
//  .post(async(req, res)=>{
//       console.log('POST request detected');
//       console.log('Form data in res.body', req.body);
//       console.log('Now send something back to your client');
//       res.send('Hello World');
//       res.send({data:dataToSendToFrontEnd})
//   })
//
// function onLoad(){
//      console.log('script loaded');
// }
async function myFunction() {
  alert("Submitted!");
}
async function restaurant() {
  console.log('Window loaded');
  const form = document.querySelector('.userform');
  const search = document.querySelector('#category');
  const restTargetList = document.querySelector('.restaurant-target-list');

  const restaurantRequest = await fetch('/api/restaurant_info');
  const monumentsRequest = await fetch('/api/monuments');
  const restaurantData = await restaurantRequest.json();
  const monumentsData = await monumentsRequest.json();

  form.addEventListener('keyup', async (event) => {
    event.preventDefault();
    console.log('submit fired');
    //  console.log(restaurantData.data);
    const restaurantD = restaurantData.data.filter(
      ((record) => record.restaurant_name.toUpperCase().includes(search.value.toUpperCase()))
    );
      //   console.log(restaurantD);
    const restaurantDisplay = restaurantD.reduce((unique, o) => {
      // eslint-disable-next-line max-len
      if (!unique.some((obj) => obj.restaurant_street === o.restaurant_street && obj.restaurant_email === o.restaurant_email && obj.restaurant_phone === o.restaurant_phone)) {
        unique.push(o);
      } return unique;
    }, []);
    while (restTargetList.firstChild) {
      restTargetList.removeChild(restTargetList.firstChild);
    }
    restaurantDisplay.forEach((item) => {
      restauranthtml = restaurantDisplay.map((place) => (`
                 <li>
                    <span class='Name'>${place.restaurant_name}</span>
                    <span class='Street'>${place.restaurant_street}</span>
                    <span class='Location'>${place.restaurant_town}, ${place.restaurant_zip}</span>
                    <span class='Phone'>${place.restaurant_phone}</span>
                    <span class='Email'>${place.restaurant_email}</span>
                  </li>
                `));
      //   console.log(restauranthtml);
      if (search.value.length === 0) { restauranthtml.length = 0; } else restauranthtml.length = 75;
      restTargetList.innerHTML = restauranthtml.join('');

      search.addEventListener('input', (event) => {
        console.log('input', event.target.value);
      });
    });
  });
}

async function monuments() {
  console.log('Window loaded');
  const form = document.querySelector('.userform');
  const search = document.querySelector('#category');
  const monuTargetList = document.querySelector('.monuments-target-list');

  const restaurantRequest = await fetch('/api/restaurant_info');
  const monumentsRequest = await fetch('/api/monuments');
  const restaurantData = await restaurantRequest.json();
  const monumentsData = await monumentsRequest.json();

  form.addEventListener('keyup', async (event) => {
    const monumentsD = monumentsData.filter(
      ((record) => record.Monument_name.toUpperCase().includes(search.value.toUpperCase()))
    );
    const monumentsDisplay = monumentsD.reduce((unique, o) => {
      // eslint-disable-next-line max-len
      if (!unique.some((obj) => obj.Monument_name === o.Monument_name && obj.Monument_address === o.Monument_address && obj.Monument_zip === o.Monument_zip)) {
        unique.push(o);
      } return unique;
    }, []);
    while (monuTargetList.firstChild) {
      monuTargetList.removeChild(monuTargetList.firstChild);
    }
    //   console.log(targetList);
    monumentsDisplay.forEach((item) => {
      monumentshtml = monumentsDisplay.map((place) => (`
               <li>
                  <span class='Name'>${place.Monument_name}</span>
                  <span class='Address'>${place.Monument_address}</span>
                  <span class='Zip'>${place.Monument_zip}</span>
                </li>
              `));
      // eslint-disable-next-line max-len
      if (search.value.length === 0) { monumentshtml.length = 0; } else monumentshtml.length = 75;
      monuTargetList.innerHTML = monumentshtml.join('');
    });
  });
}

async function newRecord() {
  const form = document.querySelector('#recordSubmit');
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const phone = document.querySelector('#phone');
  const street = document.querySelector('#street');
  const town = document.querySelector('#town');
  const zip = document.querySelector('#zip');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.info('submitted form', event.target);
    const post = await fetch('/api/restaurant_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        restaurant_name: name.value,
        restaurant_street: street.value,
        restaurant_zip: zip.value,
        restaurant_town: town.value,
        restaurant_phone: phone.value,
        restaurant_email: email.value,
      })
    });
    // console.log('resolved put request', put);
  });
}

async function getData() {
  const request = await fetch('/api/restaurant_info');
  const data = await request.json();
  return data.data;
}

async function handleButtonclick(event) {
  console.log('clicked button', event.target);
  console.log('button value', event.target.value);
  const name = document.querySelector('#name');
  //const email = document.querySelector('#email');
  //const phone = document.querySelector('#phone');
  //const street = document.querySelector('#street');
  //const town = document.querySelector('#town');
  //const zip = document.querySelector('#zip');
  const url = '/api/restaurant_info';
  const put = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      restaurant_name: name.value
      //restaurant_street: street.value,
      //restaurant_zip: zip.value,
      //restaurant_town: town.value,
      //restaurant_phone: phone.value,
      //restaurant_email: email.value,
      //restaurant_id: event.target.value
    })
  });
  console.log('received put request', put);
  const nameUpdate = await put.json();
  console.log(nameUpdate);
  event.target.innerText = nameUpdate.update;
}

async function loadData() {
  const restaurants = await getData();
  console.table(restaurants);
  console.log(restaurants);

  restaurants.forEach((restaurant) => {
    const target = document.querySelector('.restaurantTable');
    const button = document.createElement('button');
    const lineBr = document.createElement('br');
    button.innerText = restaurant.restaurant_name;
    target.append(button);
    target.append(lineBr);
    button.addEventListener('click', (event) => {handleButtonclick(event)})
  })
}

async function searchResults() {
  await restaurant();
  await monuments();
  await newRecord();
  await getData();
  await loadData();
}

window.onload = searchResults;