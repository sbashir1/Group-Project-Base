async function getMonuments(){
    console.log('data request');
    const monuRequest = await fetch ('/api/monuments');
    const monuData = await monuRequest.json();
    return monuData;
}
async function windowActions(){
    console.log('data request');
    const monuInfo = await getMonuments();
    console.table(monuInfo);

    const monuList = document.querySelector('.box');
    const html = monuInfo.map(place => {
        console.log('display')

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
window.onload = windowActions;