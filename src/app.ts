import 'dotenv/config'
import 'env-var'

import { Server } from './presentation/server';
import { envs } from './config/envs.plugin';

//funcion asyncrona autoinvocada que llama a nuestro main
(async()=>{
    main();
})();

//main : llamamos a nuestro server que inicia toda la apliación
function main() {
    Server.start();
}