# from flask import Flask, request, jsonify
# from deepface import DeepFace
# from flask_cors import CORS  # Import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Preload the models to avoid reloading on every request
# print("Loading DeepFace models...")
# DeepFace.build_model("Emotion")

# @app.route('/analyze', methods=['POST'])
# def analyze():
#     try:
#         file = request.files.get('image')
#         if not file:
#             return jsonify({"error": "No image provided"}), 400

#         # Save the image to a temporary file
#         file_path = "/tmp/temp_image.jpg"
#         file.save(file_path)

#         # Analyze for emotion
#         result = DeepFace.analyze(file_path, actions=['emotion'])
#         dominant_emotion = result[0]['dominant_emotion']
#         all_emotions = result[0]['emotion']
#         return jsonify({"emotion": dominant_emotion, "emotions": all_emotions})
#     except Exception as e:
#         print("Error:", e)  # Print the error to the console
#         return jsonify({"error": str(e)}), 500


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8000,debug=True)

import os
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from deepface import DeepFace

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Preload the DeepFace model for Emotion analysis
print("Loading DeepFace models...")
DeepFace.build_model("Emotion")

# Custom temporary image folder path
temp_image_folder = os.path.join(os.path.dirname(__file__), "temp_images")
os.makedirs(temp_image_folder, exist_ok=True)  # Ensure the temp_images folder exists

@app.route('/analyze', methods=['POST'])
def analyze():
    file = request.files.get('image')
    if not file:
        return jsonify({"error": "No image provided"}), 400

    # Save the image to the custom temporary folder
    file_path = os.path.join(temp_image_folder, "temp_image.jpg")
    file.save(file_path)

    # Log the file path to confirm saving
    print(f"Image saved at: {file_path}")

    # Check if the file exists
    if os.path.exists(file_path):
        print("File exists in the temp_images folder.")
    else:
        print("File was not saved correctly in the temp_images folder.")

    # List all files in the temp_images folder to verify
    print("Files in temp_images folder:", os.listdir(temp_image_folder))

    # Analyze the saved image with enforce_detection set to False
    try:
        result = DeepFace.analyze(file_path, actions=['emotion'], enforce_detection=False)
        print(result)
        dominant_emotion = result['dominant_emotion']
        all_emotions = result['emotion']
        print("ans : ",dominant_emotion,all_emotions)
        return jsonify({"emotion": dominant_emotion, "emotions": all_emotions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)

