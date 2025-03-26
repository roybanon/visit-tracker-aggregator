
import React, { useState, useEffect } from 'react';
import Header from './Header';
import SiteCard, { Site } from './SiteCard';
import DataVisual from './DataVisual';
import EmptyState from './EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, List, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for development environment (not Chrome extension)
const mockData = {
  trackedSites: [
    {
      hostname: 'twitter.com',
      title: 'Twitter / X',
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 12,
      socialNetworks: ['Twitter/X', 'Social Sharing'],
      favicon: 'https://twitter.com/favicon.ico'
    },
    {
      hostname: 'github.com',
      title: 'GitHub: Let\'s build from here',
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 8,
      socialNetworks: ['Social Sharing'],
      favicon: 'https://github.com/favicon.ico'
    },
    {
      hostname: 'youtube.com',
      title: 'YouTube',
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 5,
      socialNetworks: ['YouTube', 'Google', 'Social Sharing'],
      favicon: 'https://youtube.com/favicon.ico'
    }
  ],
  socialCounts: {
    'Twitter/X': 12,
    'Social Sharing': 25,
    'YouTube': 5,
    'Google': 15,
    'Facebook': 8
  }
};

const SocialTracker: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [socialCounts, setSocialCounts] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In browser environment (not extension), use mock data
    if (typeof window.chrome === 'undefined' || !window.chrome?.storage) {
      setSites(mockData.trackedSites);
      setSocialCounts(mockData.socialCounts);
      setIsLoading(false);
      return;
    }
    
    // In extension environment, get real data
    chrome?.storage?.local.get(['trackedSites', 'socialCounts'], (data) => {
      if (data.trackedSites) {
        setSites(data.trackedSites);
      }
      if (data.socialCounts) {
        setSocialCounts(data.socialCounts);
      }
      setIsLoading(false);
    });
    
    // Listen for storage changes
    const storageListener = (changes: any) => {
      if (changes.trackedSites) {
        setSites(changes.trackedSites.newValue);
      }
      if (changes.socialCounts) {
        setSocialCounts(changes.socialCounts.newValue);
      }
    };
    
    if (chrome?.storage) {
      chrome.storage.onChanged.addListener(storageListener);
      return () => chrome.storage.onChanged.removeListener(storageListener);
    }
  }, []);
  
  // Filter sites based on search term
  const filteredSites = sites.filter(site => 
    site.hostname.includes(searchTerm.toLowerCase()) || 
    site.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.socialNetworks.some(network => 
      network.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  // Calculate total socials (sum of all values in socialCounts)
  const totalSocials = Object.values(socialCounts).reduce((sum, count) => sum + count, 0);
  
  return (
    <div className="flex flex-col min-h-[600px] max-h-[600px] w-[400px] bg-background">
      <Header totalSites={sites.length} totalSocials={totalSocials} />
      
      <div className="p-4">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search sites or social networks..."
            className="pl-8 bg-secondary/50 border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="sites" className="mb-4">
          <div className="flex items-center justify-between">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="sites" className="text-xs">Sites</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
            </TabsList>
            
            <div className="flex bg-secondary/50 rounded-md p-0.5">
              <button 
                className={`p-1.5 rounded ${viewType === 'grid' ? 'bg-background shadow-sm' : ''}`}
                onClick={() => setViewType('grid')}
              >
                <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <button 
                className={`p-1.5 rounded ${viewType === 'list' ? 'bg-background shadow-sm' : ''}`}
                onClick={() => setViewType('list')}
              >
                <List className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <TabsContent value="sites" className="mt-4">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-3 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 rounded-lg bg-secondary/50"></div>
                ))}
              </div>
            ) : filteredSites.length > 0 ? (
              <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-3 pb-4 overflow-y-auto max-h-[400px]`}>
                {filteredSites.map((site, index) => (
                  <SiteCard key={`${site.hostname}-${index}`} site={site} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4">
            <DataVisual socialCounts={socialCounts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SocialTracker;
