'use client';
import Image from 'next/image';


const NoMoreManual = () => {
    return (
        <div className="container">
            <div className="p-6 md:p-12 border border-dark border-t-0 border-b-0 flex gap-12 items-center justify-center md:flex-row flex-col">
                <div className="w-full md:w-[35%]">
                    <Image src="/assets/img/followup.gif" alt="Follow-ups example" width={600} height={400} className="w-auto h-auto mx-auto" />
                </div>
                <div className="w-full md:w-[65%]">
                    <h2 className="h2">No more manual follow-ups. Everything stays organized.</h2>
                    <p className="sub__h2">Meetings shouldn’t create more work after they end. With 50agents, decisions, tasks, and follow-ups are captured automatically and kept in one structured place. You don’t need to chase updates, send reminders, or copy notes into other tools.</p>
                    <p className="sub__h2">Your team always knows what was discussed, what was decided, and what needs to happen next — without extra effort or repeated conversations.</p>
                </div>
            </div>
        </div>
    );
};

export default NoMoreManual;
