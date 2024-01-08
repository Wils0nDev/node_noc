import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiples";
import { SendLogEmail } from "../domain/use-cases/email/sent-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostrgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailServices } from "./email/email.service";


//fileSystemLogRepository sera mi instancia de LogRepositoryImpl,
 //que es el que se encarga de implementar el LogRepository y a su vez este conecta con el LogDataSource
 //a travez de la inyeccion de dependencia
 //FileSystemDatasource es de tipo LogDataSource que nos crea los logs, esta sera la clase inyectada.
// const fileSystemLogRepository = new LogRepositoryImpl(
//     new FileSystemDatasource()
// )
const FsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)
//fileSystemLogRepository : ya trae todo lo necesario para crear los logs

const MongLogRepository = new LogRepositoryImpl(
    new MongoLogDataSource(),
 )

 const PosLogRepository = new LogRepositoryImpl(
   new PostrgresLogDataSource()
 )
const LogsRepository = [FsLogRepository,MongLogRepository,PosLogRepository]

//creamos nuestra instancia de nuestro servicio de email, para inyectarlo en nuestro caso de uso
const emailService = new EmailServices()


export class Server {
    constructor() {
        
    }

    //static : nos permite hacer referencia a la clase y metodo sin instanciarla
    public static async start(){
        console.log('Server started....');
        //Envio de correo con nuestro caso de uso
        // new SendLogEmail(
        //     emailService,
        //     LogRepository
        // ).execute(
        //     ['ewilsonvc.dev@gmail.com','coronadoew18@gmail.com']
        // )
       // emailService.sendEmailWithFileSystemLogs(['ewilsonvc.dev@gmail.com','coronadoew18@gmail.com'])
      

    //     const logs = await PosLogRepository.getLogs(LogSeverityLevel.high)
    //    console.log(logs)


    //--- Caso de uso de multiples log
    //CronJob para generar recgistros cada cierto tiempo
       CronService.createJob('*/5 * * * * *',()=>{
           //new CheckService().execute('https://google.com');
           const url = 'https://googleWEQWE.com'
           //aqui envio los callbacks q me retornaran los mensajes de succes o error
           new CheckServiceMultiple(
            LogsRepository,
            ()=> console.log(`${url} is ok`),
            (error) => console.log(error)
           ).execute(url);
        });

    //--- Caso de uso de un solo log
       //CronJob para generar recgistros cada cierto tiempo
    //    CronService.createJob('*/5 * * * * *',()=>{
    //        //new CheckService().execute('https://google.com');
    //        const url = 'https://googleWEQWE.com'
    //        //aqui envio los callbacks q me retornaran los mensajes de succes o error
    //        new CheckService(
    //         FsLogRepository,
    //         ()=> console.log(`${url} is ok`),
    //         (error) => console.log(error)
    //        ).execute(url);
    //     });
       
       
       
    }


}