import React, { useRef, useState } from "react";

export default function CameraCapture({ onCapture }) {
  // const videoRef = useRef(null);
  // const [imageSrc, setImageSrc] = useState(null);

  // const startCamera = async () => {
  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     videoRef.current.srcObject = stream;
  //   }
  // };

  // // const captureImage = () => {
  // //   const canvas = document.createElement("canvas");
  // //   const scale = 0.5;
  // //   canvas.width = videoRef.current.videoWidth * scale;
  // //   canvas.height = videoRef.current.videoHeight * scale;
  // //   canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
  // //   const dataUrl = canvas.toDataURL("image/png", 0.7);
  // //   setImageSrc(dataUrl);
  // //   onCapture(dataUrl); // Pass the captured image to the parent component
  // // };
  // const captureImage = () => {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = videoRef.current.videoWidth;
  //   canvas.height = videoRef.current.videoHeight;
  //   canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
  //   canvas.toBlob((blob) => {
  //     const formData = new FormData();
  //     formData.append("image", blob, "capture.png");
  //     fetch("/backend/mood/detect", {
  //       method: "POST",
  //       body: formData,
  //     });
  //   }, "image/png");
  // };
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
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
          onCapture(blob); // Pass the blob to the parent component
        }
      },
      "image/jpeg",
      0.7
    ); // Adjust quality as needed (0.7 represents 70% quality)
  };

  return (
    // <div className="camera-capture">
    //   <video ref={videoRef} autoPlay style={{ width: "100%" }} />
    //   <button onClick={startCamera}>Start Camera</button>
    //   <button onClick={captureImage}>Capture Image</button>
    //   {imageSrc && <img src={imageSrc} alt="Captured" />}
    // </div>
    <div className="camera-capture">
      {/* Adjust the video size using a CSS class or inline styles */}
      <video ref={videoRef} autoPlay style={{ width: "400px", height: "300px" }} />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      {imageSrc && <img src={imageSrc} alt="Captured" />}
    </div>
  );
}
// import React, { useRef, useState } from "react";

// export default function CameraCapture({ onCapture }) {
//   const videoRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);

//   const startCamera = async () => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//     }
//   };

//   const resizeImage = (imageDataUrl, maxWidth = 800) => {
//     const img = new Image();
//     img.src = imageDataUrl;
//     return new Promise((resolve, reject) => {
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         // Calculate the new dimensions based on the max width
//         const scaleFactor = maxWidth / img.width;
//         canvas.width = maxWidth;
//         canvas.height = img.height * scaleFactor;

//         // Draw the resized image on the canvas
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//         // Get the resized image as a base64 string
//         const resizedImageDataUrl = canvas.toDataURL("image/png");
//         resolve(resizedImageDataUrl);
//       };
//       img.onerror = reject;
//     });
//   };

//   const captureImage = async () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
//     const dataUrl = canvas.toDataURL("image/png");

//     // Resize the image before passing it to the parent
//     const resizedImageDataUrl = await resizeImage(dataUrl, 800); // 800px is the max width

//     setImageSrc(resizedImageDataUrl);
//     onCapture(resizedImageDataUrl); // Pass the resized image to the parent component
//   };

//   return (
//     <div className="camera-capture">
//       <video ref={videoRef} autoPlay style={{ width: "100%" }} />
//       <button onClick={startCamera}>Start Camera</button>
//       <button onClick={captureImage}>Capture Image</button>
//       {imageSrc && <img src={imageSrc} alt="Captured" />}
//     </div>
//   );
// }
