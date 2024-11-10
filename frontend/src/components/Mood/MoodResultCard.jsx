import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../styles/moodResult.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngry,
  faDizzy,
  faFlushed,
  faGrin,
  faMeh,
  faFrown,
  faSurprise,
} from "@fortawesome/free-solid-svg-icons";

const emotionIcons = {
  angry: <FontAwesomeIcon icon={faAngry} />,
  disgust: <FontAwesomeIcon icon={faDizzy} />,
  fear: <FontAwesomeIcon icon={faFlushed} />,
  happy: <FontAwesomeIcon icon={faGrin} />,
  neutral: <FontAwesomeIcon icon={faMeh} />,
  sad: <FontAwesomeIcon icon={faFrown} />,
  surprise: <FontAwesomeIcon icon={faSurprise} />,
};

// Import your custom CSS file

export default function MoodResultCard({
  mood,
  emotions,
  onDominantMoodDetected,
}) {
  const emotionEmojis = {
    angry: "😡",
    disgust: "🤢",
    fear: "😨",
    happy: "😊",
    neutral: "😐",
    sad: "😢",
    surprise: "😲",
  };

  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [results, setresults] = useState({});

  // Calculate the total sum of all emotion scores
  const totalScore = Object.values(emotions).reduce(
    (sum, score) => sum + score,
    0
  );

  // Convert emotion scores to percentages
  const emotionPercentages = Object.fromEntries(
    Object.entries(emotions).map(([emotion, score]) => {
      const percentage = (score / totalScore) * 100;
      return [emotion, percentage];
    })
  );

  // Find the dominant emotion
  const dominantEmotion = Object.entries(emotionPercentages).reduce(
    (max, [emotion, percentage]) =>
      percentage > max.percentage ? { emotion, percentage } : max,
    { emotion: "", percentage: 0 }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the component is in view
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (dominantEmotion.emotion) {
      onDominantMoodDetected(dominantEmotion.emotion); // Notify parent component
    }
  }, [dominantEmotion, onDominantMoodDetected]);

  useEffect(() => {
    if (isInView) {
      let currentPercentage = 0;
      const increment = dominantEmotion.percentage / 100; // Increment value for animation

      const interval = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= dominantEmotion.percentage) {
          currentPercentage = dominantEmotion.percentage;
          clearInterval(interval);
        }
        setAnimatedPercentage(currentPercentage);
      }, 30); // Adjust speed of animation here (20ms interval)

      return () => clearInterval(interval);
    }
  }, [isInView, dominantEmotion.percentage]);

  return (
    <div className="flex flex-row gap-10">
      <h2 className="text-6xl text-white mt-10 font-bold">Your Current Mood</h2>
      <div className="mood-result-card">
        <div className="emotions">
          {Object.entries(emotionPercentages).map(([emotion, percentage]) => (
            <p key={emotion}>
              {emotionIcons[emotion]} {emotion}: {percentage.toFixed(1)}%
            </p>
          ))}
        </div>

        {/* Displaying the speedometer for dominant emotion */}
        <div className="speedometer">
          <h4>Dominant Emotion: {dominantEmotion.emotion}</h4>
          <CircularProgressbar
            value={dominantEmotion.percentage} // Use the dominant emotion's percentage
            text={`${dominantEmotion.percentage.toFixed(1)}%`} // Show percentage inside the circle
            styles={buildStyles({
              pathTransition: "stroke-dashoffset 1s ease 0s",
              pathColor: "#00FFAB", // Customize path color
              textColor: "#00D1FF", // Customize text color
              trailColor: "#eee", // Customize the trail color
              strokeWidth: 12, // Customize stroke width
              textSize: "16px", // Customize text size
            })}
          />
        </div>
      </div>
    </div>
  );
}
