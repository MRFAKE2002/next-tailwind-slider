"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { images, descriptions } from "../data/index";

function Slider() {
  const [index, setIndex] = useState(0);
  const [rotations, setRotations] = useState<number[]>([]);

  // ایجاد مقادیر چرخش تصادفی فقط یک بار
  useEffect(() => {
    const generated = images.map(() => Math.floor(Math.random() * 41) - 20); // از -20 تا 20 درجه
    setRotations(generated);
  }, []);

  if (rotations.length !== images.length) return null;

  return (
    <div className="relative">
      <div className="flex gap-x-20 lg:items-start items-center lg:flex-row flex-col">
        {/* Images Stack */}
        <div className="sm:w-[400px] sm:h-[400px] w-[300px] h-[300px] relative">
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              alt="image"
              className={`w-full h-full absolute object-cover rounded-3xl transition-all duration-500 ${
                i === index ? "z-20 scale-100 opacity-100" : "z-10 scale-90 opacity-70"
              }`}
              style={{
                transform: `rotate(${i === index ? 0 : rotations[i]}deg)`,
              }}
            />
          ))}
        </div>

        {/* Descriptions */}
        <div className="relative sm:w-[400px] w-[320px] mt-22 lg:mt-5 h-[100px]">
          {descriptions.map((description, i) => (
            <p
              key={i}
              className={`text-center sm:text-xl text-gray-600 absolute transition-all duration-300 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {description}
            </p>
          ))}
        </div>

        {/* Buttons */}
        <div className="absolute bottom-0 lg:-bottom-20 left-1/2 -translate-x-1/2 flex gap-x-5">
          <button
            className="bg-gray-100 p-1.5 cursor-pointer rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
            onClick={() =>
              setIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
              )
            }
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className="bg-gray-100 p-1.5 cursor-pointer rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
            onClick={() =>
              setIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
              )
            }
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
