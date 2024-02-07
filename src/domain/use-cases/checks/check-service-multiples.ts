import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';


//* Este caso de uso me servira para  verificar si hubo algun error en la llamada de algun servicio
//* y hará uso del LogRepository para grabar los logs, por ultimo retornara mensajes de succes o error mendiante
//* 2 funciones callback 



interface CheckServiceUseCase { 
    execute(url:string) : Promise<boolean>
}


//* genero dos collbacks para separar responsabilidades, mediante estos callbacks podre enviar los mensajes
//* de success o errror al server.ts
type SuccessCallback = () => void;
type ErrorCallback = (error : string ) => void;

export class CheckServiceMultiple implements CheckServiceUseCase{
    //* inyecto los callbacks que me enviaran los mensajes
    //* aqui tmb inyectamos a nuestro repositorio que llamara a nuestro datasource
    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback : SuccessCallback,
        private readonly errorCallback : ErrorCallback
    ){}

    private async executeMultiple(log: LogEntity): Promise<boolean> {

        
            this.logRepository.forEach((logRepo:LogRepository) => {
                logRepo.saveLog(log)
            });
            
            this.successCallback();

            return true;
       

    }

    public async execute(url: string): Promise<boolean> {
        
        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);   
            }
            const log = new LogEntity({

                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                createdAt: new Date(), 
                origin : 'check-service.ts'
            })
            this.executeMultiple(log)
            this.successCallback();

            return true;
        } catch (error) {
            const errorMessage = `${url} is not ok. ${error}`
            const log = new LogEntity( {

                message: `Service ${url} working`,
                level: LogSeverityLevel.high,
                createdAt: new Date(), 
                origin : 'check-service.ts'
            });
            this.executeMultiple(log)
            this.errorCallback(errorMessage)
            return false;
        }
    }
 

}

