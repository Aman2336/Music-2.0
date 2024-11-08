import { useRef, useState } from "react";
import { IoCameraSharp } from "react-icons/io5";
import { MdOutlineCamera } from "react-icons/md";
export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

    // Using toBlob for compressed image data
    canvas.toBlob((blob) => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
        onCapture(blob); // Pass the blob to the parent component
      }
    }, "image/jpeg"); // Adjust quality as needed (0.7 represents 70% quality)
  };

  return (
    <div className="flex flex-col gap-5 items-center px-4 md:px-8 lg:px-16">
      {/* Responsive video element */}
      <video
        ref={videoRef}
        autoPlay
        className="w-full max-w-[500px] h-auto rounded-lg shadow-md"
      />
      <div className="flex flex-col md:flex-row gap-4 md:gap-28 justify-center mt-4">
        <button
          onClick={startCamera}
          className="w-full md:w-36 p-4 bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-4 rounded-lg font-semibold hover:from-[#00D1FF] hover:to-[#00FFAB] transition transform hover:scale-105"
        >
          <IoCameraSharp className="text-xl mb-2" />
          Start Camera
        </button>
        <button
          onClick={captureImage}
          className="w-full md:w-36 p-4 bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-4 rounded-lg font-semibold hover:from-[#00D1FF] hover:to-[#00FFAB] transition transform hover:scale-105"
        >
          <MdOutlineCamera className="text-xl mb-2" />
          Capture Image
        </button>
      </div>
      {imageSrc && (
        <div className="mt-4 w-full max-w-[500px]">
          <img
            src={imageSrc}
            alt="Captured"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}
