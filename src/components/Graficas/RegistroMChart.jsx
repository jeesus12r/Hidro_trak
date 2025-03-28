import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#FF5733", "#33FF57", "#3380FF", "#F033FF", "#FFC133"];

const RegistroMChart = ({ mediciones }) => {
  // Preparar los datos para el gráfico
  const data = mediciones.reduce((acc, medicion) => {
    acc[medicion.calidad_dato] = (acc[medicion.calidad_dato] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(data).map((key, index) => ({
    name: `${key} (${data[key]})`,
    value: data[key],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div>
      <h3>Distribución de Calidad del Dato</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          cx={200}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default RegistroMChart;
