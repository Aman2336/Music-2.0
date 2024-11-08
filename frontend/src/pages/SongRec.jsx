import { useState } from "react";
import CameraCapture from "../components/Camera/CameraCapture";
import MoodResultCard from "../components/Mood/MoodResultCard";
import axios from "axios";

export default function MoodDetection() {
  const [mood, setMood] = useState(null);
  const [emotions, setEmotions] = useState({});

  // const handleCapture = async (imageBlob) => {
  //   // Prepare FormData with the image blob
  //   const formData = new FormData();
  //   formData.append("image", imageBlob, "capture.jpg");

  //   try {
  //     // Send the form data to the backend
  //     const response = await fetch("/backend/mood/detect", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       console.log("Image uploaded successfully");
  //     } else {
  //       console.error("Failed to upload image");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  const handleCapture = async (imageBlob) => {
    // Prepare FormData with the image blob
    const formData = new FormData();
    formData.append("image", imageBlob, "capture.jpg");

    try {
      // Send the form data to Flask (direct call to the /analyze endpoint)
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMood(data.emotion); // Set the dominant emotion
        setEmotions(data.emotions); // Set all emotion scores
        console.log("Image uploaded and analyzed successfully");
        console.log(data.emotion);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // const handleCapture = async (imageData) => {
  //   console.log(imageData);
  //   try {
  //     const response = await axios.post(
  //       "/backend/mood/detect",
  //       { image: imageData },  // Data to send
  //       { headers: {            // Configuration object containing headers
  //         'Content-Type': 'application/json',  // Ensure you're sending JSON
  //       }}
  //     );
  //     setMood(response.data.mood);
  //     setEmotions(response.data.emotions);
  //   } catch (error) {
  //     console.error("Error detecting mood:", error);
  //   }
  // };
  return (
    <div className="mood-detection-page">
      <h2>Detect Your Mood</h2>
      <CameraCapture onCapture={handleCapture} />
      {mood && <MoodResultCard mood={mood} emotions={emotions} />}
    </div>
  );
}
// const handleCapture = async (imageBlob) => {
// Prepare FormData with the image blob
//   const formData = new FormData();
//   formData.append("image", imageBlob, "capture.jpg");

//   try {
//     // Send the form data to Flask (direct call to the /analyze endpoint)
//     const response = await fetch("http://127.0.0.1:8000/analyze", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setMood(data.emotion); // Set the dominant emotion
//       setEmotions(data.emotions); // Set all emotion scores
//       console.log("Image uploaded and analyzed successfully");
//     } else {
//       console.error("Failed to upload image");
//     }
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };

// const handleCapture = async (imageData) => {
//   console.log(imageData);
//   try {
//     const response = await axios.post(
//       "/backend/mood/detect",
//       { image: imageData },  // Data to send
//       { headers: {            // Configuration object containing headers
//         'Content-Type': 'application/json',  // Ensure you're sending JSON
//       }}
//     );
//     setMood(response.data.mood);
//     setEmotions(response.data.emotions);
//   } catch (error) {
//     console.error("Error detecting mood:", error);
//   }
// };
