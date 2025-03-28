import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#0000FF", "#800080", "#008000", "#FF1493", "#808080"];

const UserChart = ({ usuarios }) => {
  // Contar la cantidad de usuarios por rol
  const roleCounts = usuarios.reduce((acc, usuario) => {
    acc[usuario.rol] = (acc[usuario.rol] || 0) + 1;
    return acc;
  }, {});

  // Convertir el objeto en un array de datos para la gráfica
  const data = Object.keys(roleCounts).map((rol, index) => ({
    name: `${rol} (${roleCounts[rol]})`,
    value: roleCounts[rol],
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

export default UserChart;
