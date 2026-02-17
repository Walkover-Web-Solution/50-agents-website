'use client';

import { Visibility, AutoAwesome, CheckCircle } from '@mui/icons-material';

interface Automation {
    title: string;
    description: string;
}

const viewExamples: string[] = [
    '"Show me high-priority bugs assigned to me this week"',
    '"What features are waiting for my review?"'
];

const automations: Automation[] = [
    { title: 'Status Changes', description: 'When a task is marked "Done," automatically tell the manager.' },
    { title: 'Auto-Assign', description: 'Send new bugs straight to the right developer.' },
    { title: 'AI Summaries', description: 'Let the AI read long updates and give you a 3-sentence summary.' }
];

const AISecretWeapon = () => {
    return (
        <div className="container">
            <div className="p-6 md:p-12 border border-dark border-t-0 border-b-0">
                    <div className="mb-12 text-center">
                        <h2 className="h2 mb-4">AI Intelligence: Your New Secret Weapon</h2>
                        <p className="sub__h2 max-w-2xl mx-auto">
                            We put AI to work so you don't have to manually filter through hundreds of tasks.
                        </p>
                    </div>

                    <div className="flex flex-col gap-16">
                        <div className="w-full flex justify-between flex-col md:flex-row gap-12 items-center">
                            <div className="w-full md:max-w-[65%] md:w-fit">
                                <div className="flex items-center gap-3 mb-6">
                                    <Visibility className="text-black" fontSize="small" />
                                    <h3 className="text-2xl font-bold">Custom Views</h3>
                                </div>
                                <p className="sub__h2 mb-6">
                                    Just type what you want in plain English and the AI builds the view instantly:
                                </p>
                                <div className="space-y-3 mb-6 max-w-xl">
                                    {viewExamples.map((example, index) => (
                                        <div key={index} className="flex items-start gap-3 p-4 bg-base rounded-lg border border-dark">
                                            <span className="text-primary text-lg">💬</span>
                                            <p className="sub__h2 italic">{example}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:w-[35%]">
                                <img
                                    src="/assets/img/custom-views.png"
                                    alt="Team working on workflow optimization"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>

                        <div className="w-full flex justify-between flex-col-reverse md:flex-row gap-12 items-center">
                            <div className="w-full md:w-[35%]">
                                <img
                                    src="/assets/img/smart-automations.png"
                                    alt="Team working on workflow optimization"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="w-full md:max-w-[65%] md:w-fit">
                                <div className="flex items-center gap-3 mb-4">
                                    <AutoAwesome className="text-black" fontSize="small" />
                                    <h3 className="text-2xl font-bold">Smart Automations</h3>
                                </div>
                                <p className="sub__h2 mb-6">
                                    Create "If-This-Then-That" rules to save hours every week:
                                </p>
                                <div className="space-y-4">
                                    {automations.map((automation, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="text-green-600 flex-shrink-0 mt-1" fontSize="small" />
                                            <div>
                                                <h4 className="font-bold mb-1">{automation.title}</h4>
                                                <p className="sub__h2 text-sm">{automation.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default AISecretWeapon;
