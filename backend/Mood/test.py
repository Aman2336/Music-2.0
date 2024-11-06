from deepface import DeepFace

# Run a basic test with a sample image
try:
    # Replace 'path_to_image.jpg' with an actual image path for mood detection
    result = DeepFace.analyze(img_path="../public/images/i1.jpg", actions=['emotion'])
    
    # Access and print the dominant emotion for each face detected
    for face_data in result:
        print("Dominant Emotion:", face_data['dominant_emotion'])
except Exception as e:
    print("An error occurred:", e)
