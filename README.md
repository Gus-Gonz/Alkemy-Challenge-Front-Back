# Alkemy-Challenge
NodeJs ReactJs

# Instalación del package.json antes de comenzar

Para iniciar nuestro server, primero instalamos las dependencias desde la carpeta back-end con npm install, luego instalamos las dependencias del front-end que se
encuentran en la carpeta back-end/front-end también con el comando npm install

# Asegurarse de tener instalado MySql en la máquina para poder trabajar con la base de datos  

# El front de React correra en el puerto 3000 por defecto y el del back-end NodeJs Express en el puerto 5000

# Variables de entorno del back-end

luego vamos a necesitar agregar un archivo .env en la raiz de la carpeta back-end que manejara las variables de entorno de nuestro proyecto
y en el declaramos las siguientes, que nuestro back-end utilizara para correr en el puerto 5000 y para configurar
la conección con la base de datos mysql (que previamente debemos crear con un nombre, usuario y contraseña para luego poder conectarnos desde NodeJs)

PORT=5000 // Puerto donde correra la aplicación

NAME_DB= //Nombre de la base de datos mysql creada

USER_DB= //Usuario de la base de datos creada

PASSWORD_DB= //Contraseña del usuario de la base de datos crada

# Una vez configurado e instalado todas las dependencias corremos tanto el back como el front con el siguiente único comando que ejecutara ambos simultaneamente
npm run dev // desde la carpeta back-end
