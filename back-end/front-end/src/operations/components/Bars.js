import React from 'react';
import {Bar} from 'react-chartjs-2';
const Bars = (props) => {
    
    const data = {
        labels: ['Ingresos', 'Egresos', 'Balance'],
        datasets:[{
            label: 'Balance de Operaciones',
            backgroundColor: 'cyan',
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: 'lightblue',
            hoverBorderColor: 'blueviolet',
            data:props.data
        }]
    };

    const config={
        mainteanceAspectRatio: false,
        responsive: true
    };
    return (
        <div style={{width: '70%'}}>
            <Bar data={data} options={config} />
        </div>
    )
}

export default Bars;
