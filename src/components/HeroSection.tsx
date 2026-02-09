'use client';

import { RetroGrid } from "@/components/ui/retro-grid";
import { TypingAnimation } from "@/components/ui/typing-animation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EastIcon from '@mui/icons-material/East';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const HeroSection = ({ promptData }: { promptData: Array<{ button_label: string; prompt: string; }> | null }) => {
    const router = useRouter();
    const [textareaValue, setTextareaValue] = useState('');
    const [screenSize, setScreenSize] = useState('lg');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setScreenSize('mobile');
            } else if (width < 768) {
                setScreenSize('sm');
            } else if (width < 1400) {
                setScreenSize('md');
            } else {
                setScreenSize('lg');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getButtonLimit = () => {
        switch (screenSize) {
            case 'mobile': return 4;
            case 'sm': return 8;
            case 'md': return 12;
            case 'lg': return promptData?.length || 0;
            default: return promptData?.length || 0;
        }
    };

    const handleLoginClick = () => {
        router.push(`${process.env.NEXT_PUBLIC_INTERNAL_URL}/login`);
    };

    const fillTextArea = (text: string) => {
        setTextareaValue(text);
    };

    const clearTextArea = () => {
        setTextareaValue('');
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.target.value);
    };

    const handleSendPrompt = () => {
        if (textareaValue.trim()) {
            Cookies.set('pending_prompt', textareaValue.trim(), {
                expires: 1 / 24, // Expires in 1 hour
                domain: '.50agents.com', // Works for both 50agents.com and chat.50agents.com
                path: '/',  
                secure: true,
                sameSite: 'lax'
            });
            router.push(`${process.env.NEXT_PUBLIC_INTERNAL_URL}/login`);
        }
    };
    return (
        <div className="container">
            <div className="w-full relative h-[250vh] lg:h-[180vh] border border-t-0 border-b-0 mt-[-125vh] lg:mt-[-90vh] border-dark ">
                <RetroGrid />

                <div className="text-center absolute top-[125vh] lg:top-[95vh] px-4 w-full left-1/2 translate-x-[-50%] transform">
                    <div className="flex flex-col items-center justify-center mb-2">
                        <p className="sub__h2 bg-white shadow-small rounded-full px-4 py-2 !text-sm mb-6">Your AI Agents. Your Rules.</p>
                        <h1 className="h1 font-bold !text-6xl !mb-2 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text !text-transparent py-2">Build AI Agents for Anything</h1>
                        <p className="sub__h1 mb-6">Power your business with AI that feels custom-built — without writing a single line of code.</p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 mb-8 w-full max-w-[1200px] mx-auto">
                        <div className="w-full max-w-[540px]">
                            <div className="relative">
                                <textarea
                                    className="w-full min-h-[160px] border-2 outline-none border-dark rounded-2xl p-4 bg-white"
                                    value={textareaValue}
                                    onChange={handleTextareaChange}
                                ></textarea>
                                {!textareaValue && (
                                    <div className="absolute -top-2 left-5 pointer-events-none text-gray-400">
                                        <TypingAnimation>What AI agent should I build for you today?</TypingAnimation>
                                    </div>
                                )}
                                <div className={`absolute bottom-0 right-0 h-8 w-8 flex items-center justify-center m-4 rounded-full ${textareaValue.trim() ? 'bg-primary text-white cursor-pointer' : 'text-gray-light hover:bg-[var(--background-hover)] cursor-not-allowed'} hover:scale-110 transition-all duration-300`} onClick={handleSendPrompt}><EastIcon fontSize="small" /></div>
                            </div>
                            <div
                                className={`px-2 w-fit cursor-pointer ${textareaValue.trim() ? 'block' : 'hidden'} text-gray-light hover:!text-black`}
                                onClick={clearTextArea}
                            >
                                clear
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 items-center justify-center">
                            {promptData?.slice(0, getButtonLimit()).map((item, index) => (
                                <button
                                    key={index}
                                    className="btn btn-outline border-dark text-sm !rounded-full bg-gray-light hover:!text-black"
                                    onClick={() => fillTextArea(item.prompt)}
                                >
                                    {item.button_label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 flex-col md:flex-row">
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