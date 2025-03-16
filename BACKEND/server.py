from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import face_recognition
import pickle
import firebase_admin
from firebase_admin import credentials, db
import base64
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, resources={r"/recognize": {"origins": "*"}})

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facial-attendance-campusai-default-rtdb.firebaseio.com/"
})

# Load known face encodings
with open('EncodeFile.p', 'rb') as file:
    encodeListKnownWithIds = pickle.load(file)

encodeListKnown, studentIds = encodeListKnownWithIds
print(f"✅ Loaded {len(encodeListKnown)} known face encodings.")

# Time limit for marking absent (11 minutes)
MAX_GAP_SECONDS = 660  

def mark_absentees():
    """Automatically marks students as absent if they have been inactive for more than 12 minutes."""
    ref = db.reference('Students')
    students = ref.get()
    current_time = datetime.now()

    if students:
        for student_id, student_info in students.items():
            last_attendance_time = student_info.get('last_attendance_time')

            if last_attendance_time:
                last_time_obj = datetime.strptime(last_attendance_time, "%Y-%m-%d %H:%M:%S")

                # If more than 12 minutes have passed, mark student as absent
                if (current_time - last_time_obj) > timedelta(seconds=MAX_GAP_SECONDS):
                    ref.child(student_id).update({
                        "total_attendance": 0,
                        "status": "absent"
                    })
                    print(f"❌ {student_info['name']} ({student_id}) automatically marked absent.")

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

        # Mark students absent before processing new detections
        mark_absentees()

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
                    last_attendance_time = student_info.get('last_attendance_time', None)
                    if last_attendance_time:
                        last_time_obj = datetime.strptime(last_attendance_time, "%Y-%m-%d %H:%M:%S")
                    else:
                        last_time_obj = datetime.now()

                    current_time = datetime.now()
                    time_spent_seconds = (current_time - last_time_obj).total_seconds()

                    # If student is already marked absent, do nothing
                    if student_info.get('status') == 'absent':
                        print(f"❌ {student_info['name']} ({student_id}) is already marked absent. No further attendance updates.")
                        continue

                    # Normal attendance update if within time limit
                    if time_spent_seconds >= 30:
                        intervals = max(1, int(time_spent_seconds // 30))
                        time_spent_minutes = intervals * 0.5
                        total_time_spent = student_info['total_attendance'] + time_spent_minutes

                        ref.update({
                            'total_attendance': round(total_time_spent, 2),
                            'last_attendance_time': current_time.strftime("%Y-%m-%d %H:%M:%S")
                        })
                        print(f"✅ {student_info['name']} ({student_id}) attendance updated to {round(total_time_spent, 2)} minutes.")

                        student_info['total_attendance'] = round(total_time_spent, 2)

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
