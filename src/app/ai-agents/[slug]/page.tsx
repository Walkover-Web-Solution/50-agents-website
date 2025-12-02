import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '../../../components/Breadcrumb';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import AboutSection from './components/AboutSection';
import FAQsForSpecificService from './components/FAQsForSpecificService';
import GetStartedSection from './components/GetStartedSection';
import UseTemplateButton from './components/UseTemplateButton';
import WhatYouCanDoSection from './components/WhatYouCanDoSection';
import WhyUseSection from './components/WhyUseSection';

export const runtime = 'edge';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchPluginDetails(slug);

  if (!result) {
    return {
      title: 'AI Agent Not Found in 50Agents',
      description: 'The requested AI agent could not be found.',
    };
  }

  const { plugin } = result;
  const appName = plugin.name;

  return {
    title: `${appName} AI Agent | Perform Any Task Inside ${appName} with 50Agents`,
    description: `The ${appName} AI Agent can perform any task inside ${appName}. Just type a prompt — it understands, executes, and automates instantly. No setup. No code`,
    alternates: {
      canonical: `https://50agents.com/ai-agents/${slug}`,
    },
    openGraph: {
      title: `${appName} AI Agent | Perform Any Task Inside ${appName} with 50Agents`,
      description: `The ${appName} AI Agent can perform any task inside ${appName}. Just type a prompt — it understands, executes, and automates instantly. No setup. No code`,
      images: plugin.iconurl ? [plugin.iconurl] : [],
    },
  };
}

interface Plugin {
  rowid: string;
  name: string;
  description: string;
  appslugname: string;
  iconurl: string;
  category: string[];
  domain: string;
  brandcolor: string;
  autonumber: number;
}

interface PluginIntegration {
  name: string;
  description: string;
  parameters?: any[];
  type?: string;
}

interface PluginDetailResponse {
  message: string;
  data: Plugin;
  events?: PluginIntegration[];
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function fetchPluginDetails(slug: string): Promise<{ plugin: Plugin; events: PluginIntegration[] } | null> {
  try {
    // Fetch integrations data which contains both plugin info and events
    const response = await fetch(
      `https://plugservice-api.viasocket.com/api/v1/plugins/recommend/integrations?service=${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const plugin = data.plugins?.[slug];

    if (!plugin) {
      return null;
    }

    const events: PluginIntegration[] =
      plugin.events?.map((event: any) => ({
        name: event.name || 'Unnamed Action',
        description: event.description || 'No description available',
        type: event.type || 'action',
        parameters: event.parameters || [],
      })) || [];

    return { plugin, events };
  } catch (error) {
    console.error('Failed to fetch plugin details:', error);
    return null;
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await fetchPluginDetails(slug);

  if (!result) {
    notFound();
  }

  const { plugin, events: integrations } = result;

  return (
    <div className="min-h-full w-full flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none"></div>

      <Header />
      <div className="flex-1 relative z-10 container pt-24 pb-12">
        <div>
          <Breadcrumb items={[{ label: 'AI Agents', href: '/ai-agents' }, { label: `${plugin.name} Agent` }]} />
        </div>

        {/* Service Header */}
        <div className="py-12 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center mb-6">
                {plugin.iconurl ? (
                  <img
                    src={plugin.iconurl}
                    alt={`${plugin.name} icon`}
                    className="w-16 h-16 rounded-xl object-cover mr-4 shadow-xs"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-base flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-gray-400 text-sm">No Icon</span>
                  </div>
                )}
                <div>
                  <h2 className="h2 !mb-0">{plugin.name} AI Agent</h2>
                  <p className="text-lg text-gray-light font-medium">Your Assistant for Smarter, Faster Work</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="sub__h2">
                  Save time and effort inside {plugin.name} — just ask your AI Agent, and it handles the rest.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {plugin.category.map((cat, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-base text-gray-dark text-sm font-medium rounded-full border border-dark"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <UseTemplateButton serviceName={plugin.name} />
            </div>
          </div>
        </div>

        <WhatYouCanDoSection serviceName={plugin.name} integrations={integrations} iconUrl={plugin.iconurl} />
        <WhyUseSection serviceName={plugin.name} />
        <FAQsForSpecificService serviceName={plugin.name} />
        <AboutSection
          serviceName={plugin.name}
          description={plugin.description}
          iconUrl={plugin.iconurl}
          domain={plugin.domain}
        />
        <GetStartedSection serviceName={plugin.name} />
      </div>
      <Footer />
    </div>
  );
}
