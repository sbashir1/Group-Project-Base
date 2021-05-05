async function windowActions(){
    console.log('loaded window');

    const form = document.querySelector('#recordSumbit')
    const name = document.querySelector('#Monument_name')
    form.addEventListener('submit', async(event)=> {
        event.preventDefault();
        console.info("Form Submited", event.target);
        //const formData = 
        const post = await fetch('/api/monuments',{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({Monument_name: name.value})
        })
    })
}