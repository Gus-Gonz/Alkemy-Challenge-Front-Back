
const lastOperationsBalance = (o) => {

   let entry = o.filter(o => o.type==='Ingreso');
   let egress = o.filter(o => o.type==='Egreso');
   
   const totalEntry = entry.reduce((total, o) => total + o.amount, 0);
   const totalEgress = egress.reduce((total, o) => total + o.amount, 0);
          
    
    
    
   const totalBalance = totalEntry - totalEgress;
    
    return [totalEntry, totalEgress, totalBalance]

    
}

export default lastOperationsBalance;

