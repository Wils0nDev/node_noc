import { LogEntity, LogSeverityLevel } from "./log.entity";

const dataObj = {
    message: "test-prueba",
    level: LogSeverityLevel.low,
    origin: "log.entity.test.ts",
}

describe('log.entity.ts', () => {
    test('should create a LogEntity instance', () => {

       
        const logData  = new LogEntity(dataObj);
        
        expect(logData.message).toBe(dataObj.message)
        expect(logData.level).toBe(dataObj.level)
        expect(logData.origin).toBe(dataObj.origin)
        expect(logData.createdAt).toBeInstanceOf(Date)
    });

    test('should create a LogEntity instance FromJson',  () => {
        
        const json = ` {
   
            "message": "test-message",
            "level": "low",
            "origin": "log.entity.test.ts",
            "createdAt":  "2024-01-07T14:55:56.421Z"
            }`
          
            const log =   LogEntity.fromJson(json)
            
            expect(log).toBeInstanceOf(LogEntity)
            expect(log.message).toBe('test-message')
            expect(log.level).toBe(LogSeverityLevel.low)
            expect(log.origin).toBe('log.entity.test.ts')
            expect(log.createdAt).toBeInstanceOf(Date)

           // const logEntity =  await LogEntity.fromObject(logs[0])


    });

    test('should create a LogEntity instance FromObject ', () => {
        
        const log =   LogEntity.fromObject(dataObj)
            
        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe('test-prueba')
        expect(log.level).toBe(LogSeverityLevel.low)
        expect(log.origin).toBe('log.entity.test.ts')
        expect(log.createdAt).toBeInstanceOf(Date)
    });
});