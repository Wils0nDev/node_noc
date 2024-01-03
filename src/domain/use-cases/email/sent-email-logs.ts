import { LogRepository } from "../../repository/log.repository";
import { EmailServices } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";

interface SendLogEmailUseCase {
    execute : (to:string | string []) => Promise<boolean>;
}


export class SendLogEmail implements SendLogEmailUseCase {
    constructor(
        private readonly emailServices : EmailServices,
        private readonly logRepository: LogRepository,
    ) {     
    }
    async execute(to: string | string[]) {

      try {
          const isSent = await this.emailServices.sendEmailWithFileSystemLogs(to)
          if(!isSent){
            throw new Error("Email log was not sent");
          }
          const log = new LogEntity({
            level : LogSeverityLevel.low,
            message: `Log email sent`,
            origin: '`send-email-logs.service.ts'
        });
        this.logRepository.saveLog(log)
          return true;
      } catch (error) {
        const log = new LogEntity({
            level : LogSeverityLevel.high,
            message: `${error}`,
            origin: '`send-email-logs.service.ts'
        });
        this.logRepository.saveLog(log)
        return false;
    }
}
}