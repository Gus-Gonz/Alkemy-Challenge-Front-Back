const updateOperation = async (formValues, id) => {
    try{
        let config = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formValues)
        }
        await fetch(`http://localhost:5000/api/operation/${id}`, config);
        
    }catch(error){
        console.log(error);
    }
}

export default updateOperation;