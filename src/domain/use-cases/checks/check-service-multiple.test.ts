import { CheckServiceMultiple } from "./check-service-multiples";
import { LogEntity } from '../../entities/log.entity';

describe('check-service-multiple.test.ts', () => {
            const mockRepository1 = 
            {
                saveLog: jest.fn(),
                getLogs: jest.fn(),
            }
            const mockRepository2 = 
            {
                saveLog: jest.fn(),
                getLogs: jest.fn(),
            }
            const mockRepository3 = 
            {
                saveLog: jest.fn(),
                getLogs: jest.fn(),
            }
        
        const successCallback = jest.fn()
        const errorsCallback = jest.fn()

        const checkServiceMulti = new CheckServiceMultiple(
            [mockRepository1,mockRepository2,mockRepository3],
            successCallback,
            errorsCallback
        );

        beforeEach(()=>{
            jest.clearAllMocks();
        });
        
    test('should call successCallback when fetch return true ', async() => {
        

        const wasOk = await checkServiceMulti.execute('https://google.com.pe')
        expect(wasOk).toBe(true)

        //toHaveBeenCalled: verifica si la funcion() fue llamado, ejemplo successCallback
        expect(successCallback).toHaveBeenCalled()

        //not.toHaveBeenCalled :verifica si la funcion() no fue llamado, ejemplo errorCallback
        expect(errorsCallback).not.toHaveBeenCalled()


        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    });

    test('should call errorCallback when fetch return false ', async() => {
        
        
        const wasOk = await checkServiceMulti.execute('https://ewqqwewqewqewq.com')
        expect(wasOk).toBe(false)

        const successCallbacks = jest.fn()

        expect( successCallbacks ).not.toHaveBeenCalled();
        expect( errorsCallback ).toHaveBeenCalled();


        expect(mockRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    });
});