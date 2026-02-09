'use client'
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import { useRouter } from "next/navigation";
import EastIcon from '@mui/icons-material/East';
interface Item {
    name: string
    icon: string
    color: string
}
let notifications = [
    {
        name: "Product Manager",
        icon: "📋",
        color: "#00C9A7",
    },
    {
        name: "Business Analyst",
        icon: "📊",
        color: "#FFB800",
    },
    {
        name: "Marketing Manager",
        icon: "📈",
        color: "#FF3D71",
    },
    {
        name: "Content Writer",
        icon: "✍️",
        color: "#1E86FF",
    },
    {
        name: "Brand Manager",
        icon: "🎯",
        color: "#00C9A7",
    },
    {
        name: "Sales Executive",
        icon: "💸",
        color: "#FFB800",
    },
    {
        name: "Business Development Executive",
        icon: "🤝",
        color: "#FF3D71",
    },
    {
        name: "Account Manager",
        icon: "👥",
        color: "#1E86FF",
    },
    {
        name: "Customer Support",
        icon: "🎧",
        color: "#FFB800",
    },
    {
        name: "Customer Success Manager",
        icon: "⭐",
        color: "#FF3D71",
    },
    {
        name: "HR Manager",
        icon: "👤",
        color: "#1E86FF",
    },
    {
        name: "Finance/Accounts Manager",
        icon: "💰",
        color: "#FFB800",
    },
    {
        name: "Operations Manager",
        icon: "⚙️",
        color: "#FF3D71",
    },
    {
        name: "Admin Executive",
        icon: "📋",
        color: "#1E86FF",
    },
    {
        name: "UX/UI Designer",
        icon: "🎨",
        color: "#FFB800",
    },
    {
        name: "Graphic Designer",
        icon: "🖌️",
        color: "#FF3D71",
    },
    {
        name: "Legal/Compliance Manager",
        icon: "⚖️",
        color: "#1E86FF",
    },
]

notifications = Array.from({ length: 10 }, () => notifications).flat()
const Notification = ({ name, icon, color }: Item) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-[var(--background)] border border-dark shadow-small"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-2xl"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre text-[var(--foreground)]">
                        <span className="text-sm sm:text-lg">{name}</span>
                    </figcaption>
                </div>
            </div>
        </figure>
    )
}

const NonTechSection = ({
    className,
}: {
    className?: string
}) => {
    const router = useRouter();
    const handleLoginClick = () => {
        router.push(`${process.env.NEXT_PUBLIC_INTERNAL_URL}/login`);
    };
    return (
        <div className="container">
            <div className="p-6 md:p-12 flex md:flex-row flex-col justify-center gap-8 border border-t-0 border-b-0 border-dark">
                <div className="">
                    <h2 className="h2">Built for Non-Tech Professionals.</h2>
                    <p className="sub__h2 mb-4">Whether you’re in marketing, HR, sales, or operations — AI agents handle the repetitive tasks so you can focus on strategy, creativity, and growth.</p>
                    <button className="btn btn-primary transition-all duration-300 hover:scale-105 group relative overflow-hidden" onClick={handleLoginClick}>
                        <span className="transition-transform duration-300 group-hover:-translate-x-3">Get Started for Free</span>
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"><EastIcon /></span>
                    </button>
                </div>
                <div
                    className={cn(
                        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
                        className
                    )}
                >
                    <AnimatedList>
                        {notifications.map((item, idx) => (
                            <Notification {...item} key={idx} />
                        ))}
                    </AnimatedList>
                    <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
                </div>
            </div>
        </div>
    );
};

export default NonTechSection;
