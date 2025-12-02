'use client';

const MissionSection = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="text-center mb-8">
        <h2 className="h2 mb-2">Mission</h2>
        <p className="sub__h2 max-w-3xl mx-auto">
          To redefine teamwork by creating autonomous AI agents that take on the tasks AI does best—so humans can do
          what only humans can.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="bg-base border border-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:!border-blue-500 h-full rounded-2xl"
        >
          <div className="p-8 space-y-6">
            <div className="w-15 h-15 rounded-full bg-[rgba(59,130,246,0.1)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.657 6.657l-2.121-2.121M8.464 8.464L6.343 6.343m0 11.314l2.121-2.121m8.486-8.486l2.121-2.121" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="text-black font-bold text-lg">Our Vision</h3>
            <p className="text-gray-dark leading-[1.7]">
              AI teammates that understand context, learn from your team, and handle routine tasks seamlessly.
            </p>
          </div>
        </div>

        <div
          className="bg-base border border-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:!border-green-500 h-full rounded-2xl"
        >
          <div className="p-8 space-y-6">
            <div className="w-15 h-15 rounded-full bg-[rgba(34,197,94,0.1)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx="16" cy="11" r="4" />
              </svg>
            </div>
            <h3 className="text-black font-bold text-lg">Human Impact</h3>
            <p className="text-gray-dark leading-[1.7]">
              Freeing humans to focus on creativity, strategy, and meaningful relationships that drive innovation.
            </p>
          </div>
        </div>

        <div
          className="bg-base border border-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:!border-orange-400 h-full rounded-2xl"
        >
          <div className="p-8 space-y-6">
            <div className="w-15 h-15 rounded-full bg-[rgba(251,146,60,0.1)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="#fb923c" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V19a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
              </svg>
            </div>
            <h3 className="text-black font-bold text-lg">The Future</h3>
            <p className="text-gray-dark leading-[1.7]">
              Starting with meetings, expanding to comprehensive AI collaboration across all business processes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
