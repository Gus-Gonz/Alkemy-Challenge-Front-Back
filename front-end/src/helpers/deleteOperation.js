const deleteOperation =  async (id) => {
   await fetch(`http://localhost:5000/api/operation/${id}`, {
     method: 'DELETE', 
     headers: {
      'Content-type': 'application/json; charset=UTF-8' 
     }});
 }

 export default deleteOperation;
