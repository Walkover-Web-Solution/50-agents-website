'use client';
import Image from 'next/image';


const NoMoreManual = () => {
    return (
        <div className="container">
            <div className="p-6 md:p-12 border border-dark border-t-0 border-b-0 flex gap-12 items-center justify-center md:flex-row flex-col">
                <div className="w-full md:w-[35%]">
                    <Image src="/assets/img/followup.gif" alt="Follow-ups example" width={600} height={400} className="w-auto h-auto mx-auto" />
                </div>
                <div className="w-full md:w-[65%] space-y-4">
                    <h2 className="h2">No more manual follow-ups. Everything stays organized.</h2>
                    <p className="sub__h2">Stop updating tools after meetings. Stop chasing updates.</p>
                    <p className="sub__h2">50agents captures decisions, tasks, and follow-ups automatically and keeps conversations structured in one place. Your team always knows what was discussed and what needs to happen next.</p>

                    <p className="sub__h2">Work moves forward faster. Your day stays simple. No confusion. No extra effort.</p>
                </div>
            </div>
        </div>
    );
};

export default NoMoreManual;
