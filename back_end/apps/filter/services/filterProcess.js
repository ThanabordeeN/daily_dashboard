const dbmodel = require("./dbase");
const fs = require('fs');
const alqty_sum = require('./alqty_sum');
const price_sum = require('./price_sum');
/**
 * Processes the filter values and returns the filtered plant data.
 * 
 * @param {Object} values - The filter values.
 * @param {string} values.start_date - The start date for filtering.
 * @param {string} values.end_date - The end date for filtering.
 * @param {string} values.part_no - The part number for filtering.
 * @param {string} values.customer_no - The customer number for filtering.
 * @param {Object} values.plant_selection - The plant selection options.
 * @param {boolean} values.plant_selection.srg - The option to include SRG plant.
 * @param {boolean} values.plant_selection.wgr - The option to include WGR plant.
 * @param {boolean} values.plant_selection.ddc - The option to include DDC plant.
 * @returns {Array} - The filtered plant data.
 */
function filterProcess(values) {
    try {   
    const item = [];
    const destination = [];
    const plant_selection = values.plant_selection;
    const destination_selection = values.destination_selection;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    if (values.start_date === '') {
        values.start_date = `${year}-${month}-01`;
    }
    if (values.end_date === '') {
        values.end_date = `${year}-${month}-31`;
    }
    if (plant_selection.srg) {
        item.push('A1');
    }
    if (plant_selection.wgr) {
        item.push('G1');
    }
    if (plant_selection.ddc) {
        item.push('T1');
    }
    if (destination_selection.export) {
        destination.push('CODE FOR EXPORT');
    }
    if (destination_selection.domestic) {
        destination.push('CODE FOR DOMESTICS');
    }




    const database = Object.entries(dbmodel).flat(Infinity);
    //
    
    const filtered_date = database.filter(entry => entry.shpdt >= values.start_date && entry.shpdt <= values.end_date);
    const filtered_plant = filtered_date.filter(entry => item.includes(entry.packc));    
    const filtered_plant_result = filtered_plant.filter(entry => destination.includes(entry.departing));
    let filtered_plant_data;
    if (values.part_no === '' && values.customer_no === '') {
        filtered_plant_data = filtered_plant_result;
    } else {
        filtered_plant_data = filtered_plant_result.filter(entry => entry.prtno === values.part_no || entry.cusno === values.customer_no);
    }
    if (values.format_selection === 'all') {
        filtered_plant_data = filtered_plant_data;
    }
    if (values.format_selection === 'oem') {
        filtered_plant_data = filtered_plant_data.filter(entry => entry.format === 'OEM');
    }
    if (values.format_selection === 'sparepart') {
        filtered_plant_data = filtered_plant_data.filter(entry => entry.format === 'SPART PART');
    }
    if(values.format_selection === 'aftermarket') {
        filtered_plant_data = filtered_plant_data.filter(entry => entry.format === 'AFTER MARKET/OES');
    }
    if (filtered_plant_data.length === 0) {
        console.log('No data found');
        filtered_plant_data = null;
    }
    console.log(values.start_date, values.end_date, filtered_plant_result.length ,destination,values.format_selection);
    console.log(filtered_plant_data);
    return filtered_plant_data;
}
    catch (error) {
        console.log(error);
        throw error;
    }
}
    
module.exports = filterProcess;
