import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

const DispositivoChart = ({ dispositivos }) => {
  // Contar dispositivos por estado
  const estadoCounts = dispositivos.reduce((acc, dispositivo) => {
    acc[dispositivo.estado] = (acc[dispositivo.estado] || 0) + 1;
    return acc;
  }, {});

  // Convertir el objeto en un array de datos para la gráfica
  const data = Object.keys(estadoCounts).map((estado, index) => ({
    name: `${estado} (${estadoCounts[estado]})`,
    value: estadoCounts[estado],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div>
      <h3>Distribución de Dispositivos por Estado</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default DispositivoChart;
