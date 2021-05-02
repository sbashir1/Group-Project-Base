async function getRestaurants() {
    const restaurantRequest = await fetch('/api/restaurant_info');
    const Restdata = await restaurantRequest.json();
    return Restdata
}

async function windowActions() {
    console.log('window loaded');
    const results = await getRestaurants();
    const restInfo = results.data.slice(0,10);
    console.table(restInfo)

    const restList = document.querySelector('.restaurant_box');
    const html = restInfo.map(place => {
        console.log('display')

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
    console.log('search')
    const request = await fetch('/api/restaurant_info');
    const data = await request.json();

    function findMatches(wordToMatch, data){
        console.log('find matches')
        return data.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.restaurant_street.match(regex) || place.restaurant_name.match(regex);
            
        });
    };

    function displayMatches(event){
        console.log('display')
        const matchArray = findMatches(event.target.value, data);
        const html = matchArray.map(place => {
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
        evt.preventDefault()
        displayMatches(evt)
    });
}

window.onload = windowActions;



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