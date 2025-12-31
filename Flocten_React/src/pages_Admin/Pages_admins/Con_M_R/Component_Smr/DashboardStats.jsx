
// components/DashboardStats.jsx
const DashboardStats = ({ estadisticas }) => {
  const stats = [
    {
      title: 'Total Préstamos',
      value: estadisticas.totalPrestamos || 0,
      color: 'bg-blue-500',
      icon: '📊'
    },
    {
      title: 'Activos',
      value: estadisticas.prestamosActivos || 0,
      color: 'bg-green-500',
      icon: '✅'
    },
    {
      title: 'Atrasados',
      value: estadisticas.prestamosAtrasados || 0,
      color: 'bg-red-500',
      icon: '⚠️'
    },
    {
      title: 'Devueltos',
      value: estadisticas.prestamosDevueltos || 0,
      color: 'bg-purple-500',
      icon: '🔄'
    },
    {
      title: 'Reactivos',
      value: estadisticas.prestamosReactivos || 0,
      color: 'bg-orange-500',
      icon: '🧪'
    },
    {
      title: 'Herramientas',
      value: estadisticas.prestamosHerramientas || 0,
      color: 'bg-indigo-500',
      icon: '🔧'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;