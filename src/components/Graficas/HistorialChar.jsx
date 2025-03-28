import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#FF4500", "#1E90FF", "#32CD32", "#FFD700", "#8A2BE2"];

const HistorialChart = ({ historial }) => {
  // Contar el consumo por dispositivo
  const consumoPorDispositivo = historial.reduce((acc, registro) => {
    acc[registro.dispositivo_id] = (acc[registro.dispositivo_id] || 0) + registro.consumo;
    return acc;
  }, {});

  // Convertir el objeto en un array de datos para la gráfica
  const data = Object.keys(consumoPorDispositivo).map((dispositivo, index) => ({
    name: `${dispositivo} (${consumoPorDispositivo[dispositivo]} unidades)`,
    value: consumoPorDispositivo[dispositivo],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div>
      <h3>Distribución de Consumo por Dispositivo</h3>
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

export default HistorialChart;
