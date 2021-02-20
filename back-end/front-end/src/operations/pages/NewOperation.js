import React from 'react';
import Form from '../components/Form';

import './NewOperation.css';

const NewOperation = () => {
    return (
        <div className="new-operation">
            <Form update={false} />
        </div>
    )
}

export default NewOperation;