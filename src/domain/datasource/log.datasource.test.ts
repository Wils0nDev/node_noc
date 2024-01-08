import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe('log.datasource.ts LogDataSource', () => {

    const logDate : LogEntity = new LogEntity({
        message: "test-prueba",
        level: LogSeverityLevel.low,
        origin: "log.datasource.test.ts",
    })
    class MookLogDataSource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return ;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return[logDate];
        }

    }

    test('should test the abstract class', async () => {
        
        const mockLogDataSource = new MookLogDataSource()
        expect(mockLogDataSource).toBeInstanceOf(MookLogDataSource)
        expect(mockLogDataSource).toHaveProperty('saveLog')

        //verificar si el motodo se llamo con parametros
        const spySave = jest.spyOn(mockLogDataSource, 'saveLog');
        await mockLogDataSource.saveLog(logDate)
        expect(spySave).toHaveBeenCalledWith(logDate)

        //verificamos si al menos tiene longitud de 1 
        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.low)
        expect(logs).toHaveLength(1);

        //verificamos si el objeto que obtenemos es de tipo LogEntity
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });
});