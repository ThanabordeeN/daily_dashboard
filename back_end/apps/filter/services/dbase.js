const { Pool } = require('pg');
const fs = require('fs');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Daily_income',
    password: 'postgres',
    port: 5432, // default PostgreSQL port
});

const dbmodel = [];
setInterval(() => {
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database');
    const query = 'SELECT* FROM public.qty_data;';
    client.query(query, (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        result.rows.forEach(row => {
            let date = new Date(row.shpdt);
            date.setDate(date.getDate() + 1); // add one day
            row.shpdt = date.toISOString().split('T')[0];
        }); 
        dbmodel.push(resuxlt.rows);
        
    });
});
}, 60000);

module.exports = dbmodel;