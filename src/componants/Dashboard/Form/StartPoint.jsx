export function StartPoints({ startPoint, setStartPoint, error }) {
  // Ensure startPoint is always an array of strings
  const points = Array.isArray(startPoint) ? startPoint : [];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Start Points
      </label>
      {points.map((point, index) => (
        <div key={index} className="flex mb-4 items-center space-x-4">
          <input
            type="text"
            className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={point}
            onChange={(e) => {
              const updatedStartPoints = [...points];
              updatedStartPoints[index] = e.target.value;
              setStartPoint(updatedStartPoints);
            }}
            placeholder={`Start point ${index + 1}`}
          />
          <button
            type="button"
            className="ml-2 text-red-500"
            onClick={() => {
              const updatedStartPoints = points.filter((_, i) => i !== index);
              setStartPoint(updatedStartPoints);
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-blue-500"
        onClick={() => setStartPoint([...points, ""])}
      >
        Add Start Point
      </button>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}