import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

export function BarChartCard() {
  return (
    <div className="lg:max-w-md shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-emerald-600">Steps Today</h2>
        <p className="text-sm text-gray-500">Track your steps for the week</p>
      </div>
      <div className="p-4">
        <BarChart width={350} height={250} data={[{ date: "2024-01-01", steps: 2000 }, { date: "2024-01-02", steps: 2100 }]}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Bar dataKey="steps" fill="#10B981" radius={5} />
        </BarChart>
      </div>
    </div>
  );
}
