module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: PROCESS.env.PASSWORD,
    DB: 'bajaj_task',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}