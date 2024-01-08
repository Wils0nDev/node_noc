import 'dotenv/config'
import 'env-var'

import { Server } from './presentation/server';
import { envs } from './config/envs.plugin';
import { LogModel, MongoDataBase } from './data/mongo';
import { PrismaClient } from '@prisma/client';

//funcion asyncrona autoinvocada que llama a nuestro main
(async()=>{
    main();
})();

//main : llamamos a nuestro server que inicia toda la apliación
async function main() {
    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName : envs.MONGO_DB_NAME
    });

    // const prisma = new PrismaClient()
    // const newLog = await prisma.logModel.create({
    //     data:{
    //         level:'HIGH',
    //         message:'Test message',
    //         origin:'Appt.ts'
    //     }
    // })

    // const logs = await prisma.logModel.findMany({
    //     where:{
    //         level:'LOW'
    //     }
    // })

    // console.log(logs)

    //--- ESTA PARTE ES SIN DATASOURCE -----//
    //Crear registros en mongodb
    //coleccion = tablas, documento = registro

    // const newLog = await LogModel.create({
    //     message: 'Test message desde Mongo',
    //     origin : 'App.ts',
    //     level : 'low',  
    // });
    //await newLog.save();
    //console.log(newLog)
    //leer los registros
    // const logs =  await LogModel.find();
    // console.log(logs)
 ///-------------------------------

   Server.start();
}