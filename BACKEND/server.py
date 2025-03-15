from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import face_recognition
import pickle
import firebase_admin
from firebase_admin import credentials, db
import base64
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/recognize": {"origins": "*"}})  # Ensure frontend can communicate

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facial-attendance-campusai-default-rtdb.firebaseio.com/"
})

# Load face encodings
with open('EncodeFile.p', 'rb') as file:
    encodeListKnownWithIds = pickle.load(file)

encodeListKnown, studentIds = encodeListKnownWithIds
print(f"✅ Loaded {len(encodeListKnown)} known face encodings.")

@app.route('/recognize', methods=['OPTIONS'])
def handle_options():
    return jsonify({"message": "CORS preflight request received"}), 200

@app.route('/recognize', methods=['POST'])
def recognize_faces():
    try:
        data = request.json.get('image', None)

        if not data:
            return jsonify({'status': 'failed', 'message': 'No image received'}), 400

        # Decode base64 image
        image_data = base64.b64decode(data.split(',')[1])
        image_array = np.frombuffer(image_data, dtype=np.uint8)
        frame = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

        if frame is None:
            return jsonify({'status': 'failed', 'message': 'Invalid image data'}), 400

        # Detect faces
        face_locations = face_recognition.face_locations(frame)
        face_encodings = face_recognition.face_encodings(frame, face_locations)

        recognized_students = []

        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(encodeListKnown, face_encoding)
            face_distances = face_recognition.face_distance(encodeListKnown, face_encoding)
            match_index = np.argmin(face_distances)

            if matches[match_index]:  # If match found
                student_id = studentIds[match_index]

                ref = db.reference(f'Students/{student_id}')
                student_info = ref.get()

                if student_info:
                    # Prevent multiple attendance markings within 30 seconds
                    last_attendance_time = student_info.get('last_attendance_time', '2000-01-01 00:00:00')
                    last_time_obj = datetime.strptime(last_attendance_time, "%Y-%m-%d %H:%M:%S")
                    time_elapsed = (datetime.now() - last_time_obj).total_seconds()

                    if time_elapsed > 30:
                        new_attendance = student_info['total_attendance'] + 1
                        ref.update({
                            'total_attendance': new_attendance,
                            'last_attendance_time': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                        })
                        print(f"✅ Attendance updated for {student_info['name']} ({student_id})")

                        student_info['total_attendance'] = new_attendance  # Update for response

                    recognized_students.append({
                        'id': student_id,
                        'name': student_info['name'],
                        'major': student_info['major'],
                        'year': student_info['year'],
                        'total_attendance': student_info['total_attendance']
                    })

        if recognized_students:
            return jsonify({'status': 'success', 'students': recognized_students}), 200
        else:
            return jsonify({'status': 'failed', 'message': 'No known faces recognized'}), 404

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({'status': 'failed', 'message': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
