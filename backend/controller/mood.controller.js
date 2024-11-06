import axios from "axios";
import { PythonShell } from "python-shell";
export const mooddetect = async (req, res, next) => {
  const { imagePath } = req.body; // Assume the frontend sends the image path

  PythonShell.run(
    "../Mood/MoodDetect.py",
    {
      args: [imagePath], // Pass the image path as an argument
    },
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Parse the result from the Python script
      const emotionResult = JSON.parse(result[0]);

      // Send the detected emotion back to the frontend
      res.json({ mood: emotionResult.emotion });
    }
  );
};
