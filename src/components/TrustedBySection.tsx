
import React, { useEffect, useRef } from 'react';

const TrustedBySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const companies = [
    "African Properties Ltd", "Lagos Estate Co", "Nairobi Homes", 
    "Cape Town Properties", "Accra Real Estate", "Kampala Estates",
    "Dar es Salaam Properties", "Abuja Holdings"
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    
    let scrollPosition = 0;
    const speed = 1;

    const scroll = () => {
      scrollPosition += speed;
      if (scrollPosition >= scrollWidth - clientWidth) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const interval = setInterval(scroll, 30);

    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => {
      const newInterval = setInterval(scroll, 30);
      return () => clearInterval(newInterval);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(interval);
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Trusted by leading real estate companies across Africa
          </h2>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden space-x-12 cursor-pointer"
          style={{ scrollBehavior: 'smooth' }}
        >
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="flex-shrink-0 h-16 w-48 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <span className="text-gray-600 font-medium text-sm text-center px-4">
                {company}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
