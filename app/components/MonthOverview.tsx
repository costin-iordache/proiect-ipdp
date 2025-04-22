// components/MonthOverview.tsx
export default function MonthOverview() {
  const months = [
    { name: "Jan", count: 2 },
    { name: "Feb", count: 2 },
    { name: "Apr", count: 7 },
    { name: "May", count: 4 },
    { name: "Jun", count: 6 },
  ];

  return (
    <div className="text-white bg-[#1e1b2e] p-4 rounded-2xl shadow">
      <h4 className="text-sm mb-2 font-semibold">Current Month Overview</h4>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, i) => (
          <div key={i} className="text-center p-2 bg-purple-700 rounded-md">
            <div className="text-sm">{month.name}</div>
            <div className="text-lg font-bold">{month.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
