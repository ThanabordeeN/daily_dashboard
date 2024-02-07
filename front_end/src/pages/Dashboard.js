import { Formik, Field, Form } from 'formik';
import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import 'material-symbols';


const Dashboard = () => {
    const [data, setData] = useState(null);  
    const keys = Object.keys(data?.price_Sum || {});
    const dataset = keys.map(key => ({
        date: key,
        price_Sum: data?.price_Sum?.[key],
        alqty_Sum: data?.alqty_Sum?.[key],
        accum_price: data?.accum_price?.[key]
    }));
    const sum_price = dataset.reduce((acc, row) => acc + row.price_Sum, 0);
    const sum_alqty = dataset.reduce((acc, row) => acc + row.alqty_Sum, 0);
    
    const fetchData = async (values) => {
        try {
            const response = await fetch('http://192.168.1.53:9000/filter', {
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
        fetchData(); // Fetch data when the component mounts
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
                                                <span className="checkmark">{key}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button className='button' type="submit"><span>Fetch</span></button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="grid-item">
                    <div>Status</div>
                    <div>
                        {data && (
                            <div className='grid-item-status'>
                                 <span class="material-symbols-outlined">
                                attach_money
                                </span>
                                <div className='LED'>{sum_price.toFixed(2)} BATH</div>
                                <span class="material-symbols-outlined">
                                sweep
                                </span>
                                <div className='LED'>{sum_alqty} EA</div>
                            </div>
                        )}
                        </div>
                    
                </div>
                <div className="grid-item">
                    <h4>Dashboard</h4>
                    <div style={{ height: "800px", width: "100%" }}>
                        {data && data.price_Sum && (
                            <LineChart
                            dataset={dataset}
                            xAxis={[{ scaleType: 'point', dataKey: 'date' }]}
                            series={[
                                { dataKey: 'price_Sum', label: 'Price Sum' ,area: true},
                                { dataKey: 'alqty_Sum', label: 'Alqty Sum' },
                                { dataKey: 'accum_price', label: 'Accum Price',yAxisKey: 'rightAxisId' },
                            ]}
                            xAxisTitle="Date"
                            yAxisTitle="Value"
                            yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                            rightAxis="rightAxisId"
                            margin={{ top: 10, right: 100, bottom: 20, left: 100 }} // Adjust the margin values here
                            style={{ maxWidth: '1000px' }} // Set a max width to limit the chart size on larger screens
                        />
                        )}
                    </div>
                    </div> 
                </div>
                <div className="grid-item">
                    <h4>Raw Data</h4>
                    <table id = "customers">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Price Sum (BATH)</th>
                                <th>Alqty Sum (EA)</th>
                                <th>Accum Price (BATH)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataset.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.date}</td>
                                    <td>{row.price_Sum.toFixed(2)}</td> 
                                    <td>{row.alqty_Sum.toFixed(0)}</td>
                                    <td>{row.accum_price.toFixed(2)}</td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
        );
    };
    export default Dashboard;