async function getMonuments() {
  console.log('data request');
  const monuRequest = await fetch('/api/monuments');
  const monuData = await monuRequest.json();
  return monuData;
}
async function windowActions() {
  console.log('data request');
  const monuInfo = await getMonuments();
  console.table(monuInfo);

  const monuList = document.querySelector('.box');
  const html = monuInfo.map((place) => {
    console.log('display');

    const monuName = place.Monument_name;
    return `
        
            <div class="box"> 
                <ul>
                    <li>
                        <div class="content">${monuName}<br>
                        ${place.Monument_address}<br>
                        ${place.Monument_zip}<br>
                        </div>
                    </li>
                </ul>
            </div>
        
        `;
  }).join('');
  monuList.innerHTML = html;
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
  
  async function searchResults() {
    await restaurant();
    await monuments();
  }
  
window.onload = searchResults;
window.onload = windowActions; 