import { useState, useEffect, useRef } from "react";
import backgroundImage from "../Resources/bg.avif";
import mode1 from "../Resources/Modes/1.png";
import mode2 from "../Resources/Modes/2.png";
import mode3 from "../Resources/Modes/3.png";
import mode4 from "../Resources/Modes/4.png";

function Attendance() {
  const [message, setMessage] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [modeType, setModeType] = useState(0);
  const [studentsInfo, setStudentsInfo] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  let captureInterval = useRef(null);

  const modeImages = [mode1, mode2, mode3, mode4];

  useEffect(() => {
    if (isCameraOn) {
      startWebcam();
      captureInterval.current = setInterval(() => {
        captureAndSend();
      }, 5000);
    } else {
      stopWebcam();
      clearInterval(captureInterval.current);
    }
  }, [isCameraOn]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setMessage("Error accessing webcam");
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    clearInterval(captureInterval.current);
    setStudentsInfo([]);
  };

  const captureAndSend = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const imageData = canvasRef.current.toDataURL("image/jpeg");

    try {
      setModeType(1); // Loading mode
      const response = await fetch("http://localhost:5000/recognize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });

      const result = await response.json();

      if (result.status === "success") {
        setMessage("Students Recognized!");
        setStudentsInfo(result.students);
        setModeType(2); // Success mode
        setTimeout(() => setModeType(3), 5000); // Move to idle mode after success
      } else {
        setMessage("Face not recognized");
        setModeType(3); // Failure mode
        setStudentsInfo([]); // Clear student info on failure
      }
    } catch (error) {
      setMessage("Error recognizing face");
      setModeType(3); // Failure mode
      setStudentsInfo([]);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute w-full h-full object-cover"
      />
      <div className="relative flex flex-col items-center p-8 bg-opacity-80 bg-black rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">Attendance System</h1>
        <div className="relative mt-6">
          {isCameraOn && (
            <video
              ref={videoRef}
              autoPlay
              className="border-4 border-white rounded-lg"
              width="640"
              height="480"
            ></video>
          )}
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ display: "none" }}
          ></canvas>
          <img
            src={modeImages[modeType]}
            alt="Mode"
            className="absolute top-0 right-0 w-40 h-40"
          />
        </div>
        {studentsInfo.length > 0 && (
          <div className="mt-4 text-center bg-gray-800 p-4 rounded-lg">
            {studentsInfo.map((student) => (
              <div key={student.id} className="mb-4">
                <p className="text-lg font-semibold">{student.name}</p>
                <p className="text-md">ID: {student.id}</p>
                <p className="text-md">Major: {student.major}</p>
                <p className="text-md">Year: {student.year}</p>
                <p className="text-md">
                  Attendance: {student.total_attendance}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            className="px-4 py-2 bg-red-600 rounded-lg"
          >
            {isCameraOn ? "Stop Camera" : "Start Camera"}
          </button>
        </div>
        {message && <p className="mt-4 text-lg text-green-400">{message}</p>}
      </div>
    </div>
  );
}

export default Attendance;
