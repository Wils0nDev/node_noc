import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

//clase abstracta : no se puede instanciar, solo nos obliga a que otra clases tengan el comportamiento de la clase abstracta
export abstract class LogDataSource {
   
    abstract saveLog( log : LogEntity) : Promise<void>;
    abstract getLogs( severityLevel : LogSeverityLevel) : Promise<LogEntity[]>;
}