import React from 'react';
import { Formik, Form, Field } from 'formik';
import fetchData from '../../api_call/fecthFilter';

useEffect(() => {
    fetchData(); // Fetch data when the component mounts
}, []);
const MainComponent = () => {
    return (
        
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
    );
};

export default MainComponent;