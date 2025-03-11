export function ImageUpload({ images, setImages, error }) {
  const isFile = (file) => file instanceof File;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file instanceof File);
    setImages([...images, ...validFiles]);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
      <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 p-4 rounded-md cursor-pointer hover:border-blue-500 transition">
        <input 
          type="file" 
          multiple 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
        <span className="text-gray-500">Click to upload images</span>
      </label>
      
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {images.map((file, index) => (
            <div key={index} className="relative group">
              <img 
                src={isFile(file) ? URL.createObjectURL(file) : file} 
                alt={`preview-${index}`} 
                className="h-20 w-full object-cover rounded-md shadow-md"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
                onClick={() => handleDeleteImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}