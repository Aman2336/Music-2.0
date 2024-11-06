import React, { useState } from "react";
import CameraCapture from "../components/Camera/CameraCapture";
import MoodResultCard from "../components/Mood/MoodResultCard";
import axios from "axios";

export default function MoodDetection() {
  const [mood, setMood] = useState(null);
  const [emotions, setEmotions] = useState({});

  const handleCapture = async (imageData) => {
    try {
      const response = await axios.post("/api/mood/detect-from-image", {
        image: imageData,
      });
      setMood(response.data.mood);
      setEmotions(response.data.emotions);
    } catch (error) {
      console.error("Error detecting mood:", error);
    }
  };

  return (
    <div className="mood-detection-page">
      <h2>Detect Your Mood</h2>
      <CameraCapture onCapture={handleCapture} />
      {mood && <MoodResultCard mood={mood} emotions={emotions} />}
    </div>
  );
}
