
interface CheckServiceUseCase { 
    execute(url:string) : Promise<boolean>
}

//genero dos collbacks para separar responsabilidades, mediante estos callbacks podre enviar los mensajes
//de success o errror al server.ts
type SuccessCallback = () => void;
type ErrorCallback = (error : string ) => void;

export class CheckService implements CheckServiceUseCase{
    //inyecto los callbacks que me enviaran los mensajes
    constructor(
        private readonly successCallback : SuccessCallback,
        private readonly errorCallback : ErrorCallback
    ){}
    public async execute(url: string): Promise<boolean> {
        
        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);   
            }
            this.successCallback()
            return true;
        } catch (error) {
            this.errorCallback(`${error}`)
        }
        return false;
    }
 

}

