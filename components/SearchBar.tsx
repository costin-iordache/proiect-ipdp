export default function SearchBar() {
  return (
    <div className="flex items-center bg-[#1e1b2e] rounded-2xl p-2 shadow-lg">
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent text-white outline-none flex-grow px-4 py-2 rounded-lg"
      />
      <button className="bg-purple-700 text-white px-4 py-2 rounded-lg ml-2">
        Search
      </button>
    </div>
  );
}
