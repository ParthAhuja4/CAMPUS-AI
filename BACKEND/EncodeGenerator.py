import cv2
import face_recognition
import pickle
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Initialize Firebase (Only for Database)
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facial-attendance-campusai-default-rtdb.firebaseio.com/"  # Add Firebase Realtime Database URL Here
})

# Importing student images
folderPath = 'Images'
pathList = os.listdir(folderPath)
print(f"Found {len(pathList)} images in '{folderPath}'.")

imgList = []
studentIds = []

for path in pathList:
    filePath = os.path.join(folderPath, path)
    
    try:
        img = cv2.imread(filePath)
        if img is None:
            print(f"Skipping {path} (Invalid Image)")
            continue

        imgList.append(img)
        studentIds.append(os.path.splitext(path)[0])  # Extract ID from filename

    except Exception as e:
        print(f"Error loading {path}: {e}")

print(f"Successfully loaded {len(imgList)} valid images.")
print("Student IDs:", studentIds)


def findEncodings(imagesList):
    """Encodes face data for all images in the list."""
    encodeList = []
    for idx, img in enumerate(imagesList):
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        try:
            encode = face_recognition.face_encodings(img)[0]
            encodeList.append(encode)
        except IndexError:
            print(f"Warning: No face found in image {studentIds[idx]}. Skipping.")
            continue

    return encodeList


print("🔹 Encoding Faces ...")
encodeListKnown = findEncodings(imgList)

# Save encodings along with student IDs
encodeListKnownWithIds = [encodeListKnown, studentIds]

print(f"✅ Encoding Complete! {len(encodeListKnown)} valid encodings saved.")

# Save to file
with open("EncodeFile.p", 'wb') as file:
    pickle.dump(encodeListKnownWithIds, file)

print("✅ Encode File Saved as 'EncodeFile.p'")
