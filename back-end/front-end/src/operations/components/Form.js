import React, { useContext} from 'react';
import createOperation from '../../helpers/createOperation';
import updateOperation from '../../helpers/updateOperation';
import OperationContext from './OperationContext';
import  useForm  from '../../hooks/useForm';
import './Form.css';


const Form = (props) => {
    const {setOperationValue} = useContext(OperationContext);
    
    const maxDate = new Date().toISOString().split("T")[0];
    
    const {update}=props;
    
    
    let initialValues;

    if(!props.update){
        initialValues ={
            concept: '',
            amount:'',
            date:'',
            type:'',
            category: ''
          };
    } else{
        initialValues = {
            concept: props.concept,
            amount:props.amount,
            date:props.date,
            type:props.type,
            category: props.category
        }
        
    }
        const [formValues, handleInputChange, reset] = useForm(initialValues);
      
        const {concept, amount, date, type, category} = formValues;
        
        
          const handleSubmit =  (e) =>{
            e.preventDefault();
            if(!update){
                
             createOperation(formValues);
             reset(initialValues);
            }else{
                
                 updateOperation(formValues, props.id);
            
                 setOperationValue(formValues);
                
                
            }

             
          }
         
         
          return (
          <>
            <div className="form-flex-container">
            <div className="main-container">
               <div className="container">
                <form onSubmit={handleSubmit} className="operation-form">
                
                   <p className="title-text">{update ? 'Editar Operacion' : 'Nueva Operación'}</p>
                   <div className="input-group">
                       <label>Concepto: </label>
                       <input name="concept" type="text" value={concept} onChange={handleInputChange} required />
                    </div>
                    <div className="input-group">
                   <label>Monto: </label>
                   <input name="amount" type="number" value={amount} onChange={handleInputChange} required/>
               </div>
               <div className="input-group">    
               <label>Fecha: </label>
               { update ? <input name="date" type="date" value={date} onChange={handleInputChange} max={maxDate} required/> :
                   <input name="date" type="date" value={date} onChange={handleInputChange} max={maxDate} required/>
               }
               </div>
               {
               !update && (
               <div className="input-group">
                   <label>Tipo: </label>
                   <select name="type" value={type} onChange={handleInputChange} required>
                       <option value="">Elige una opción</option>
                       <option>Ingreso</option>
                       <option>Egreso</option>
                   </select>
               </div>)
               }
               <div className="input-group">
                   <label>Categoria</label>
                   <select name="category" value={category} onChange={handleInputChange} required>
                       <option value="">Elige una opción</option>
                       <option>Belleza</option>
                       <option>Comida</option>
                       <option>Electronicos</option>
                       <option>Entretenemiento</option>
                       <option>Hogar</option>
                       <option>Otros</option>
                       <option>Salud</option>
                       <option>Sueldo</option>
                       <option>Tecnologia</option>
                       <option>Ventas</option>
                       <option>Viajes</option>            
                    </select>
               </div>
               <div className="input-group">
                { update ?  (<button onClick= {props.onUpdate} onSubmit={handleSubmit} className="btn" type="submit">Editar</button>) :
                    <button className="btn" >Añadir</button>
                }
                </div>
               </form>
           </div>
           </div>
           </div>
           </>
           )
  
}
   export default Form;