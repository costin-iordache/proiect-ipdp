// components/TotalSubscriptions.tsx
export default function TotalSubscriptions() {
  const data = [15, 20, 12, 25, 22, 10, 18, 23, 21, 19, 26, 24]; // just sample

  return (
    <div className="bg-[#2b2540] text-white rounded-2xl p-4">
      <h4 className="mb-3 font-semibold">Annual Subscriptions</h4>
      <div className="flex gap-2 items-end h-40">
        {data.map((val, idx) => (
          <div
            key={idx}
            className="bg-purple-400 rounded-sm"
            style={{ height: `${val * 3}px`, width: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}
