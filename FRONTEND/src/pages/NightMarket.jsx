import React from "react";
import { motion } from "framer-motion";

const buyStalls = [
  {
    name: "Red Bull",
    image:
      "https://imgs.search.brave.com/9CCZaNy7u7-nAvc400YjXqgQpDENdIKB29a5kA89rjE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q0Lzdi/LzgwL2Q0N2I4MDA0/YjVkNGIwNjkwZGFh/N2NhMGVlYjljMGFj/LmpwZw",
  },
  {
    name: "Medicine",
    image:
      "https://imgs.search.brave.com/MxZZUiXtcagXX3rf-yCxdh5HcOFTHfXb7TIQEqb2Eg4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmV0bWVkcy5jb20v/aW1hZ2VzL3Byb2R1/Y3QtdjEvNjAweDYw/MC80NTI5Ni9kb2xv/XzY1MF90YWJsZXRf/MTVzXzM1MjgxXzBf/My5qcGc",
  },
  {
    name: "Maggie",
    image:
      "https://imgs.search.brave.com/8-AxAXVfe3V6N7uIlkJJQo-b7dFc5KaxoCTmvem2XRg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZTMubW91dGhzaHV0/LmNvbS9pbWFnZXMv/aW1hZ2VzcC85MjUw/NDIzNDZzLmpwZw",
  },
];

const sellStalls = [
  {
    name: "Coffee",
    image:
      "https://imgs.search.brave.com/kIO9NUfhWSKxgk8N2pHHzSGovVXB3eq4toPEtR3Fy04/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cGljY2xpY2tpbWcu/Y29tL1poRUFBT1N3/NDBaZVhvNWwvR29s/ZC1DaG9pY2UtSW5z/dGFudC1XaGl0ZS1D/b2ZmZWUtQ2FwcHVj/Y2luby0yMC1TYWNo/ZXRzLndlYnA",
  },
  {
    name: "Handmade DBMS Class Notes",
    image:
      "https://imgs.search.brave.com/J-HOoyOBP5MhA51WiTEcOlsvFeEKf4QoB2yN89oKdiQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/YnV6emZlZWQuY29t/L2J1enpmZWVkLXN0/YXRpYy9zdGF0aWMv/MjAyNS0wMy8xMi8x/NC9zdWJidXp6L01Z/ZnJ5ajNUMS5qcGc_/Y3JvcD0yODc6MzA5/OzM5NSwxNTY",
  },
  {
    name: "Merchandise",
    image:
      "https://imgs.search.brave.com/d540yoHya72Hc5Riql6Ku1eCeH2gsCD422f-WTE_v2A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kMnox/MXNubml3eWk1Mi5j/bG91ZGZyb250Lm5l/dC9pbWFnZXMvcmVk/ZXNpZ24vMjAyNC90/b3MvbWVyY2hhbmRp/c2UtaGlnaGxpZ2h0/LnBuZw",
  },
];

export default function NightMarket() {
  return (
    <div className="bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-black text-white min-h-screen py-16 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold text-center mb-8 text-purple-400 drop-shadow-2xl tracking-wide"
      >
        🌙 Night Market
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-center text-gray-300 mb-16 text-xl max-w-3xl mx-auto"
      >
        Experience a vibrant marketplace under the stars with exclusive stalls,
        delicious food, and live entertainment!
      </motion.p>

      {/* Buy Section */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          🛍️ Buy Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {buyStalls.map((stall, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="bg-[#22203f] rounded-xl overflow-hidden shadow-xl border border-yellow-500 transform transition-all duration-500 hover:shadow-yellow-500/50"
            >
              <img
                src={stall.image}
                alt={stall.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-yellow-300">
                  {stall.name}
                </h2>
                <button className="mt-4 w-full bg-yellow-500 text-gray-900 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition duration-300">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sell Section */}
      <div>
        <h2 className="text-4xl font-bold text-green-400 mb-8 text-center">
          📢 Sell Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {sellStalls.map((stall, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: -2 }}
              className="bg-[#22203f] rounded-xl overflow-hidden shadow-xl border border-green-500 transform transition-all duration-500 hover:shadow-green-500/50"
            >
              <img
                src={stall.image}
                alt={stall.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-green-300">
                  {stall.name}
                </h2>
                <button className="mt-4 w-full bg-green-500 text-gray-900 py-3 rounded-xl font-semibold hover:bg-green-400 transition duration-300">
                  List for Sale
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
