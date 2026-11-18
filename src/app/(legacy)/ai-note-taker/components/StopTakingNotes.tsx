'use client';

import Image from 'next/image';

const StopTakingNotes = () => {
    return (
        <div className="container">
            <div className="p-6 md:p-12 border border-dark border-t-0 border-b-0 flex gap-12 justify-center md:flex-row flex-col items-center">
                <div className="content-wrapper w-full md:w-[60%]">
                    <h2 className="h2">Stop taking notes. Start having better meetings.</h2>
                    <p className="sub__h2">Every meeting is recorded and turned into clean, readable notes the moment it ends. You don’t need to write anything during the call or rewatch recordings later.</p>
                    <p className="sub__h2">While you focus on the discussion, 50agents automatically captures the important points, decisions, and next steps. When the meeting ends, everything is already documented and ready to share, so everyone leaves with clarity.</p>
                </div>
                <div className="image-wrapper w-full md:w-[40%]">
                    <Image src="/assets/img/stopnotes.gif" alt="Stop taking notes" width={600} height={400} className="w-auto h-auto mx-auto" />
                </div>
            </div>
        </div>
    );
};

export default StopTakingNotes;
