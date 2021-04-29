async function populateMonuments(){
    console.log('data request');
    const monuRequest = await fetch('/api/monuments')
    const monuData = await monuRequest.json();

    monuData.data.forEach((monument) => {
        const appendItem = document.createElement("div");
        appendItem.classList.add("tile", "had-text-centered", "is-parent", "is-3");
        appendItem.innerHTML = `
        <article class = "tie is-child box has-background-link-dark ">
        <span class = "subtitle has-text-ight has-text-weight-bold">
        ${monument["Monument_name"]}</span>
        <br />
        <span class = "has-text-light">
        ${monument.Monument_address.split(",")[0]}</span>
        <br/>
        <span class = "has-text-light">
        ${monument["Monument_zip"]}</span>
        </article>`;
        targetBox.append(appendItem)
    });
} 
async function getMonuments(){
    console.log('data request');
    const monuRequest = await fetch ('/api/monuments');
    const monuData = await monuRequest.json();
    return monuData;
}
async function windowActions(){
    console.log('data request');
    const data = await getMonuments();
    console.table(data);
    }
window.onload = windowActions;