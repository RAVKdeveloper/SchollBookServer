export default () => ({
  port: parseInt(process.env.PORT),
  host: process.env.HOST,
  dbport: parseInt(process.env.DBPORT),
  dblogin: process.env.DBLOGIN,
  password: process.env.PASSWORD,
  dbname: process.env.NAMEDB,
})
