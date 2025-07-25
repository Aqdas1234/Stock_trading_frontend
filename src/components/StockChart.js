import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const StockChart = ({ stock }) => {
  const data = stock.price_history
    .map(item => ({
      price: parseFloat(item.price),
      time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }))
    .reverse(); // Fix order (old ➝ new)

  return (
    <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
      <h5 className="mb-3 text-center">{stock.symbol.toUpperCase()} Price Chart</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ fontSize: '14px' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#007bff"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
