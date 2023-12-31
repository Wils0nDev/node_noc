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
    public createdAt : Date;
    public origin : string; 
 
    constructor(
         options : LogOptionsEntity
    ) {
        const {message,
            level,
            createdAt = new Date(),
            origin} = options

            this.message = message
            this.level =  level
            this.createdAt = createdAt
            this.origin = origin
     }

    //static , porq no queremos instanciar la clase para llamar al metodo
    //factory function
    //fromJson : crea y regresa una instancias basados en mi jsonstring
    static fromJson = (json:string = ''):LogEntity =>{
      json = (json === '') ? '{}' : json;
      const {message, level, createdAt,origin}  = JSON.parse(json);
      const log = new LogEntity({
        message,
         level, 
         createdAt: new Date(createdAt),
         origin });
      return log
    }

    //fromObject : recibe un objeto y retorna una instancia de tipo LogEntity
    static fromObject = ( object : {[key:string]:any}) : LogEntity=> {
        const { message,level,createdAt, origin } = object;
        const log = new LogEntity({
            message,level,createdAt,origin
        })
        return log;
    }
}