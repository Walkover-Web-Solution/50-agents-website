'use client';
import EastIcon from '@mui/icons-material/East';
import Image from 'next/image';

const BuiltForTeams = () => {
    return (
        <div className="container">
            <div className="px-6 md:px-12 py-28 border border-dark border-t-0 border-b-0 text-center">
                <h2 className="h2">Built for teams with frequent meetings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
                    <div className="max-w-[300px] mx-auto">
                        <div className='bg-[#812ff6]'>
                            <h2 className="text-2xl font-semibold pt-4 text-white text-center">Sales</h2>
                        </div>
                        <div className="relative">
                            <div className="absolute top-1 left-0 right-0 z-50 max-w-[290px] mx-auto">
                                <p className="text-white text-center text-sm px-2">Sales teams can review conversations and move deals forward faster.</p>
                            </div>
                            <Image src="/assets/img/sales.png" alt="Sales team" width={400} height={300} />
                        </div>
                    </div>

                    <div className="max-w-[300px] mx-auto">
                        <div className="bg-[#4162fe]">
                            <h2 className="text-2xl font-semibold pt-4 text-white text-center">HR</h2>
                        </div>

                        <div className="relative">
                            <div className="absolute top-1 left-0 right-0 z-50 max-w-[290px] mx-auto">
                                <p className="text-white text-center text-sm px-2">HR teams can document interviews and discussions without extra effort.</p>
                            </div>
                            <Image src="/assets/img/hr.png" alt="HR team" width={400} height={300} />
                        </div>
                    </div>

                    <div className="max-w-[300px] mx-auto">
                        <div className="bg-[#f64a8b]">
                            <h2 className="text-2xl font-semibold pt-4 text-white text-center">Education</h2>
                        </div>
                        <div className="relative">
                            <div className="absolute top-1 left-0 right-0 z-50 max-w-[290px] mx-auto">
                                <p className="text-white text-center text-sm px-2">Students focus on learning during classes and discussions.</p>
                            </div>
                            <Image src="/assets/img/education.png" alt="Education team" width={400} height={300} />
                        </div>
                    </div>

                    <div className="max-w-[300px] mx-auto">
                        <div className="bg-[#fcbb1d]">
                            <h2 className="text-2xl font-semibold pt-4 text-white text-center">Consulting</h2>
                        </div>
                        <div className="relative">
                            <div className="absolute top-1 left-0 right-0 z-50 max-w-[290px] mx-auto">
                                <p className="text-white text-center text-sm px-2">Consultants can capture client discussions and decisions with clarity.</p>
                            </div>
                            <Image src="/assets/img/consulting.png" alt="Consulting team" width={400} height={300} />
                        </div>
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                    <button className="btn btn-primary transition-all duration-300 hover:scale-105 group relative overflow-hidden" onClick={() => { }}>
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

export default BuiltForTeams;

