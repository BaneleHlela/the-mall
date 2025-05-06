import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { uploadLayoutImageThunk } from "../../../features/layouts/layoutSlice";
import { useState } from "react";

function UploadImageButton({ layoutId }: { layoutId: string }) {
  const dispatch = useDispatch();
  const { uploadingImage, uploadedImageUrl } = useSelector((state: RootState) => state.layoutSettings);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // 👈 just save it, don't upload yet
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      // Dispatch the upload action
      const response = await dispatch(uploadLayoutImageThunk({ layoutId, file: selectedFile }));
      
      const uploadedImageUrl = response.payload.url;  // Get the uploaded image URL
  
      // Update the layout (this is where we work with the nested structure)
      const updatedLayout = updateLayoutWithImage(layout, uploadedImageUrl, 'divs', 3);  // Example: target the 'sections' key and update the 3rd one
  
      // Save the updated layout to MongoDB
      dispatch(updateLayoutThunk({ layoutId, updatedLayout }));
    }
  };
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <button onClick={handleUploadClick} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Upload
        </button>
      )}
      {uploadingImage && <p>Uploading...</p>}
      {uploadedImageUrl && <p>Uploaded Image URL: {uploadedImageUrl}</p>}
    </div>
  );
}

export default UploadImageButton;


//Alright, but I don't think we have touched the complex part about this yet. We also have to save the link on out database (delete the old one if it exist). The problem is that these are nested and can be anywhere within. How do we do that?