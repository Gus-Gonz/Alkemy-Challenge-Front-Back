const createOperation = async (formValues) => {
    try{
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formValues)
        }
        await fetch('http://localhost:5000/api/operation', config);
        
    }catch(error){
        console.log(error);
    }
}

export default createOperation;