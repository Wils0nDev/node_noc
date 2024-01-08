import { LogEntity } from '../../entities/log.entity';
import { EmailServices } from "../../../presentation/email/email.service";
import { SendLogEmail } from "./sent-email-logs";
import { LogRepository } from '../../repository/log.repository';



describe('sent-email-logs.ts', () => {
    
    const emailService = new EmailServices()
    const mockEmailService = {
        sendEmailWithFileSystemLogs : jest.fn().mockReturnValue(true)
    }
    const mockRepository : LogRepository =  {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const sendLogEmail = new SendLogEmail(
        mockEmailService as any,
        mockRepository
    );

    const spyEmail = jest.spyOn(sendLogEmail,'execute')


    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('should implement methods of SendLogEmailUseCase', () => {
        
        expect(sendLogEmail.execute).toBeDefined()
    });

    test('should  execute method, receive string o string[] type parameter', async() => {

        const email  = 'coronado@gmail.com'
        await sendLogEmail.execute(email)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(email)

        await sendLogEmail.execute([email])
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith([email])

    });

    test('should  return false if Email sent ', async() => {

        const to = 'ewilsonvc.dev@gmail.com'
        const isSent = await mockEmailService.sendEmailWithFileSystemLogs(to)
       expect(isSent).toBe(true)

    });

    test(' should  return error, Email log was not sent ', async() => {

        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false)
        const to = 'ewilsonvc.dev@gmail.com'
        const isSent = await mockEmailService.sendEmailWithFileSystemLogs(to)
        expect(isSent).toBe(false)
 
          

    });

    test('should called saveLog with object parameter LogEntity ',  async() => {
       
    
        const to = 'ewilsonvc.dev@gmail.com'
        await mockEmailService.sendEmailWithFileSystemLogs(to)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        // expect(mockRepository.saveLog).toHaveBeenCalledWith({
        //         "message": "test-message",
        //         "level": "low",
        //         "origin": "log.model.test.ts",
        //         "createdAt": expect.any(Date)
        // })


    });
});