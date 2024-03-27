import 'reflect-metadata';
import appSetup from './app/config/app.setup';
import envSetup from './app/config/dotenv.setup';

const PORT = envSetup.getNumberEnv('PORT');
const HOST = envSetup.getEnviroment('HOST');

async function serverBootstrap() {
  const app = await appSetup();
  app.listen(PORT, HOST);
}

serverBootstrap().then(() => {
  console.log(`
        [server]: Server is running at http://${HOST}:${PORT}
  `);
});
