import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC"];

const ConfiguracionChart = ({ configuraciones }) => {
  // Contar configuraciones por clave (puedes personalizar según tus necesidades)
  const claveCounts = configuraciones.reduce((acc, configuracion) => {
    acc[configuracion.clave] = (acc[configuracion.clave] || 0) + 1;
    return acc;
  }, {});

  // Convertir datos en array para la gráfica
  const data = Object.keys(claveCounts).map((clave, index) => ({
    name: `${clave} (${claveCounts[clave]})`,
    value: claveCounts[clave],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div>
      <h3>Distribución de Configuraciones por Clave</h3>
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

export default ConfiguracionChart;
