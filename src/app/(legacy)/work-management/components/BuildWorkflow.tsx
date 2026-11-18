'use client';

import { Category, Settings } from '@mui/icons-material';

const BuildWorkflow = () => {
    return (
        <div className="container">
            <div className="p-6 md:p-12 border border-dark border-t-0 border-b-0">
                <div className="mb-12 text-center">
                    <h2 className="h2 mb-4">Build Your Perfect Workflow</h2>
                    <p className="sub__h2 max-w-2xl mx-auto">
                        You shouldn't have to change how you work to fit a software. With Work Management, you build the system.
                    </p>
                </div>

                <div className="flex flex-col gap-16">
                    <div className="w-full flex justify-between flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-[65%]">
                            <div className="flex items-center gap-3 mb-3">
                                <Category className="text-black" fontSize="small" />
                                <h3 className="text-2xl font-bold">Smart Categories</h3>
                            </div>
                            <p className="sub__h2 mb-4">
                                Organize work your way. Create groups for Bugs, Features, Internal Tasks, or Homework.
                            </p>
                            <div className="bg-gray-light p-4 rounded-lg border border-dark">
                                <p className="font-semibold mb-2">Why it's cool:</p>
                                <p className="sub__h2">
                                    Different types of work need different info. You don't track a "Bug" the same way you track a "New Idea."
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-[35%]">
                            <img
                                src="/assets/img/categories.png"
                                alt="Team working on workflow optimization"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    <div className="w-full flex justify-between flex-col-reverse md:flex-row gap-12 items-center">
                        <div className="w-full md:w-[35%]">
                            <img
                                src="/assets/img/custom-fields.png"
                                alt="Team working on workflow optimization"
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="w-full md:w-[65%]">
                            <div className="flex items-center gap-3 mb-3">
                                <Settings className="text-black" fontSize="small" />
                                <h3 className="text-2xl font-bold">Custom Fields</h3>
                            </div>
                            <p className="sub__h2 mb-4">
                                Only see what matters. Add text notes, number estimates, or simple "Yes/No" toggles.
                            </p>
                            <div className="bg-gray-light p-4 rounded-lg border border-dark">
                                <p className="font-semibold mb-2">Why it's cool:</p>
                                <p className="sub__h2">
                                    Your workspace grows as your project grows. Keep it simple early on, and add more detail later.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildWorkflow;
