#Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

1era Parte ----------------------------------

Temas puntuales de la sección
Esta sección empezaremos la creación del NOC, y puntualmente tocaremos temas como:



Introducción a la Arquitectura Limpia

Introducción a la inyección de dependencias (DI - Dependency injection)

JSON-Server

Casos de Uso

CRON Task - Tareas cronometradas

Esta sección cuenta con una explicación de cómo lograremos el objetivo de la creación de nuestro sistema de monitoreo de forma global, que a lo largo de las próximas secciones lo haremos funcionar.


2da Parte ----------------------------------
ARQUITECTURA LIMPIA
En esta sección trabajaremos con el patrón "Repository" para poder construir una forma intercambiable de orígenes de datos.

Puntualmente veremos:

Capa Presentacion : 



Capa Domain : en esta capa irán las reglas por las cuales se regira la apliación a un nivel muy alto
1 Entidades : Es el modelo de datos de nuestra aplicación, basicamente es lo que llegara a nuestra BD

2 DataSources : Contiene los orignes de datos, ejemplo:
                - File
                - MongoDB
                -PostgreSql, etc

3 Repositorios (Repository) : Es la forma en como nosotros mandaremos a llamar a nuestro dataSource, en pocas palabras este se conecta con el dataSource

4 Use Cases : Son reglas de negocios puntuales que hacen algo en especifico, ejemplo : enviar un correo, verificar si hubo un error en algun servico.
4 Clases Abstractas


Esquema : 
                     Use case ----> Repository ------> DataSource

Capa Infrastructure (data) : Ofrece implementaciones específicas para las interfaces presentadas en las capas de dominio, ejemplo
  - Implementación del datasource
  - Implementación del repository : aqui es donde se inyecta el datasource




Es una sección muy importante, especialmente por la configuración de variables de entorno, ya que esto es lo que permite cambiar la aplicación si estamos en producción, staging, testing o development.
