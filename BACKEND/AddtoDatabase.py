import firebase_admin
from firebase_admin import credentials, db

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facial-attendance-campusai-default-rtdb.firebaseio.com/"
})

ref = db.reference('Students')

# Updated data with "status" field
data = {
    "321654": {
        "name": "Parth Ahuja",
        "major": "Robotics",
        "starting_year": 2017,
        "total_attendance": 0,  # Initially set to 0
        "standing": "G",
        "year": 4,
        "last_attendance_time": "2025-03-16 00:00:00",
        "status": "present"  # Ready for tracking
    },
    "852741": {
        "name": "Emly Blunt",
        "major": "Economics",
        "starting_year": 2021,
        "total_attendance": 0,
        "standing": "B",
        "year": 1,
        "last_attendance_time": "2025-03-16 00:00:00",
        "status": "present"
    },
    "963852": {
        "name": "Elon Musk",
        "major": "Physics",
        "starting_year": 2020,
        "total_attendance": 0,
        "standing": "G",
        "year": 2,
        "last_attendance_time": "2025-03-16 00:00:00",
        "status": "present"
    }
}

# Push data to Firebase
for key, value in data.items():
    ref.child(key).set(value)

print("✅ Student data added successfully with 'status' field!")
