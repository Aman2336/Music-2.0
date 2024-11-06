import React, { useRef, useState } from "react";

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
    const dataUrl = canvas.toDataURL("image/png");
    setImageSrc(dataUrl);
    onCapture(dataUrl); // Pass the captured image to the parent component
  };

  return (
    <div className="camera-capture">
      <video ref={videoRef} autoPlay style={{ width: "100%" }} />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      {imageSrc && <img src={imageSrc} alt="Captured" />}
    </div>
  );
}
