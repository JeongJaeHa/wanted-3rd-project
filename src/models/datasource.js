const { DataSource } = require("typeorm");
const posts = require("../entities/posts");

const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  TIME_ZONE: process.env.TIME_ZONE,
  entities: [posts],
  synchronize: false,
  logging: false,
});

module.exports = { AppDataSource };