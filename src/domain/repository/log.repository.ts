import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//LogRepository: nos permitira llamar metodos que se encuentran dentro del DataSource
export abstract class LogRepository {
    abstract saveLog( log : LogEntity) : Promise<void>;
    abstract getLogs( severityLevel : LogSeverityLevel) : Promise<LogEntity[]>;
}