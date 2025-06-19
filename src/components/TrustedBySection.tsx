
import React from 'react';

const TrustedBySection = () => {
  const companies = [
    'Company A', 'Company B', 'Company C', 'Company D', 'Company E', 'Company F', 'Company G', 'Company H'
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Trusted by leading real estate companies across Africa
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Join hundreds of businesses managing their properties with ProptyOS
          </p>
        </div>

        {/* Logo Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-8">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-20 bg-white dark:bg-gray-700 rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <span className="text-gray-400 dark:text-gray-500 font-medium text-sm">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrustedBySection;
