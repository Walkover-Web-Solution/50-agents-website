'use client';

import { RetroGrid } from "@/components/ui/retro-grid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EastIcon from '@mui/icons-material/East';

const HeroSection = () => {
    const router = useRouter();
    const handleLoginClick = () => {
        router.push(`${process.env.NEXT_PUBLIC_INTERNAL_URL}/login`);
    };
    return (
        <div className="container">
            <div className="w-full relative h-[180vh] overflow-hidden border mt-[-90vh] border-dark ">
                <RetroGrid />
                <div className="text-center absolute sm:bottom-[45vh] bottom-[20vh] px-4 w-full left-1/2 translate-x-[-50%] transform">
                    <div className="flex flex-col items-center justify-center mb-2">
                        <p className="sub__h2 bg-white shadow-small rounded-full px-4 py-2 !text-sm mb-6">Your AI Agents. Your Rules.</p>
                        <h1 className="h1 font-bold !text-6xl !mb-2 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text !text-transparent py-2">AI Agents for Everything</h1>
                        <p className="sub__h1 mb-6">Power your business with AI that feels custom-built — without writing a single line of code.</p>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                        <button className="btn btn-primary transition-all duration-300 hover:scale-105 group relative overflow-hidden" onClick={handleLoginClick}>
                            <span className="transition-transform duration-300 group-hover:-translate-x-3">Sign Up</span>
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
        </div>
    );
};

export default HeroSection;