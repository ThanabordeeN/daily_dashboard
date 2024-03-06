import React from 'react';
import { BarChart, LineChart } from '@mui/x-charts';

const Priceresult = ({ data, dataset, sum_price, sum_alqty }) => {
    return (
        <div>
                       <div className="grid-item">
                <div>Value</div>
                <div className='grid-led'>
                    {data && (
                            <div className='grid-addon'>
                                <span class="material-symbols-outlined">
                                    attach_money
                                </span>
                                <div>{sum_price.toLocaleString()} BATH</div>
                            </div>

                    )}
                    {data && (
                            <div className='grid-addon'>
                                <span class="material-symbols-outlined">
                                    sweep
                                </span>
                                <div>{sum_alqty.toLocaleString()} EA</div>
                            </div>
                            )}
                    
                </div>
            </div>
            <div className="grid-item">
                <h4>Dashboard</h4>
                <div style={{ height: "800px", width: "100%" }}>
                    {data && data.price_Sum && (
                        <BarChart
                            dataset={dataset}
                            xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
                            series={[
                                { dataKey: 'price_Sum', label: 'Actual Value (Bath)', area: true },
                                { dataKey: 'order_price', label: 'Target Order Value (Bath)' },
                            ]}
                            xAxisTitle="Date"
                            yAxisTitle="Value"
                            yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                            margin={{ top: 10, right: 100, bottom: 20, left: 100 }} // Adjust the margin values here
                            style={{ maxWidth: '1000px' }} // Set a max width to limit the chart size on larger screens
                            axisData={{ x: { value: 0 } }} // Add a valid value for `x.value`
                        />
                    )}
                </div>
            </div>
            <div className="grid-item">
                <h4>Raw Data</h4>
                <table id="customers">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Value (Bath)</th>
                            <th>Target Order Value (Bath)</th>
                            <th>Accumurate (Bath)</th>

                        </tr>
                    </thead>
                    <tbody>
                        {dataset.map((row, index) => (
                            <tr key={index}>
                                <td>{row.date}</td>
                                <td>{row.price_Sum.toLocaleString()}</td>
                                <td>{row.order_price.toLocaleString()}</td>
                                <td>{row.accum_price.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Priceresult;
