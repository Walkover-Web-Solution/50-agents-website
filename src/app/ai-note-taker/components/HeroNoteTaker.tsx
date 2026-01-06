'use client';

import Image from 'next/image';
import EastIcon from '@mui/icons-material/East';
import { useRouter } from 'next/navigation';

const meetingApps = [
    {
        src: 'https://thingsofbrand.com/api/icon/teams.microsoft.com',
        alt: 'microsoft icon',
    },
    {
        src: 'https://stuff.thingsofbrand.com/zoom.us/images/img688a247e14_zoom.jpg',
        alt: 'zoom icon',
    },
    {
        src: 'https://thingsofbrand.com/api/icon/meet.google.com',
        alt: 'google meet icon'
    },
    {
        src: 'https://storage.googleapis.com/tob_dev/calendar.google.com/images/img8_calendargooglecomFavicon.png',
        alt: 'google calendar icon'
    },
    {
        src: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
        alt: 'slack icon',
    }
];

const HeroNoteTaker = () => {
    const router = useRouter();
    const handleLoginClick = () => {
        router.push(`${process.env.NEXT_PUBLIC_INTERNAL_URL}/login`);
    };
    return (
        <div className="container pt-12">
            <div className="px-6 md:px-12 py-20 border border-dark border-t-0 border-b-0 text-center">
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {meetingApps.map((app, index) => (
                        <div key={index} className={`rounded-full sm:w-12 sm:h-12 h-8 w-8 p-2 shadow-lg ${index === 0 || index === 4 ? 'mt-4' : index === 1 || index === 3 ? 'mt-2' : ''}`}>
                            <Image
                                src={app.src}
                                alt={app.alt}
                                width={48}
                                height={48}
                            />
                        </div>
                    ))}
                </div>
                <h1 className="h1 mb-6">AI Meeting Recorder & Note Taker</h1>
                <p className="sub__h1">We record your meetings. You focus on the discussion.</p>
                <div className="my-6">
                    <p className="sub__h2">50agents records your meetings, writes the notes, and creates clear summaries automatically.</p>
                    <p className="sub__h2"> No typing. No rewinding. No missed details.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                    <button className="btn btn-primary transition-all duration-300 hover:scale-105 group relative overflow-hidden" onClick={handleLoginClick}>
                        <span className="transition-transform duration-300 group-hover:-translate-x-3">Start recording meetings for free</span>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"><EastIcon /></span>
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => window.open("https://chromewebstore.google.com/detail/50-agents/cbnmcgaklkfcengkfcheejpkjghilfio?hl=en-GB&utm_source=meeting-configure", "_blank")}
                    >
                        <Image src="/assets/img/chrome-icon.png" alt="Chrome Icon" className="mr-2" width={24} height={24} />
                        Download Chrome Extension
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroNoteTaker;