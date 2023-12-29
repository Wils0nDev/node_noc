import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
    constructor() {
        
    }

    //static : nos permite hacer referencia a la clase y metodo sin instanciarla
    public static start(){
        console.log('Server started....');
        CronService.createJob('*/5 * * * * *',()=>{
           //new CheckService().execute('https://google.com');
           const url = 'https://google.com'
           //aqui envio los callbacks q me retornaran los mensajes de succes o error
           new CheckService(
            ()=> console.log(`${url} is ok`),
            (error) => console.log(error)
           ).execute(url);
        });
       
       
       
    }


}