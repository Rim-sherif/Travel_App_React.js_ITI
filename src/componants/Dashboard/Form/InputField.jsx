export function InputField({ label, placeholder, error, ...props }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input 
        {...props} 
        placeholder={placeholder} 
        className="w-full border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
