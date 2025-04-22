// components/UpcomingPayments.tsx
export default function UpcomingPayments() {
  const payments = [
    { day: 2, title: "Subscription renewal alert", time: "10:00–11:30" },
    { day: 8, title: "Payment Due", time: "11:00–12:30" },
    { day: 11, title: "Subscription upgrade", time: "10:00–11:30" },
    { day: 23, title: "Bill payment alert", time: "10:00–11:30" },
    { day: 27, title: "Subscription Due", time: "10:00–11:30" },
  ];

  return (
    <div className="bg-[#1e1b2e] text-white p-4 rounded-2xl">
      <h4 className="mb-3 font-semibold">Upcoming payments this month</h4>
      {payments.map((item, idx) => (
        <div key={idx} className="mb-2 flex justify-between">
          <span className="font-bold text-purple-400">{item.day}</span>
          <span>{item.title}</span>
          <span className="text-sm text-gray-400">{item.time}</span>
        </div>
      ))}
      <button className="mt-4 bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-500">
        View full list
      </button>
    </div>
  );
}
