import React from "react";

export default function MoodResultCard({ mood, emotions }) {
  return (
    <div className="mood-result-card">
      <h3>Detected Mood: {mood}</h3>
      <div className="emotions">
        {Object.entries(emotions).map(([emotion, score]) => (
          <p key={emotion}>
            {emotion}: {(score * 100).toFixed(1)}%
          </p>
        ))}
      </div>
    </div>
  );
}
