require('dotenv').config();

const express = require('express');

const app = express();

const sequelize = require('./util/database');

const operationRoutes = require('./routes/operation-routes');


//Importamos nuestro modelo de operaciones

const Operation = require('./models/operation');

app.use(express.json());

//Configuramos CORS para compartir datos entre back-end y front-end

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
                  'Origin, X-Requested-With, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods',
                 'GET, POST, PUT, DELETE');
    next();
})

//Importamos las rutas de las operaciones donde y declaramos la ruta principal

app.use('/api/operation', operationRoutes);

/* Utilizamos el puerto configurado en nuestra variable de entorno
y sincronizamos la base de datos con el metodo de sequelize sync */

app.listen(process.env.PORT, function(){

    sequelize.sync()
    .then(()=>{
        console.log('We´re connected to the database');
    })
    .catch(error =>{
        console.log('An error ocurred', error);
    })
});
