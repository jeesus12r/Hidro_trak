import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

const AlertasChart = ({ alertas }) => {
  // Contar alertas por tipo
  const tipoCounts = alertas.reduce((acc, alerta) => {
    acc[alerta.tipo_alerta] = (acc[alerta.tipo_alerta] || 0) + 1;
    return acc;
  }, {});

  // Convertir los datos a un formato adecuado para la gráfica
  const data = Object.keys(tipoCounts).map((tipo, index) => ({
    name: `${tipo} (${tipoCounts[tipo]})`,
    value: tipoCounts[tipo],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div>
      <h3>Distribución de Alertas por Tipo</h3>
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

export default AlertasChart;
