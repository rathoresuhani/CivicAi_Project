const AdminFilter = ({filters, setFilters, onApply, onReset}) => {
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFilters((prev) => ({...prev, [name]:value}));
  }
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h2 className="text-base font-semibold text-black">Filter Complaints</h2>
      <p className="text-sm text-gray-600 mt-1">
        Filter active complaints by status, priority or recent days.
      </p>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Last N Days
          </label>
          <input
            type="number"
            min="1"
            name="days"
            value={filters.days}
            onChange={handleChange}
            placeholder="e.g. 7"
            className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex items-end gap-3">
          <button
            onClick={onApply}
            className="w-full px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition"
          >
            Apply
          </button>

          <button
            onClick={onReset}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black font-semibold hover:bg-gray-100 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
};
export default AdminFilter;