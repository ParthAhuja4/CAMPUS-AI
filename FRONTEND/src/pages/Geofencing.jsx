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
        [28.67921, 77.260985], // Additional point to form a polygon
      ],
    },
    {
      name: "Block C",
      coordinates: [
        [28.678495667350244, 77.26138725684625], // Entry point
        [28.678429778497495, 77.26108819056988], // Exit point
        [28.67845, 77.2612],
      ],
    },
    {
      name: "Canteen",
      coordinates: [
        [28.6788, 77.2616],
        [28.67885, 77.26165],
        [28.67882, 77.26155],
      ],
    },
    {
      name: "Main Ground",
      coordinates: [
        [28.6783, 77.262],
        [28.67835, 77.26205],
        [28.67832, 77.26195],
      ],
    },
    {
      name: "Football Ground",
      coordinates: [
        [28.678, 77.2625],
        [28.67805, 77.26255],
        [28.67802, 77.26245],
      ],
    },
    {
      name: "Parking Area",
      coordinates: [
        [28.6778, 77.2609],
        [28.67785, 77.26095],
        [28.67782, 77.26085],
      ],
    },
  ];

  const [userPosition, setUserPosition] = useState(null);
  const [currentBlock, setCurrentBlock] = useState("Inside IT block");

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
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
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
