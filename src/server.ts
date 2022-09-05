import app from './app';
import 'dotenv/config';
import AppDataSource from './data-source';

const init = async () => {
  const PORT = process.env.PORT || 3000;

  // --> Precisamos definir as variáveis do .env para inicializar a conexão com o AppDataSource

  //   await AppDataSource.initialize()
  //     .then(() => {
  //       console.log('Data Source initialized');
  //     })
  //     .catch((err) => {
  //       console.error('Error during Data Source initialization', err);
  //     });

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
};

init();
