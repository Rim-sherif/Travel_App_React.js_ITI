export function DateInput({ label, ...props }) {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <input type="date" {...props} className="w-full border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {props.error && <p className="text-red-500 text-xs">{props.error}</p>}
      </div>
    );
  }
  