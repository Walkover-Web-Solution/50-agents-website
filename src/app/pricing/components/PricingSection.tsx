'use client';

import { Clock, DollarSign, Star, Zap } from 'lucide-react';

const PricingSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="h1">Affordable Pricing</h1>
          <p className="sub__h1 max-w-2xl mx-auto leading-relaxed">
            Simple, transparent pricing that scales with your business needs.
            <br />
            No monthly commitments, no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">

          {/* AI Note Taker Card */}
          <div className="bg-gray-light border-2 border-dark/20 hover:border-dark rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col group">
            <div className="absolute top-0 right-0 bg-base border-b-2 border-l-2 border-dark/20 group-hover:border-dark text-black font-bold px-4 py-1 rounded-bl-xl text-sm z-10 shadow-sm transition-colors duration-300">
              AI Note Taker
            </div>
            {/* Popular Badge */}
            <div className="absolute top-0 left-0 bg-black border-b-2 border-r-2 border-black text-white font-bold px-4 py-1 rounded-br-xl text-xs flex items-center shadow-sm uppercase tracking-widest z-20">
              <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1.5" />
              Most Popular
            </div>

            <div className="relative z-10 text-center space-y-8 flex-1 flex flex-col justify-between mt-8">
              <div className="space-y-4">
                {/* Price */}
                <div className="flex items-baseline justify-center space-x-2">
                  <DollarSign size={32} className="text-black" />
                  <span className="text-6xl font-extrabold text-black leading-none">0.99</span>
                  <span className="text-xl font-medium text-gray-dark">/ Hour</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center space-x-3 text-left w-full max-w-xs mx-auto">
                  <Clock size={20} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-dark font-medium">No monthly commitment. No hidden fees.</span>
                </div>
                <div className="flex items-start justify-center space-x-3 text-left w-full max-w-xs mx-auto">
                  <Zap size={20} className="text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-dark font-medium">
                    Pay only for what you use — the lowest price in the industry, period.
                  </span>
                </div>
              </div>

              {/* Highlight */}
              <div className="bg-white border border-dark/10 group-hover:border-dark/30 rounded-2xl p-4 mt-auto shadow-sm transition-colors duration-300">
                <p className="text-gray-dark font-bold">🎯 Start with meetings, scale to full AI automation</p>
              </div>
            </div>
          </div>

          {/* Internal Application Card */}
          <div className="bg-gray-light border-2 border-dark/20 hover:border-dark rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col group">
            <div className="absolute top-0 right-0 bg-base border-b-2 border-l-2 border-dark/20 group-hover:border-dark text-black font-bold px-4 py-1 rounded-bl-xl text-sm z-10 shadow-sm transition-colors duration-300">
              Internal Application
            </div>

            <div className="relative z-10 text-center space-y-8 flex-1 flex flex-col justify-between mt-8">
              <div className="space-y-4">
                {/* Price */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="text-6xl font-extrabold text-black leading-none">Free</span>
                  <span className="text-xl font-medium text-gray-dark">First 1,000 calls / month</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6 flex-1 flex flex-col justify-center">
                <div className="flex items-start justify-center space-x-3 text-left w-full max-w-xs mx-auto">
                  <Zap size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-dark font-medium">
                    Build and deploy AI agents for your internal tools and applications.
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-left w-full max-w-xs mx-auto">
                  <DollarSign size={20} className="text-blue-500 flex-shrink-0" />
                  <span className="text-gray-dark font-medium">Standard pricing applies after 1,000 calls.</span>
                </div>
              </div>

              {/* Highlight */}
              <div className="bg-white border border-dark/10 group-hover:border-dark/30 rounded-2xl p-4 mt-auto shadow-sm transition-colors duration-300">
                <p className="text-gray-dark font-bold">🚀 Empower your team with intelligent agents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
