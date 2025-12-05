'use client';

import { useRouter } from 'next/navigation';

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

interface PluginGridProps {
  plugins: Plugin[];
}

export default function PluginGrid({ plugins }: PluginGridProps) {
  const router = useRouter();

  const handleCardClick = (appslugname: string) => {
    router.push(`/ai-agents/${appslugname}`);
  };

  if (plugins.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-dark mb-2">No agents found</h3>
        <p className="text-gray-light">Try adjusting your search terms or category filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plugins.map(plugin => (
        <div
          key={plugin.rowid}
          onClick={() => handleCardClick(plugin.appslugname)}
          className="group cursor-pointer backdrop-blur-sm border-2 border-dark rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 flex flex-col h-full"
        >
          <div className="flex-1 flex flex-col">
            {/* Service Icon and Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {plugin.iconurl ? (
                  <img
                    src={plugin.iconurl}
                    alt={`${plugin.name} icon`}
                    className="w-12 h-12 rounded-lg object-cover mr-3"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center mr-3">
                    <span className=" text-xs">No Icon</span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">{plugin.name}</h3>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className=" text-sm mb-4 line-clamp-3">{plugin.description || 'No description available'}</p>

            {/* Categories */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {plugin.category.slice(0, 3).map((cat, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-base text-gray-dark text-xs font-medium rounded-full border border-light"
                  >
                    {cat}
                  </span>
                ))}
                {plugin.category.length > 3 && (
                  <span className="px-3 py-1 bg-base text-gray-dark text-xs font-medium rounded-full border border-light">
                    +{plugin.category.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-3 mt-auto">
            <button
              onClick={() => handleCardClick(plugin.appslugname)}
              className="text-purple-600 hover:text-purple-400 text-sm font-medium transition-colors cursor-pointer"
            >
              Go To Agent →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
