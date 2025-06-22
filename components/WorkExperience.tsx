import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import ExperienceCardMS from "./ExpCards/ExperienceCardMS";
import ExperienceCardTut from "./ExpCards/ExperienceCardTut";
import ExperienceCardLVBT from "./ExpCards/ExperienceCardLVBT";
import ExperienceCardDS from "./ExpCards/ExperienceCardDS";
import ExperienceCardCanLife from "./ExpCards/ExperienceCardCanLife";
import ExperienceCardCanLife2 from "./ExpCards/ExperienceCardCanLife2";

type Props = {};

function WorkExperience({}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.clientWidth * 0.8; 
    
    container.scrollTo({
      left: container.scrollLeft - cardWidth,
      behavior: 'smooth'
    });
    
    setTimeout(checkScrollButtons, 300);
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = container.clientWidth * 0.8; 
    
    container.scrollTo({
      left: container.scrollLeft + cardWidth,
      behavior: 'smooth'
    });
    
    setTimeout(checkScrollButtons, 300);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
      }}
      className="flex relative flex-col h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>

      <div className="relative w-full">
        {/* Left Arrow Button */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 
            w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
            ${canScrollLeft 
              ? 'bg-[#F7AB0A] hover:bg-[#F7AB0A]/80 text-black hover:scale-110 shadow-lg' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="w-full flex space-x-5 overflow-x-hidden p-10 snap-x snap-mandatory mx-12"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <ExperienceCardCanLife />
          <ExperienceCardCanLife2 />
          <ExperienceCardMS />
          <ExperienceCardDS />
          <ExperienceCardLVBT />
          <ExperienceCardTut />
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`absolute -right-32 top-1/2 transform -translate-y-1/2 z-10 
            w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
            ${canScrollRight 
              ? 'bg-[#F7AB0A] hover:bg-[#F7AB0A]/80 text-black hover:scale-110 shadow-lg' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
          </button>
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}

export default WorkExperience;