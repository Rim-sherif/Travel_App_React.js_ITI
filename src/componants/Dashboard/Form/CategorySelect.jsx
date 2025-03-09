export function CategorySelect({ categories, selectedCategory, setSelectedCategory }) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Select Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Category --</option>
          {categories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {selectedCategory === "" && (
          <p className="text-red-500 text-xs">Please select a category</p>
        )}
      </div>
    );
  }
  