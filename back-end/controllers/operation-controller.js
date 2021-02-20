const HttpError = require('../models/http-errors');

const Operation = require('../models/operation');

const sequelize = require('../util/database');

const getOperations = async(req, res, next)=>{
    const operation = await Operation.findAll({
        attributes:['id', 'concept', 'amount', 'date', 'type', 'category']
    });

    if(!operation){
        throw new HttpError('Could not find any operation', 404);
    }
    res.json({
        operation
    });
}

const getLastTenOperations = async(req, res, next)=>{
    const operation = await Operation.findAll({
        attributes:['id', 'concept', 'amount', 'date', 'type', 'category'],
        order:[['date', 'DESC']],
        limit: 10
    });

    if(!operation){
        throw new HttpError('Could not find any operation', 404);
    }

    res.json({
        operation
    });
}

const getOperationsByType = async(req, res, next)=>{
    
    const typeParams = req.params.type;
    const operation = await Operation.findAll({
        attributes: ['concept', 'amount', 'date', 'type', 'category'],
        where: {type: typeParams}
    });
    if(!operation){
        throw new HttpError('Could not find any operation', 404)
    }
    res.json({
        operation
    })
}

const createOperation = async(req, res, next)=>{
    const {concept, amount, date, type, category} = req.body;

    const createdOperation = await Operation.create({
        concept,
        amount,
        date,
        type,
        category
    })
    .then(createdOperation =>{
        res.json({
            ok: true,
            createdOperation
        })

    }).catch(error => res.status(404).json({error}));

}

const updateOperation = async(req, res, next)=>{
    const operationId = req.params.oid;
    const {concept, amount, date, category} = req.body;

    await Operation.update({
        concept,
        amount,
        date,
        category
    }, {where:{id:operationId}}
    ).then(code =>{
       if(code[0]===0){
        res.status(404).json({
            ok: false,
            message:'Couldn´t update the operation, verify the id '
        });
       }else{
        res.json({
            ok: true,
            message:'Operation updated succefully!'
        })}
        
    })
    .catch(error => 
    res.status(500).json({error}));
}

const deleteOperation = async(req, res, next) =>{

    const operationId = req.params.oid;

    await Operation.destroy({
        where:{id: operationId}
    })
    .then(code =>{
        if(code===0){
            res.status(404).json({
                ok: false,
                message:'Couldn´t delete the selected operation, verify the id '
            });
           }else{
            res.json({
                ok: true,
                message:'Operation deleted succefully!'
            })}
            console.log(code);
    })
    .catch(error => {
        res.status(404).json({
            ok: false,
            error
        })
    });
}


exports.getOperations = getOperations;
exports.createOperation = createOperation;
exports.updateOperation = updateOperation;
exports.deleteOperation = deleteOperation;
exports.getOperationsByType = getOperationsByType;
exports.getLastTenOperations = getLastTenOperations;