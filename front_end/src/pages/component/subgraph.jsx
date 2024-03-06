import React from 'react';
import { BarChart, LineChart } from '@mui/x-charts';

const Subgraph = ({ data }) => {

  console.log(data);
  return (
    <div>
      <div className="grid-item">
        <div style={{ height: "200px", width: "100%" }}>
          <div>OEM</div>
          {data && (
            <LineChart
              dataset={data}
              xAxis={[{scaleType:'point' ,dataKey: 'date' }]} // Specify that 'date' values are dates
              series={[
                { dataKey: 'order_price_sum', label: 'Target Order (EA)' },
                { dataKey: 'price_sum', label: 'Actual Shipped (EA)', area: true}
              ]}
              xAxisTitle="Date"
              yAxisTitle="Value"
              yAxis={[{ id: 'leftAxisId' }]}
              margin={{ top: 10, right: 100, bottom: 20, left: 100 }}
              style={{ maxWidth: '1000px' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Subgraph;
