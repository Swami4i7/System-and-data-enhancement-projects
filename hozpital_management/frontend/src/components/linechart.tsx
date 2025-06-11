import { LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts';

export function LineChartCard() {
  return (
    <div className="lg:max-w-md shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-emerald-600">Resting Heart Rate</h2>
        <p className="text-sm text-gray-500">Your heart rate over the week</p>
      </div>
      <div className="p-4">
        <LineChart width={350} height={250} data={[{ date: "2024-01-01", rate: 62 }, { date: "2024-01-02", rate: 70 }]}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={3} />
        </LineChart>
      </div>
    </div>
  );
}
