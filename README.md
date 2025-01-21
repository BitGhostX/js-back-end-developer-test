# JavaScript Back End Developer Test

El código fuente se encuentra en el directorio `backend`.

### Ejecución

Para ejecutar este proyecto utilizando [Docker] solo debe ejecutar el comando en la raíz:
```bash
docker compose up -d
```

_Se utiliza el puerto `3000`, revisar que no se encuentra ya en uso para evitar conflictos al intentar levantar el servicio._

Se puede utilizar el `API` con la siguiente url:
```
http://localhost:3000/api/v1
```

### Documentación con [Swagger]

Para leer la documentación del API en formato web, acceder desde su navegador a la URL:
```
http://localhost:3000/api/docs
```

## JWT

Todos los `endpoints` del `API` se encuentran protegidos con un `token`, para ello es necesario definir en el `header` lo siguiente:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJKb25hdGhhbiBBcmFuY2liaWEiLCJpYXQiOjE3ODk4MDk3MTh9.oU53fWEot-DDTsAFTI1xBjpKjk0HiIK_FAF-YMqcXJc
```

_Este `token` es estático y sólo es para própositos del challenge_

### Postman

En el repositorio puede encontrar el directorio `postman` y dentro está el archivo `Back End Challenge.postman_collection.json`. El cual puede importar en `Postman` para probar los distintos endpoints del `API`.

### Tech

- [nodejs] v16 - Evented I/O
- [nestjs] - Node.js Framework
- [mongoose] - MongoDB ODM
- [passport-jwt] - Passport Strategy for JWT Auth
- [jwt] - JSON Web Tokens
- [swagger] - UI API Documentation
- [mongodb] - MongoDB Database

[nodejs]: <https://nodejs.org/>
[nestjs]: <https://nestjs.com/>
[passport-jwt]: <https://www.passportjs.org/packages/passport-jwt/>
[jwt]: <https://jwt.io/>
[swagger]: <https://swagger.io/tools/swagger-ui/>
[mongoose]: <https://mongoosejs.com/>
[mongodb]: <https://www.mongodb.com/>