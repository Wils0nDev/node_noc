import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from '@prisma/client';

const prisma = new PrismaClient();

const securityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostrgresLogDataSource implements LogDataSource {
    constructor() {
        
    }
    async saveLog(log: LogEntity): Promise<void> {
   
        const level = securityEnum[log.level]
        const newLog = await prisma.logModel.create({
            data:{
                ...log,
                level:level
            }
        })
        console.log('Posgres Save')
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        

        const level = securityEnum[severityLevel]
        const logs = await prisma.logModel.findMany({
            where : {
                level : level
            }
        })

        return logs.map((log)=>{
            return LogEntity.fromObject(log)
        })
    }
}