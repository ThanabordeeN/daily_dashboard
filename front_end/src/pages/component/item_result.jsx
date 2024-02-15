import React from 'react';
import { LineChart } from '@mui/x-charts';

const Item_result = ({ data, dataset, sum_price, sum_alqty }) => {
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
                        <LineChart
                            dataset={dataset}
                            xAxis={[{ scaleType: 'point', dataKey: 'date' }]}
                            series={[
                                { dataKey: 'alqty_Sum', label: 'Actual Shipped (EA)', area: true },
                                { dataKey: 'order_qty', label: 'Order Qty (EA)' },
                            ]}
                            xAxisTitle="Date"
                            yAxisTitle="Value"
                            yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                            margin={{ top: 10, right: 100, bottom: 20, left: 100 }} // Adjust the margin values here
                            style={{ maxWidth: '1000px' }} // Set a max width to limit the chart size on larger screens
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
                            <th>Actual Shipped (EA)</th>
                            <th>Order Qty (EA)</th>
                       </tr>
                    </thead>
                    <tbody>
                        {dataset.map((row, index) => (
                            <tr key={index}>
                                <td>{row.date}</td>
                                <td>{row.alqty_Sum.toLocaleString()}</td>
                                <td>{row.order_qty.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Item_result;
