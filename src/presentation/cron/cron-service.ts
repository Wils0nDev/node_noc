import { CronJob } from 'cron';

//type : me permite crear mi propio tipado de variable
type CronTime = string | Date //tipo cadena o fecha
type OnTick = () => void ; //tipo función que no retorna valor


export class CronService {
  
    public static createJob(cronTime : CronTime, onTick : OnTick ) : CronJob{
        const job = new CronJob(
            cronTime ,// cronTime
            onTick
        );
        job.start();
        return job;
    }
}