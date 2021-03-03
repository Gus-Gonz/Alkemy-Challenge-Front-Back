import React from 'react';
import {Link} from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import OperationItem from './OperationItem';


import './OperationList.css';




const OperationList = props => {

  
   
    if(props.items.length === 0){
    
        return (
            <div className="operation-list center">
                <Card>
                    <h2>No se encontraron operaciones, quieres crear una?</h2>
                    <button><Link to='/new'>Crear Operacion</Link></button>
                </Card>
                
            </div>
        );
    }

    return(<ul className="operation-list">
            {
                    props.items.map(operation => 
                    <OperationItem 
                        key={operation.id}
                        id={operation.id}
                        concept={operation.concept}
                        amount={operation.amount}
                        date={operation.date}
                        type={operation.type}
                        category={operation.category}
                        onDelete={props.onDeleteOperation}
                        onUpdate={props.onUpdateOperation}

                />)
            }
        </ul>
    )
}

export default OperationList;
