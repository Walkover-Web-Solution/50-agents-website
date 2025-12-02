'use client';

import Image from 'next/image';

const securityGridData = [
    {
        title: 'SOC 2-Level Security',
        description:
            "Your AI agent’s tasks and connected apps are handled with strict security, privacy, and confidentiality standards.",
        iconName: 'shield-alt',
    },
    {
        title: 'Industry-Standard Protection',
        description:
            "We follow proven international security practices to keep your data and automations stable, reliable, and safe.",
        iconName: 'certificate',
    },
    {
        title: 'GDPR & CCPA-Aligned',
        description: "Your information stays private and fully under your control.\n We respect modern data-privacy laws at every level of the platform.",
        iconName: 'user-shield',
    },
    {
        title: 'Full Transparency',
        description:
            "See exactly what your AI agents do with clear logs, real-time tracking, and complete visibility into every step of their workflow.",
        iconName: 'eye',
    },
    {
        title: '99.99% Uptime & Fast Support',
        description: 'Your agents work around the clock with high availability, consistent performance, and quick help when you need it.',
        iconName: 'clock',
    },
    {
        title: 'Smart Error Handling',
        description:
            'If something goes wrong, AI-powered detection fixes issues early and keeps your automations running smoothly without interruptions.',
        iconName: 'bug',
    },
];

const SecuritySection = () => {
    return (
        <div className="container">
            <div className="p-6 md:p-12 bg-[#14486f] cont gap-8">
                <div className="flex lg:flex-row flex-col justify-between gap-4 lg:gap-20 mr-8 items-center mb-8">
                    <div className="gap-1">
                        <h2 className="h2 text-white">50Agents is the Trusted Choice for Building Secure AI Agents</h2>
                        <h3 className="sub__h1 text-white">
                            Your AI agents run safely with us—secure, private, and designed with protection in mind at every step, so you can automate confidently.
                        </h3>
                    </div>
                    <div className="flex gap-4">
                        <Image src="/assets/img/aicpa-soc-badge.webp" alt="aicpa soc badge" width={100} height={100} className="w-[100px] h-[100px]" />
                        <Image src="/assets/img/iso-certified.webp" alt="iso certified badge" width={100} height={100} className="w-[100px] h-[100px]" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border border-white border-t-0 border-r-0">
                    {securityGridData.map((item, index) => (
                        <div key={index} className="cont gap-1 py-12 px-8 border border-white border-b-0 border-l-0">
                            <h4 className="h3 text-white">{item.title}</h4>
                            <p className="sub__h2 text-white">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecuritySection;
