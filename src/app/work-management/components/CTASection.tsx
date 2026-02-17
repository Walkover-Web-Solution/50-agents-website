'use client';

import EastIcon from '@mui/icons-material/East';
import Link from 'next/link';

const CTASection = () => {
    return (
        <div className="container">
            <div className="p-6 md:p-12 border border-dark border-t-0 border-b-0">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="h2 mb-6">Upgrade How Your Team Works</h2>
                    <p className="sub__h2 max-w-2xl mx-auto">Stop managing work the hard way.</p>
                    <p className="sub__h2 max-w-2xl mx-auto mb-10">
                        Organize tasks, automate processes, and keep your team aligned with intelligent work management.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="https://work.50agents.com/?utm_source=50agents&utm_medium=website" target="_blank">
                            <button className="btn btn-primary transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                                <span className="transition-transform duration-300 group-hover:-translate-x-3">Get Started for Free</span>
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <EastIcon />
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTASection;
