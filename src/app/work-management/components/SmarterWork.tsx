'use client';

import { Home, AutoAwesome, Tune, Refresh, SvgIconComponent } from '@mui/icons-material';

interface Benefit {
    icon: SvgIconComponent;
    title: string;
    description: string;
}

const benefits: Benefit[] = [
    { icon: Home, title: 'One Home for Everything', description: 'No more switching between five different apps.' },
    { icon: AutoAwesome, title: 'AI Assistant', description: 'Let the AI organize your dashboard while you focus on the hard parts.' },
    { icon: Tune, title: 'Total Flexibility', description: 'Build the exact system your team needs in minutes.' },
    { icon: Refresh, title: 'Real-Time Updates', description: 'See what is happening as it happens.' }
];

const SmarterWork = () => {
    return (
        <div className="container">
            <div className="p-6 md:p-12 border border-dark border-t-0 border-b-0">
                <div className="mx-auto text-center">
                    <h2 className="h2 mb-6">Smarter Work, Less Stress</h2>
                    <p className="sub__h2 mb-12 max-w-2xl mx-auto">
                        Most task boards are just digital "to-do" lists that get messy fast. Work Management is different. It brings structure and intelligence to your day. Whether you are fixing bugs, planning a school project, or launching a new product, our platform adapts to you—not the other way around.
                    </p>

                    <div>
                        <h3 className="text-xl font-bold mb-6">Why Teams Love Us:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <div key={index} className="px-4 py-6 md:py-8 bg-gray-light border border-light rounded-xl transition-all duration-200 hover:!border-gray-400/50">
                                        <Icon className="text-dark mb-3" fontSize="small" />
                                        <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                                        <p className="text-gray-light">{benefit.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmarterWork;
