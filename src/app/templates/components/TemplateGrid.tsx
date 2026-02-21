'use client';

import WorkspaceSelectionModal from '@/components/WorkspaceSelectionModal';
import { useGetIdeasQuery } from '@/store/apis/staticagent';
import { ArrowRight, Bot, Star, TrendingUp, Wrench, Zap } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function TemplateGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: templates = [], isLoading } = useGetIdeasQuery();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);

  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('proxy_auth_token');

  useEffect(() => {
    const pendingTemplateId = searchParams.get('templateId');
    if (pendingTemplateId && templates.length > 0) {
      const template = templates.find((t: any) => t._id === pendingTemplateId);
      if (template) {
        setSelectedTemplate(template);
        setWorkspaceModalOpen(true);
      }
    }
  }, [templates, isLoggedIn, searchParams]);

  const handleTemplateClick = (template: any) => {
    if (!isLoggedIn) {
      window.location.href = `${process.env.NEXT_PUBLIC_INTERNAL_URL}/login?pendingTemplateId=${template._id}`;
      return;
    }

    setSelectedTemplate(template);
    setWorkspaceModalOpen(true);
  };

  const renderTemplateCard = (template: any, index: number) => {
    const agentJson = template?.agentJson || {};
    const name = agentJson.name || 'Untitled Template';
    const description = template?.templateDescription || 'No description available';
    const logo = agentJson.logo || 'https://ui-avatars.com/api/?name=Template&background=random';
    const actionCount = template?.toolConfiguration?.actions?.length || 0;
    const triggerCount = template?.toolConfiguration?.triggers?.length || 0;
    const isFeatured = index < 1;

    return (
      <div key={template._id || index} className="w-full">
        <div
          className="group cursor-pointer  backdrop-blur-sm border-2 border-dark bg-gray-light rounded-2xl p-6 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 relative"
          onClick={() => handleTemplateClick(template)}
        >
          {isFeatured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                <Star size={12} fill="currentColor" />
                Popular
              </span>
            </div>
          )}

          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <img
                src={logo}
                alt={name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-gray-dark shadow-lg"
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://ui-avatars.com/api/?name=Template&background=random';
                }}
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                <Bot size={10} className="text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold  mb-2 line-clamp-2 leading-tight">{name}</h3>
              <p className=" text-sm line-clamp-3 leading-relaxed">{description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {actionCount > 0 && (
              <span className="inline-flex items-center gap-1 bg-base text-gray-dark px-3 py-1 rounded-full text-xs font-medium border border-dark">
                <Wrench size={10} />
                {actionCount} Action{actionCount > 1 ? 's' : ''}
              </span>
            )}
            {triggerCount > 0 && (
              <span className="inline-flex items-center gap-1 bg-base text-gray-dark px-3 py-1 rounded-full text-xs font-medium border border-dark">
                <Zap size={10} />
                {triggerCount} Trigger{triggerCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-center gap-2 font-medium transition-colors duration-300">
              Use Template
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-16 md:mb-12 relative">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-2">
            <h1 className="h1">Agent Templates</h1>

            {/* Need Help Section */}
            <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
              <a
                href="https://cal.id/pushpendra"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-base backdrop-blur-sm border border-dark rounded-2xl px-5 py-3 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 cursor-pointer group min-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-black group-hover:!text-blue-700 transition-colors">
                      Need help?
                    </p>
                    <p className="text-xs text-gray-dark group-hover:!text-gray-900 transition-colors">
                      Talk to specialist
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <p className="sub__h1 mb-6">Discover and deploy powerful AI agents to supercharge your productivity</p>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/20">
              <TrendingUp size={16} />
              Ready to Use
            </span>
            <span className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/20">
              <Bot size={16} />
              AI-Powered
            </span>
            <span className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold border border-orange-500/20">
              <Zap size={16} />
              Quick Setup
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="w-full">
                  <div className=" backdrop-blur-sm border-2 border-light rounded-2xl p-6 h-full animate-pulse">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16  rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-6  rounded mb-2 w-4/5"></div>
                        <div className="h-4  rounded w-3/5"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 rounded"></div>
                      <div className="h-4 rounded"></div>
                      <div className="h-4 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : templates.length === 0 ? (
            <div className="col-span-full">
              <div className="text-center py-16 px-4 bg-base backdrop-blur-sm border-2 border-dashed border-dark rounded-2xl">
                <h3 className="text-xl font-bold text-black mb-3">
                  No templates available
                </h3>
              </div>
            </div>
          ) : (
            templates.map((template, index) => renderTemplateCard(template, index))
          )}
        </div>

        {selectedTemplate && (
          <WorkspaceSelectionModal
            open={workspaceModalOpen}
            handleClose={() => {
              setWorkspaceModalOpen(false);
              setSelectedTemplate(null);
            }}
            templateId={selectedTemplate._id}
            templateName={selectedTemplate?.agentJson?.name || 'Template'}
          />
        )}
      </div>
    </div>
  );
}

export default TemplateGrid;
