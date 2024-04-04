import React from 'react';
import { BarChart, LineChart } from '@mui/x-charts';

const Subgraph = ({ data }) => {

  console.log(data);
  return (
    <div>
      <div className="grid-bar">
        <div style={{ height: "10vh", width: "100%" }}>
          <div>OEM</div>
          {data && (
            <LineChart
              dataset={data}
              xAxis={[{scaleType:'point' ,dataKey: 'date' }]} // Specify that 'date' values are dates
              series={[
                { dataKey: 'order_price_sum',showMark: false,
              },
                { dataKey: 'price_sum', showMark: false,area: true}
              ]}
              xAxisTitle="Date"
              yAxisTitle="Value"
              yAxis={[{ id: 'rightAxisId' }]}
              margin={{ top: 10, right: 10, bottom: 30, left: 80 }}
            />
          )}
        </div>
      </div>
      </div>

  );
};

export default Subgraph;
