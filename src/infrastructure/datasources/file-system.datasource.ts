import fs from 'fs'
import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDataSource {

    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createdLogsFiles();
    }

    //creamos un metodo para crear los files
    private createdLogsFiles = () =>{
        //si no existe logpath
        if(!fs.existsSync(this.logPath)){
            //creamos el logs/
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        
        ].forEach(path=>{
            if(fs.existsSync(path)) return;
            fs.writeFileSync(path,'');
        })

        
    }

    async saveLog(newlog: LogEntity): Promise<void> {

        const logAsJoson = `${JSON.stringify(newlog)}\n`
        //appendFileSync : añade una linea al final del archivo
       fs.appendFileSync(this.allLogsPath, logAsJoson)
       
       if(newlog.level === LogSeverityLevel.low) return;
       if(newlog.level === LogSeverityLevel.medium){
        fs.appendFileSync(this.mediumLogsPath, logAsJoson)
       }else{
        fs.appendFileSync(this.highLogsPath, logAsJoson)
       }

       
    }

    //getLogsFromFile : obtenemos el log para convertirlo en un objeto LogEntity
    //este metodo es para no repetir código, principio  DRY
    private getLogsFromFile = (path:string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        )
        return logs;
    }

    //getLogs: metodo que retorna el log segun la severidad
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);           
            default:
                throw new Error(`${severityLevel} not implemented`);
                
        }
    }
   
}