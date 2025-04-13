// components/MySubscriptions.tsx
export default function MySubscriptions() {
  const subs = [
    { name: "John Adams", type: "Monthly Subscription", status: "Due today!" },
    { name: "John Adams", type: "Annual Payment", status: "Due tomorrow" },
    { name: "John Adams", type: "Set payment reminder", status: "Due today" },
  ];

  return (
    <div className="bg-[#1e1b2e] text-white rounded-2xl p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-2">4 active</h3>
      {subs.map((sub, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
        >
          <span>{sub.name}</span>
          <span>{sub.type}</span>
          <span className="text-sm text-purple-300">{sub.status}</span>
        </div>
      ))}
      <button className="mt-4 bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-500">
        View all subscriptions
      </button>
    </div>
  );
}
