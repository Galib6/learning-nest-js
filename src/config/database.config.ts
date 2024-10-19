import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  name: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === 'true',
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true',
}));