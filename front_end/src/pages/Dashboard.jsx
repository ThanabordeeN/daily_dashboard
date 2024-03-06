import { Formik, Field, Form } from 'formik';
import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import 'material-symbols';
import Priceresult from './component/price_result';
import ItemResult from './component/item_result';
import Subgraph from './component/subgraph';
import fetchOEM from '../api_call/fecthoem';
const Dashboard = () => {
    const [data, setData] = useState(null);  
    const [selection, setSelection] = useState(null);
    const keys = Object.keys(data?.price_Sum || {}).sort();
    const dataset = keys.map(key => ({
        date: key,
        price_Sum: data?.price_Sum?.[key],
        alqty_Sum: data?.alqty_Sum?.[key],
        accum_price: data?.accum_price?.[key],
        order_qty: data?.ogqty_Sum?.[key],
        order_price: data?.order_price?.[key],
        accum_item: data?.accum_item?.[key]
    }));
    const sum_price = dataset.reduce((acc, row) => acc + row.price_Sum, 0);
    const sum_alqty = dataset.reduce((acc, row) => acc + row.alqty_Sum, 0);

    const [oem, setOem] = useState(null);



    const fetchData = async (values) => {
        try {
            const response = await fetch('http://localhost:9000/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData().then((data) => {
            setData(data);
        });; // Fetch data when the component mounts
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            fetchOEM().then((data) => {
                setOem(data);
            });
        }, 10000); // Replace 1000 with the desired interval in milliseconds

        return () => clearInterval(interval); // Clean up the interval when the component unmounts
    }, []);
    return (
        <div>
            <h1>Internal Loss</h1>
            <div className="grid-container">
                <div className="grid-item">
                    Filter
                    <Formik
                        initialValues={{
                            start_date: '',
                            end_date: '',
                            part_no: '',
                            customer_no: '',
                            plant_selection: {
                                srg: true,
                                wgr: true,
                                ddc: true
                            },
                            destination_selection: {
                                export: true,
                                domestic: true
                            }
                        }}
                        onSubmit={async (values) => {
                            await fetchData(values);
                        }}
                    >
                        {({ values }) => (
                            <Form>
                                <div className='grid-attribute'>
                                    <Field type="date" name="start_date" />
                                    <Field type="date" name="end_date" />
                                    <Field type="text" name="part_no" placeholder="Part Number"/>
                                    <Field type="text" name="customer_no" placeholder="Customer Number" />
                                    {Object.entries(values.plant_selection).map(([key]) => (
                                        <div key={key}>
                                            <label>
                                                <Field type="checkbox" name={`plant_selection.${key}`} />
                                                <span className="checkmark">{key.toUpperCase()}</span>
                                            </label>
                                        </div>
                                    ))}
                                    {Object.entries(values.destination_selection).map(([key]) => (
                                        <div key={key}>
                                            <label>
                                                <Field type="checkbox" name={`destination_selection.${key}`} />
                                                <span className="checkmark">{key.toUpperCase()}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button className='button' onClick={() => setSelection('Amount')}><span>Amount</span></button>
                                <button className='button' onClick={() => setSelection('item')}><span>Item</span></button>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className="grid-item">
            {oem && <Subgraph data={oem} />}
            {selection === 'Amount' && <Priceresult data={data} dataset={dataset} sum_price={sum_price} sum_alqty={sum_alqty} />}
            {selection === 'item' && <ItemResult data={data} dataset={dataset} sum_price={sum_price} sum_alqty={sum_alqty} />}
            </div>
        </div>
    );
};

export default Dashboard;
