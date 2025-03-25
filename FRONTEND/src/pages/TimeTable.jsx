export default function RoomAllocation() {
  const rooms = [
    {
      id: 101,
      occupant: "DR. Sumita Jain",
      type: "Single",
      status: "Occupied",
      time: "8:00 AM - 9:00 AM",
    },
    {
      id: 102,
      occupant: "DR. Yogesh Sharma",
      type: "Double",
      status: "Vacant",
      time: "9:00 AM - 10:00 AM",
    },
    {
      id: 103,
      occupant: "Mrs. Isha Bhola",
      type: "Single",
      status: "Occupied",
      time: "10:00 AM - 11:00 AM",
    },
    {
      id: 104,
      occupant: "Mr. Suresh Kumar",
      type: "Double",
      status: "Vacant",
      time: "11:00 AM - 12:00 PM",
    },
    {
      id: 105,
      occupant: "Ms. Priya Verma",
      type: "Single",
      status: "Occupied",
      time: "12:00 PM - 1:00 PM",
    },
    {
      id: 106,
      occupant: "DR. Rakesh Mehta",
      type: "Double",
      status: "Vacant",
      time: "1:00 PM - 2:00 PM",
    },
  ];

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-12">
        University Room Allocation
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="p-6 bg-white shadow-md rounded-xl border border-gray-200 transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Room {room.id}
            </h2>
            <p className="text-gray-600 text-lg">
              Type:{" "}
              <span className="font-medium text-gray-700">{room.type}</span>
            </p>
            <p
              className={
                room.status === "Occupied"
                  ? "text-red-600 font-bold text-lg"
                  : "text-green-600 font-bold text-lg"
              }
            >
              {room.status}
            </p>
            <p className="text-gray-800 font-semibold text-lg">
              {room.occupant}
            </p>
            <p className="text-blue-500 font-semibold text-lg mt-3">
              Time: {room.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
