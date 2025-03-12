export function CategorySelect({ categories, value, onChange }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="categorySelect"
        className="text-sm font-medium text-gray-700"
      >
        Select Category
      </label>
      <select
        id="categorySelect"
        value={value}
        onChange={onChange}
        className="w-full border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Select Category --</option>
        {categories?.length > 0 ? (
          categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))
        ) : (
          <option value="">No categories available</option>
        )}
      </select>
    </div>
  );
}