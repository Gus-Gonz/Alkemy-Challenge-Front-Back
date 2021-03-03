import React from 'react';
import {Link} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Card from '../../shared/components/UIElements/Card';
import lastOperationsBalance from '../../helpers/lastOperationsBalance';
import Bars from '../components/Bars';

const Home = () => {

    const {data, loading} = useFetch('http://localhost:5000/api/operation/last-ten');
    let balance;
    if(!loading && data){
        balance = lastOperationsBalance(data.operation)
        
        if(data.operation.length === 0){
    
            return (
                <div className="operation-list center">
                    <Card>
                        <h2>No se encontraron operaciones, quieres crear una?</h2>
                        <button><Link to='/new'>Crear Operacion</Link></button>
                    </Card>
                    
                </div>
            );
        }
            
    }
    

    return(<> <li className="operation-list">
                <Card className="operation-item__content" style={{textAlign: "center"}}><>
                            <h2 >Balance de Operaciones</h2>
                            <Bars data={balance}/>
                            { balance && <>
                            <h2>Balance: {balance[2]}</h2>
                            <h3>Ingresos: {balance[0]}</h3>
                            <h3>Egresos: {balance[1]}</h3></>
                            }
                    </> </Card></li>
            <ul className="operation-list">
            { loading && <h1> Cargando ...</h1> }

            {!loading && data &&
                
                data.operation.map(o => (
                 <li key={o.id} className="operation-item">
                        <Card className="operation-item__content">
                            <div className="content-title">

                                <h1>{o.type}</h1>

                            </div>
                            <div className="operation-item__info">
                                    <h2>Concepto: {o.concept}</h2>
                                    <h3>Monto: {o.amount}</h3>
                                    <p>Fecha: {o.date}</p>
                                    <p>Tipo: {o.type}</p>
                                    <p>Categoria: {o.category}</p>
                            </div>
                        </Card>
                </li>)
            )}
                </ul>
        </>)
    
            
    
}


export default Home;
