import 'reflect-metadata';
import appSetup from './app/config/app.setup';
import envSetup from './app/config/dotenv.setup';

const PORT = envSetup.getNumberEnv('PORT');
const HOST = envSetup.getEnviroment('HOST');

const app = appSetup();
console.log(PORT);

app.listen(PORT, HOST, () => {
  console.log(`
        [server]: Server is running at http://${HOST}:${PORT}
        `);
});
