'use client';

import EastIcon from '@mui/icons-material/East';
import Link from 'next/link';

export default function HeroWorkManagement() {
    return (
        <div className="container pt-12">
            <div className="px-6 md:px-12 py-20 border border-dark border-t-0 border-b-0">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center flex-col mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✨</span>
                                <span className="text-sm font-semibold uppercase tracking-wider text-gradient">
                                    AI-Powered Work Management
                                </span>
                            </div>
                            <div className="bg-gradient h-[2px] w-[200px]" />
                        </div>

                        <h1 className="h1 mb-6 leading-tight">
                            Work Management — AI-Powered Execution for Modern Teams
                        </h1>

                        <p className="sub__h1 max-w-3xl mx-auto mb-8">
                            Plan, track, and finish projects using smart categories, custom views, and AI that handles the "busywork" for you, all in one easy-to-use home for your team.
                        </p>

                        <Link href="https://work.50agents.com/?utm_source=50agents&utm_medium=website" target="_blank">
                            <button className="btn btn-primary transition-all duration-300 hover:scale-105 group relative overflow-hidden">
                                <span className="transition-transform duration-300 group-hover:-translate-x-3">Get Started for Free</span>
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"><EastIcon /></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


