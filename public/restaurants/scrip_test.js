async function getRestaurants() {
  const restaurantRequest = await fetch('/api/restaurant_info');
  const Restdata = await restaurantRequest.json();
  return Restdata;
}
async function getAwards() {
  const awardsRequest = await fetch('/api/Awards');
  const Awardsdata = await awardsRequest.json();
  return Awardsdata;
}
async function windowActions() {
  console.log('window loaded');
  const results = await getRestaurants();
  const restInfo = results.data.slice(0, 10);
  console.table(restInfo);

  const restList = document.querySelector('.restaurant_box');
  const html = restInfo.map((place) => {
    console.log('display');

    const restName = place.restaurant_name;
    return `
        <div class="box1">  
            <ul>
                <li>
                    <div class="Rname">${restName}</div>
                    ${place.restaurant_street}
                    ${place.restaurant_town}
                    ${place.restaurant_zip}<br>
                    ${place.restaurant_phone}<br>
                    ${place.restaurant_email}<br>
                </li>
            </ul>
        </div>
        `;
  }).join('');
  restList.innerHTML = html;

  // For search bar
  console.log('search');
  const request = await fetch('/api/restaurant_info');
  const data = await request.json();

  function findMatches(wordToMatch, data) {
    console.log('find matches');
    return data.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.restaurant_street.match(regex) || place.restaurant_name.match(regex);
    });
  }

  function displayMatches(event) {
    console.log('display');
    const matchArray = findMatches(event.target.value, data);
    const html = matchArray.map((place) => {
      const restName = place.restaurant_name;

      return `
                <div class="box2">
                    <ul>
                        <li>
                            <div class="Rname">${restName}</div>
                            ${place.restaurant_street}
                            ${place.restaurant_town}
                            ${place.restaurant_zip}<br>
                            ${place.restaurant_phone}<br>
                            ${place.restaurant_email}<br>
                        </li>
                    </ul>
                </div>
            `;
    }).join('');
    suggestions.innerHTML = html;
  }
  const searchInput = document.querySelector('.userform');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {
    evt.preventDefault();
    displayMatches(evt);
  });
}
async function awardsActions() {
  const awardResults = await getAwards();
  console.table(awardResults);

  const awardList = document.querySelector('.awards-section');
  const html = awardResults.map((awar) => {
    console.log('display');
    return `
        <div class="box2">  
            <ul>
                <li>
                    ${awar.Awards_ID}<br>
                    ${awar.Award_name}<br>
                </li>
            </ul>
        </div>
        `;
  }).join('');
  awardList.innerHTML = html;
}

// Same search bar code from Home page
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

async function searchResults() {
  await restaurant();
  await monuments();
}

window.onload = searchResults;

//window.onload = windowActions;
//window.onload = awardsActions;

// PRACTICE STUFF BELOW HERE.

// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
// }

// const restArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const selectedRest = restArray.map((element) => {
//     const random = getRandomIntInclusive(0, restInfo.length -1);
//     return restInfo[random];
// });
// console.table(selectedRest)

// restInfo.forEach((place) => {
//     console.log('display')
//     const restList = document.querySelector('.restaurant_box')
//     const restli = document.createElement('ul')
//     const restName = place.restaurant_name;

//     const restaurant_list = `
//         <div class="box1">
//             <li>
//                 <div class="Rname">${restName}</div>
//                 ${place.restaurant_street}
//                 ${place.restaurant_town}
//                 ${place.restaurant_zip}<br>
//                 ${place.restaurant_phone}<br>
//                 ${place.restaurant_email}<br>
//             </li>
//         </div>
//         `;
//     restli.innerHTML = restaurant_list;
//     restList.append(restli);

// });