function onLoad(){
    console.log('script loaded');
}

app.route('/api')
    .get(async(req,res)=>{
        console.log('GET request detected');
        const data = await fetch('/http://localhost:3000/submitForm/submit.html');
        const json = await data.json();
        console.log('data from fetch', json);
        res.json(json)
    })

    .post(async(req, res)=>{
        console.log('POST request detected');
        console.log('Form data in res.body', req.body);
        console.log('Now send something back to your client');
        res.send('Hello World');
        res.send({data:dataToSendToFrontEnd})
    })

    
    

