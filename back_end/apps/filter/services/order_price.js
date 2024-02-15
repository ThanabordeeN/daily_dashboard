const fs = require('fs');

function cusno_sumvalue(dbmodel) {
    const data = dbmodel;
    // Create an object to store the sum of alqty for each unique date time
    const sumByDateTime = {}

    // Iterate through the data array
    for (i = 0 ; i < data.length; i++) {
        // Get the shpdt value from the current data object
        const shpdt = data[i].shpdt
        const sum = Number(data[i].orqty)*Number(data[i].price);

        // If the sumByDateTime object already has a property with the shpdt value
        if (sumByDateTime[shpdt]) {
            // Add the sum value to the existing sumByDateTime property
            sumByDateTime[shpdt] += sum
        } else {
            // If the sumByDateTime object does not have a property with the shpdt value
            // Create a new property with the shpdt value and set it to the sum value
            sumByDateTime[shpdt] = sum
        }
    }

    if (sumByDateTime['2024-02-11']) {
        // If it exists, delete it
        delete sumByDateTime['2024-02-11'];
    }

    return sumByDateTime;
}

module.exports = cusno_sumvalue;    // Export the cusno_sumvalue function