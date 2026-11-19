'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface FAQSectionProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  subHeading: string;
}

export default function FAQSection({ faqs, subHeading }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="relative z-10">
      <div>
        <div className="container">
          <div className="text-center py-12 px-6 border border-t-0 border-b-0 border-dark">
            <h2 className="h2">Frequently Asked Questions</h2>
            <p className="sub__h2 max-w-2xl mx-auto">{subHeading}</p>
          </div>
        </div>

        <div className="divider" />

        <div className="container">
          <div className="text-center py-12 px-6 border border-t-0 border-b-0 border-dark">
            <div className="max-w-5xl mx-auto space-y-4 py-16 px-6">
              {faqs.map((faq, index) => {
                const panelId = `faq-panel-${index}`;
                const isOpen = openItems.has(index);
                return (
                <AnimatedSection key={index} delay={index * 50}>
                  <div className="border rounded-xl overflow-hidden border-dark bg-base">
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between cursor-pointer"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      id={`faq-trigger-${index}`}
                    >
                      <h3 className="text-lg font-semibold text-black pr-4">{faq.question}</h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-dark flex-shrink-0" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-dark flex-shrink-0" aria-hidden="true" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5" id={panelId} role="region" aria-labelledby={`faq-trigger-${index}`}>
                        <div className="pt-2 border-t border-light text-left">
                          <p className="text-gray-dark leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              );})}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
