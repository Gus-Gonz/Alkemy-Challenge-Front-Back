
import React, {useState, useEffect, useContext}from 'react';
import OperationContext from '../components/OperationContext';

import OperationList from '../components/OperationList';


const Operations = () => {
    const {operationValue } = useContext(OperationContext);
    const [loadedOperations, setLoadedOperations] = useState();
    const [isLoading, setIsLoading] = useState(true);

    

    useEffect(() => {
        const fetchOperation = async () => {
            try{
                const data = await fetch('http://localhost:5000/api/operation');
                const responseData = await data.json();
                setLoadedOperations(responseData.operation);
                setIsLoading(false);
            }catch(err){}
        };
        fetchOperation();
    },[isLoading]);
    
    const operationDeleteHandler = deleteOperationId =>{
        setLoadedOperations( prevOperation => 
            prevOperation.filter(o=> o.id !== deleteOperationId)
            );
    };

    
    const operationUpdateHandler =  () => {
        
        setLoadedOperations(
            loadedOperations.map((o)=>{
               
            return o.id === operationValue.id ?
            {
                ...operationValue
                
            } : o;
        }
        ))
    };

    
            
        return (<>
            {
                isLoading && <h1>Cargando</h1>
            }
            {
                !isLoading && loadedOperations &&
            
            <OperationList items={loadedOperations} 
            onDeleteOperation={operationDeleteHandler}
            onUpdateOperation={operationUpdateHandler}
            >
     
            </OperationList>}
        </>)
  

}

export default Operations;