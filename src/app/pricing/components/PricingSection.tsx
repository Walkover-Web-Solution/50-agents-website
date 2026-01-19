'use client';

import { Clock, DollarSign, Zap } from 'lucide-react';

const PricingSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="h1">Affordable Pricing</h1>
          <p className="sub__h1 max-w-2xl mx-auto leading-relaxed">
            Simple, transparent pricing that scales with your business needs.
            <br />
            No monthly commitments, no hidden fees.
          </p>
        </div>

        <div className="relative max-w-lg mx-auto">
          {/* Popular Badge */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <span className="bg-base border border-dark text-black font-bold px-6 py-2 rounded-full text-sm">
              Most Popular
            </span>
          </div>

          {/* Pricing Card */}
          <div className="bg-gray-light border-2 border-dark rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            {/* Background Gradient */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20"></div> */}

            <div className="relative z-10 text-center space-y-8">
              {/* Price */}
              <div className="flex items-baseline justify-center space-x-2">
                <DollarSign size={32} className="text-black" />
                <span className="text-6xl font-extrabold text-black leading-none">0.99</span>
                <span className="text-xl font-medium text-gray-dark">per Hour</span>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <Clock size={20} className="text-green-400" />
                  <span className="text-gray-dark font-medium">No monthly commitment. No hidden fees.</span>
                </div>
                <div className="flex items-start justify-center space-x-2">
                  <Zap size={20} className="text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-dark font-medium text-center">
                    Pay only for what you use — the lowest price in the industry, period.
                  </span>
                </div>
              </div>

              {/* Highlight */}
              <div className="bg-base border border-dark rounded-2xl p-4">
                <p className="text-gray-dark font-semibold">🎯 Start with meetings, scale to full AI automation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
