const fs = require('fs');

function accum_price(date, item_sumday) {
    const start_date = date.start_date;
    const end_date = date.end_date;
    const data = item_sumday;

    const sortedKeys = Object.keys(data).sort((a, b) => new Date(a) - new Date(b));

    const accum_item = {};
    let sumaccum = 0;

    for (const key of sortedKeys) {
        if (key >= start_date && key <= end_date) {
            sumaccum += data[key];
            accum_item[key] = sumaccum;
        }
    }
    return accum_item;
}

module.exports = accum_price;
