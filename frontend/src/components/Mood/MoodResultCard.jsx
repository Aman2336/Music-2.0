import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../styles/moodResult.css";

 // Import your custom CSS file

export default function MoodResultCard({ mood, emotions }) {
  // Calculate the total sum of all emotion scores
  const totalScore = Object.values(emotions).reduce((sum, score) => sum + score, 0);

  // Convert emotion scores to percentages
  const emotionPercentages = Object.fromEntries(
    Object.entries(emotions).map(([emotion, score]) => {
      const percentage = (score / totalScore) * 100;
      return [emotion, percentage];
    })
  );

  // Find the dominant emotion
  const dominantEmotion = Object.entries(emotionPercentages).reduce((max, [emotion, percentage]) =>
    percentage > max.percentage ? { emotion, percentage } : max
  , { emotion: "", percentage: 0 });

  return (
    <div className="mood-result-card">
      <h3>Detected Mood: {mood}</h3>
      <div className="emotions">
        {Object.entries(emotionPercentages).map(([emotion, percentage]) => (
          <p key={emotion}>
            {emotion}: {percentage.toFixed(1)}%
          </p>
        ))}
      </div>

      {/* Displaying the speedometer for dominant emotion */}
      <div className="speedometer">
        <h4>Dominant Emotion: {dominantEmotion.emotion}</h4>
        <CircularProgressbar
          value={dominantEmotion.percentage}  // Use the dominant emotion's percentage
          text={`${dominantEmotion.percentage.toFixed(1)}%`}  // Show percentage inside the circle
          styles={buildStyles({
            pathColor: "#00FFAB",  // Customize path color
            textColor: "#00D1FF",  // Customize text color
            trailColor: "#eee",  // Customize the trail color
            strokeWidth: 12,  // Customize stroke width
            textSize: "16px",  // Customize text size
          })}
        />
      </div>
    </div>
  );
}
