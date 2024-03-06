const { Pool } = require('pg');
const fs = require('fs');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Daily_income',
    password: 'postgres',
    port: 5432, // default PostgreSQL port
});

function fetchData() {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, release) => {
            if (err) {
                return reject('Error acquiring client', err.stack);
            }
            const query = `SELECT 
            to_date(qty_data.shpdt, 'YYYY-MM-DD') AS date, 
            SUM(shdqy) AS shdqy_sum, 
            SUM(orqty) AS ogqty_sum,
            SUM(shdqy * price) AS price_sum,
            SUM(orqty * price) AS order_price_sum
        FROM qty_data
        WHERE format = 'OEM'
        GROUP BY to_date(qty_data.shpdt, 'YYYY-MM-DD')
        ORDER BY date;
        `;

            client.query(query, (err, result) => {
                release();
                
                if (err) {
                    return reject('Error executing query', err.stack);
                }
                result.rows.forEach(row => {
                    let date = new Date(row.date);
                    date.setDate(date.getDate() + 1); // add one day
                    row.date = date.toISOString().split('T')[0];
                }); 
                resolve(result.rows);
            });
        });
    });
}
module.exports = fetchData;