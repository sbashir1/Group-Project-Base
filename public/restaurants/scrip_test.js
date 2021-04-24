async function windowActions() {
    console.log('window loaded');
    const restaurantRequest = await fetch('/api/restaurant_info');
    const data = await restaurantRequest.json();

    const getTen = data.slice(0,10);

    const restaurant_list = document.querySelector('.content');

    getTen.forEach((item) => {
        console.log('display')
        const html = listArray.map(place => {
            const restName = place.restaurant_name;

            return `
            <div class="box1">
                <li>
                <div class="Rname">${restName}</div>
                ${place.restaurant_street}
                ${place.restaurant_town}
                ${place.restaurant_phone}<br>
                ${place.restaurant_email}<br>
                </li>
            </div>
            `;
        }).join('');
        restaurant_list.innerHTML = html;
    });
}

window.onload = windowsActions;