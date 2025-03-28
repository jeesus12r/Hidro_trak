import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF0000"]; // Colores para la gráfica

const SensorChart = ({ sensores }) => {
  // Agrupar sensores por tipo
  const sensoresPorTipo = sensores.reduce((acc, sensor) => {
    acc[sensor.tipo] = (acc[sensor.tipo] || 0) + 1; // Contar sensores por tipo
    return acc;
  }, {});

  // Convertir datos en el formato necesario para la gráfica
  const data = Object.keys(sensoresPorTipo).map((key, index) => ({
    name: key, // Tipo de sensor
    value: sensoresPorTipo[key], // Cantidad de sensores de ese tipo
    color: COLORS[index % COLORS.length], // Asignar un color
  }));

  return (
    <div>
      <h3>Distribución de Sensores por Tipo</h3>
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

export default SensorChart;
