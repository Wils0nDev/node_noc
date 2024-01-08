import { envs } from "./envs.plugin";

 describe('envs.plugin.ts', () => {
    test('should return env options', () => {
         expect(envs).toEqual({
            PORT: 3001,
            PASSWORD: '123456',
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'ewilsonvc.dev@gmail.com',
            MAILER_SECRET_KEY: 'cpgnhhhpfoqgpbxs',  
            PROD: false,
            MONGO_URL: 'mongodb://wilsondev:123456789@localhost:27018',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'wilsondev',
            MONGO_PASS: '123456789'
           });

    });

     test('should return error if not found env', async() => {
        jest.resetModules();

        process.env.PORT = 'ABCD';
        try {
            await import('./envs.plugin');
            expect(true).toBe(false)
        } catch (error) {
           expect(`${error}`).toContain('"PORT" should be a valid integer')

        }
    });
});