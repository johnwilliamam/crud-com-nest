import { DataSource } from 'typeorm';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'crud',
  entities: ['*/src/users/entities/*{.ts,.js}'],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('DB Initialized');
  })
  .catch((err) => {
    console.log(err);
  });
