export default () => ({
  port: parseInt(process.env.PORT),
  host: process.env.HOST,
  dbport: parseInt(process.env.DBPORT),
  dblogin: process.env.DBLOGIN,
  password: process.env.PASSWORD,
  dbname: process.env.NAMEDB,
  redis: {
    port: parseInt(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
  },
})
