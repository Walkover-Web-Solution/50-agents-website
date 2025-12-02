'use client';

import FAQSection from '../../../../components/FAQSection';

interface FAQsForSpecificServiceProps {
  serviceName: string;
  platformName?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQsForSpecificService({ serviceName, platformName = '50Agents' }: FAQsForSpecificServiceProps) {

  const faqs: FAQItem[] = [
    {
      question: `What is the ${serviceName} AI Agent?`,
      answer: `The ${serviceName} AI Agent lets you perform any action inside ${serviceName} just by describing what you want in simple language. It understands your intent and executes tasks instantly through ${platformName}.`,
    },
    {
      question: `How does the ${serviceName} AI Agent work?`,
      answer: `You simply ask the ${serviceName} AI Agent what you want to do — like "create a new deal," "send a message," or "update a record." The agent connects directly to ${serviceName} and performs the task for you in seconds.`,
    },
    {
      question: `Do I need technical skills to use the ${serviceName} AI Agent?`,
      answer: `No. ${platformName} is built for everyone — you don't need coding or setup knowledge. Just log in, connect ${serviceName}, and start typing natural prompts to get work done.`,
    },
    {
      question: `How does ${platformName} keep my ${serviceName} data secure?`,
      answer: `Your connection to ${serviceName} is fully encrypted and handled through official APIs or OAuth. ${platformName} never stores sensitive data and maintains secure, session-based access for all actions.`,
    },
    {
      question: `Can I collaborate with my team using the ${serviceName} AI Agent?`,
      answer: `Absolutely. Teams can share access, delegate commands, and collaborate in real time while staying inside ${platformName}. Each member can interact with ${serviceName} through the same intuitive chat interface.`,
    },
    {
      question: `Why use ${platformName} for ${serviceName}?`,
      answer: `Because it transforms how you interact with ${serviceName} — no menus, no manual clicks, no searching through settings. You just describe what you want done, and the agent does it instantly.`,
    },
  ];

  return (
    <FAQSection subHeading={`Everything you need to know about the ${serviceName} AI Agent`} faqs={faqs} />
  );
}
