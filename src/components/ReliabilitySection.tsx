'use client'
import { Globe } from "@/components/ui/globe"

const ReliabilitySection = () => {
    return (
        <div className="container">
            <div className="border border-t-0 border-b-0 border-dark relative overflow-hidden">
                {/* Content Section */}
                <div className="relative z-10 flex items-center justify-center">
                    <div className="p-6 md:p-12 md:pb-0 pb-0 text-center">
                        <h2 className="h2 text-black">Enterprise-Grade Reliability. Startup-Speed Innovation.</h2>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <p className="sub__h2 text-black/90">Your data stays safe, your workflows stay stable, and your AI agents run at lightning speed — whether it's one task or a thousand.</p>
                            </div>
                            <div className="">
                                <ul className="text-black flex md:flex-row flex-col gap-4 md:gap-12 justify-center">
                                    <li>Security-first infrastructure</li>
                                    <li>Scalable architecture</li>
                                    <li>Global uptime & instant sync</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Half Globe at Bottom */}
                <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden md:-mt-16">
                    <Globe className="top-0" />
                </div>
            </div>
        </div>
    )
}

export default ReliabilitySection;
