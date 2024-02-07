#  CONFIGURACIONES 

## Obtener Gmail Key 

- Activar **Verificacion en dos pasos**
- Google AppPasswords : Crear una contraseña de aplicacion
[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords?rapt=AEjHL4MZMyQSPzAAL6obJ6Xhuj9ydPxOzpvX4rfPc6sJYMsBN3VcEXJ32kVUpMoUtly6sO_IYvNOcDmsQVj1ZNlT3AaTNfvuTCiM1aiw52dRSCzYoot1h-k)

## Dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando npm install
4. Levantar las bases de datos con el comando
 ```
 docker compose up -d
 ```

5. Ejecutar el comando para migrar prisma
  ```
  npx prisma migrate dev
  ```
   
6. Ejecutar
  ```
   npm run dev
  ```

7. Para testing Ejecutar 
   ````
   npm run test
   ```` 
7. Para mantener corriendo el testing Ejecutar 
   ````
   npm run test:watch
   ```` 
8. Para generar archivo coverage  
  ````
   npm run test:coverage
   ```` 

## ENV
  **Configurar para envio de correo**
  - MAILER_EMAIL=tucorreo@gmail.com
  - MAILER_SECRET_KEY=llave_que_creaste_en_apppasswords
  - SEEND_EMAIL=true -> para enviar correo

# EXPLICACIÓN DE LA APLICACION
## NOC

- Es un pequeño sistema de monitoreo que nos permitira hacer seguimiento de nuestros servicios a travez de logs de .
Y si algo falla la aplicación te notificara a travez de un correo.

- Esta aplicación se ejecutara en un intervalo de tiempo configurado (CRON Task - Tareas cronometradas)

- Los Logs generados se podran guardaran en diferentes datasources o destinos de alojamiento
   - FileSystem
   - MongoDB
   - PostgreSQL


## Clean Architecture

Para esto aplicación haremos uso de Clean Architecture, en el cual veremos los siguientes puntos

CAPAS : 
  - Domain
  - Presentation
  - InfraEstructure

Puntos
  - Entidades
  - Casos de uso
  - Patro Repository
  - Data source
  - Inyección de dependencias

## BASE DE DATOS Y ORM
 - Para este proyecto haremos uso de 
   - PostgreSQL -> Prisma ORM
   - MongoDB -> Mongoose

## TESTING 

- Testaremos nuestra aplicación haciendo uso de 
  - Jest
  - En cada directorio se podrá encontra un archivo de 'test'


## CONECEPTOS DE ARQUITECTURA LIMPIA

Puntualmente veremos:

La capa de infraestructura : Implementará interfaces desde la capa de aplicación para proporcionar funcionalidad para acceder a sistemas externos. Estos estarán conectados al contenedor de IoC, generalmente en la capa de presentación.

   - repositories : 
          - Implementa el patron Repository 
          - Es la forma en como nosotros mandaremos a llamar a nuestro dataSource, en pocas palabras este se conecta con el dataSource
   - datasources : 
          - Implementa las distintas maneras de alojar nuestros logs 
          - Aqui haremos uso de nuesto de las diferentes BD

La capa de presentación : generalmente tendrá una referencia a la capa de infraestructura , pero solo para registrar las dependencias con el contenedor de IoC. 
  
  - Referencia al datasource : Esto quiere decir que instanciaremos cada uno de nuestros datasources para posteriore mente inyectatlo en nustro repositorio
                                    - FileSystem
                                    - MongoDB
                                    - PostgreSQL

  - Implementación del patron repository : aqui es donde se inyecta el datasource
     - El patrón repository es un patrón de diseño para ubicar el acceso a datos en la capa externa de la aplicación y así mantener el dominio agnóstico a sus fuentes de datos (y sobre todo a su implementación).


Capa Presentacion : La capa de presentación es el punto de entrada al sistema desde el punto de vista del usuario. Sus principales preocupaciones son enrutar solicitudes a la capa de aplicación y registrar todas las dependencias en el contenedor de IoC. 
                          - Controladores MVC
                          - Controladores API web
                          - Arrogancia / NSwag
                          - Autenticación/Autorización

Capa Domain : La capa de dominio es el corazón de su aplicación y responsable de sus modelos principales. Los modelos deben ignorar la persistencia y encapsular la lógica siempre que sea posible. 

            - Domain Layer
            - Entities
            - Value Objects
            - Aggregates (if doing DDD)
            - Enumerations

    Lo que usaremos: 
    1 Entidades : Es el modelo de datos de nuestra aplicación, basicamente es lo que llegara a nuestra BD

    2 DataSources : Contiene las reglas de los orignes de datos, ejemplo:

    3 Repository : Contiene las reglas de del patron repository

    4 Casos de uso : contienen las reglas del negocio puntuales que hacen algo en especifico, ejemplo : enviar un correo, verificar si hubo un error en algun servico.

  
