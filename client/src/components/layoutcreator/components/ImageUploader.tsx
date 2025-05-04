import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateLayoutWithImage } from "../../../features/layouts/layoutSlice"; // your equivalent action
import { useSelector } from "react-redux";

interface ImageUploaderProps {
  objectPath: string;
  handleSettingChange: (field: string, value: any) => void;
}

const ImageUploader = ({ objectPath, handleSettingChange }: ImageUploaderProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // To handle error messages
  const dispatch = useDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Display the preview
    }
  };


  const layoutId = useSelector((state: any) => state.layoutSettings._id); // adjust path if needed
  
  const handleUploadImage = async () => {
    if (imageFile && layoutId) {
      try {
        const action = await dispatch(
          updateLayoutWithImage({
            layoutId,
            objectPath,
            file: imageFile,
          })
        );
        const uploadedImage = action.payload;
        if (uploadedImage) {
          handleSettingChange(`${objectPath}.url`, uploadedImage.fileUrl );
        } else {
          setError("Failed to upload image. Please try again.");
        }
      } catch (error) {
        setError("An error occurred while uploading the image.");
        console.error(error);
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

export default ImageUploader;