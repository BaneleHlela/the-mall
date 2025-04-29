import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLayoutWithImage } from "../../../features/layouts/layoutSlice"; // Your equivalent action
import { uploadLayoutImageThunk } from "../../../features/layouts/layoutSlice";
import { RootState } from "../../../app/store";
interface ImageEditorProps {
  settings: any; // Adjust type as per your settings structure
  handleSettingChange: (field: string, value: any) => void;
}

const ImageEditor = ({ settings, handleSettingChange }: ImageEditorProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // To handle error messages
  const dispatch = useDispatch();

  const layoutId = useSelector((state: RootState) => state.layoutSettings._id)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Display the preview
    }
  };

  const handleUploadImage = async () => {
    if (imageFile && layoutId) { // Ensure layoutId exists
      try {
        // Dispatch the action with layoutId and file
        const action = await dispatch(uploadLayoutImageThunk({ layoutId, file: imageFile }));
        const uploadedImage = action.payload; // This should contain the { layoutId, fileUrl }

        if (uploadedImage) {
          // Update settings with the new URL (ensure you adjust this based on your state structure)
          handleSettingChange(layoutId, { ...settings, url: uploadedImage.fileUrl });
        } else {
          setError("Failed to upload image. Please try again.");
        }
      } catch (error) {
        setError("An error occurred while uploading the image.");
        console.error(error); // Log the error for debugging
      }
    }
  };

  return (
    <div className="border p-2 rounded bg-white mt-2">
      <p className="text-xs font-medium text-gray-500 mb-1">Image Editor</p>
      {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mb-2" />}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button
        onClick={handleUploadImage}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Upload Image
      </button>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>} {/* Display error message */}
    </div>
  );
};

export default ImageEditor;
function updateLayoutImageThunk(arg0: { layoutId: any; file: File; }): any {
    throw new Error("Function not implemented.");
}

