export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogOptionsEntity {
     message : string;
     level:LogSeverityLevel;
     origin : string;
     createdAt? : Date;

}

export class LogEntity {

    public message : string;
    public level:LogSeverityLevel;
    public createdAt? : Date;
    public origin : string; 
 
    constructor(
         options : LogOptionsEntity
    ) {
        const {message,
            level,
            createdAt,
            origin} = options

            this.message = message
            this.level =  level
            this.createdAt = createdAt
            this.origin = origin
     }

    //static , porq no queremos instanciar la clase para llamar al metodo
    //factory function
    //fromJson : crea y regresa una instancias basados en mi jsonstring
    static fromJson = (json:string):LogEntity =>{
      const {message, level, createdAt,origin}  = JSON.parse(json);
      const log = new LogEntity({message, level, createdAt,origin });
      return log
    }
}