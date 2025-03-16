import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facial-attendance-campusai-default-rtdb.firebaseio.com/"
})

# Reference to the students' data
ref = db.reference('Students')

# Fetch all student records
students = ref.get()
current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # Get the current time

if students:
    for student_id, student_info in students.items():
        ref.child(student_id).update({
            "total_attendance": 0,  # Reset attendance
            "status": "present",    # Allow attendance tracking again
            "last_attendance_time": current_time  # Set to current time instead of midnight
        })
    print(f"✅ Attendance reset for all students at {current_time}!")
else:
    print("⚠️ No student data found in the database.")
