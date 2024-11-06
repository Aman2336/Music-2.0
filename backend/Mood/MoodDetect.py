from deepface import DeepFace
import sys
import json

# Get the image path from command-line arguments
image_path = sys.argv[1]

# Analyze the image for emotion
result = DeepFace.analyze(image_path, actions=['emotion'])

# Extract the dominant emotion
dominant_emotion = result[0]['dominant_emotion']

# Return the emotion result
print(json.dumps({"emotion": dominant_emotion}))
