'use client';

import SecuritySection from "@/components/SecuritySection";

const PrivateAndSecure = () => {
    return (
        <div className="border border-dark border-t-0 border-b-0">
            <SecuritySection heading="Your meeting data stays private and secure" description="Your data belongs to you. 50agents uses a privacy-first approach to keep recordings and transcripts secure. Access is controlled so your team can collaborate with confidence." />
        </div>
    );
};

export default PrivateAndSecure;