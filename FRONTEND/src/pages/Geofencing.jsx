import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Geofencing() {
  // Define coordinates for college blocks and areas
  const collegeBlocks = [
    {
      name: "Block A",
      coordinates: [
        [28.679206706142132, 77.26100582675096], // Entry point
        [28.679197293515305, 77.26099509791594], // Exit point
        [28.679210000000000, 77.26098500000000], // Additional point to form a polygon
      ],
    },
    {
      name: "Block C",
      coordinates: [
        [28.678495667350244, 77.26138725684625], // Entry point
        [28.678429778497495, 77.26108819056988], // Exit point
        [28.678450000000000, 77.26120000000000],
      ],
    },
    {
      name: "Canteen",
      coordinates: [
        [28.678800, 77.261600],
        [28.678850, 77.261650],
        [28.678820, 77.261550],
      ],
    },
    {
      name: "Main Ground",
      coordinates: [
        [28.678300, 77.262000],
        [28.678350, 77.262050],
        [28.678320, 77.261950],
      ],
    },
    {
      name: "Football Ground",
      coordinates: [
        [28.678000, 77.262500],
        [28.678050, 77.262550],
        [28.678020, 77.262450],
      ],
    },
    {
      name: "Parking Area",
      coordinates: [
        [28.677800, 77.260900],
        [28.677850, 77.260950],
        [28.677820, 77.260850],
      ],
    },
  ];

  const [userPosition, setUserPosition] = useState(null);
  const [currentBlock, setCurrentBlock] = useState("Inside Block 2");

  // Function to check if the user is inside a polygon
  const isInsidePolygon = (point, polygon) => {
    let x = point[0],
      y = point[1];
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      let xi = polygon[i][0],
        yi = polygon[i][1];
      let xj = polygon[j][0],
        yj = polygon[j][1];
      let intersect =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        const position = [latitude, longitude];
        setUserPosition(position);

        // Check which block the user is in
        let foundBlock = "Outside all blocks";
        for (const block of collegeBlocks) {
          if (isInsidePolygon(position, block.coordinates)) {
            foundBlock = block.name;
            break;
          }
        }
        setCurrentBlock(foundBlock);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <h1>College Geofencing</h1>
      <button onClick={handleLocation}>Check My Location</button>
      <p>You are currently: {currentBlock}</p>
      <MapContainer
        center={[28.678495667350244, 77.26138725684625]} // Centered near Block C
        zoom={17} // Adjust zoom level to fit campus
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {collegeBlocks.map((block, index) => (
          <Polygon
            key={index}
            positions={block.coordinates}
            pathOptions={{ color: "blue" }}
          >
            <Popup>{block.name}</Popup>
          </Polygon>
        ))}
        {userPosition && (
          <Marker position={userPosition}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Geofencing;
