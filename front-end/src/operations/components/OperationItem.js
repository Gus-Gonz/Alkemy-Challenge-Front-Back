import React, { useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import deleteOperation from '../../helpers/deleteOperation';


import './OperationItem.css';
import Form from './Form';
import useForm from '../../hooks/useForm';



const OperationItem = props => {
  

    const [showUpdate, setShowUpdate]= useState(false);

    const [handleInputChange] = useForm({});
    

    const openUpdateHandler = () => setShowUpdate(true);

    const closeUpdateHandler = () => setShowUpdate(false);


    
    const confirmDeleteHandler = () =>{
        
       deleteOperation(props.id);
        
        props.onDelete(props.id);

    
}; 

const confirmUpdateHandler = (e) =>{
    
    props.onUpdate(props.id);
    closeUpdateHandler();
    
   window.location.reload();
    
    
}




return (
    <>
    <Modal show={showUpdate} 
            onCancel={closeUpdateHandler}
            header='Formulario' 
            contentClass="operation-item__modal-content"
            footerClass="operation-item__modal-actions"
            footer={<Button onClick={closeUpdateHandler}>Close</Button>}
        >
                
                <Form update={true}
                      id={props.id} 
                      concept={props.concept}
                      amount={props.amount}
                      date={props.date}
                      type={props.type}
                      category={props.category}
                      onChange={handleInputChange}
                      onUpdate={confirmUpdateHandler} 
                      onSubmit={confirmUpdateHandler}                  
                      
                />
               
            
     </Modal>
        <li className="operation-item">
        <Card className="operation-item__content">
            <div className="content-title">

                <h1>{props.type}</h1>

            </div>
            <div className="operation-item__info">
                    <h2>Concepto: {props.concept}</h2>
                    <h3>Monto: {props.amount}</h3>
                    <p>Fecha: {props.date}</p>
                    <p>Tipo: {props.type}</p>
                    <p>Categoria: {props.category}</p>
            </div>
            <div className="operation-item__actions">
                    <Button inverse onClick={openUpdateHandler}>Editar</Button>
                    <Button danger onClick={confirmDeleteHandler}>Borrar</Button>
            </div>
        </Card>
        </li>
    </>
    )
    
}

export default OperationItem;