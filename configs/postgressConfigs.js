const Pool = require("pg").Pool;

const pool = new Pool({
    host :"localhost",
    user :"postgres",
    port :5432,
    password :"raef22297",
    database :"notes"
});

module.exports = pool;
