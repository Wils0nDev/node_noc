import 'dotenv/config'
import 'env-var'

import { Server } from './presentation/server';
import { envs } from './config/envs.plugin';
import {  MongoDataBase } from './data/mongo';

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

    

   Server.start();
}