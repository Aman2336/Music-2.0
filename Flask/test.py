from deepface import DeepFace

file_path = "/Users/amandhingra/Documents/GitHub/Music-2.0/Flask/temp_images/temp_image.jpg"
try:
    result = DeepFace.analyze(file_path, actions=['emotion'], enforce_detection=False)
    print(result)
except Exception as e:
    print("Error:", e)
