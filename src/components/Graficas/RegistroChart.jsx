import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#FF5733", "#33FF57", "#3380FF", "#F033FF", "#FFC133"];

const RegistroChart = ({ registros }) => {
  // Contar la cantidad de registros por acción
  const actionCounts = registros.reduce((acc, registro) => {
    acc[registro.accion] = (acc[registro.accion] || 0) + 1;
    return acc;
  }, {});

  // Convertir el objeto en un array de datos para la gráfica
  const data = Object.keys(actionCounts).map((accion, index) => ({
    name: `${accion} (${actionCounts[accion]})`,
    value: actionCounts[accion],
    color: COLORS[index % COLORS.length],
  }));

  return (
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
  );
};

export default RegistroChart;
