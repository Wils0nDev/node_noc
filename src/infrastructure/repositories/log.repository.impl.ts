
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import {  LogRepository } from "../../domain/repository/log.repository";
import { LogDataSource } from '../../domain/datasource/log.datasource';

export class LogRepositoryImpl  implements LogRepository{

    //aqui inyectaremos a nuestro datasource 
    constructor(
        private readonly logDataSource: LogDataSource //<--- esto nos facilita a que podemos cambiar nuestro datasource por otro sin afectar el repository
    ){
        
    }
    async saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        return this.logDataSource.getLogs(severityLevel);
    }
   
}