import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';
describe('check-service.ts', () => {
    
    //jest.fn() Devuelve una función simulada nueva y no utilizada . 
        //Opcionalmente, se necesita una implementación simulada.
        const mockRepository = {
            saveLog: jest.fn(),
            getLogs: jest.fn(),
        }
        const successCallback = jest.fn()
        const errorCallback = jest.fn()

        const checkService = new CheckService(
            mockRepository,
            successCallback,
            errorCallback
        );

        beforeEach(()=>{
            jest.clearAllMocks();
        });

    test('should call successCallback when fetch return true ', async() => {

        

        //toBe : debe ser ...
        const wasOk = await checkService.execute('https://google.com.pe')
        expect(wasOk).toBe(true)
        //toHaveBeenCalled: verifica si la funcion() fue llamado, ejemplo successCallback
        expect(successCallback).toHaveBeenCalled()

        //not.toHaveBeenCalled :verifica si la funcion() no fue llamado, ejemplo errorCallback
        expect(errorCallback).not.toHaveBeenCalled()

        //verifica que el saveLog se tiene que llamara con la entidad de LogEntity
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    });
});