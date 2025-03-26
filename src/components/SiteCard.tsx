
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, ExternalLink } from "lucide-react";

export interface Site {
  hostname: string;
  title: string;
  firstVisit: string;
  lastVisit: string;
  visitCount: number;
  socialNetworks: string[];
  favicon: string;
}

interface SiteCardProps {
  site: Site;
}

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <Card className="glass-panel card-hover overflow-hidden animate-scale">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="relative h-8 w-8 mr-3 bg-secondary rounded-md flex items-center justify-center overflow-hidden">
            <img 
              src={site.favicon} 
              alt={site.hostname} 
              className="h-6 w-6 object-contain" 
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerHTML = site.hostname.charAt(0).toUpperCase();
              }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate" title={site.title}>
              {site.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {site.hostname}
            </p>
          </div>
          
          <a 
            href={`https://${site.hostname}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1.5" />
            <span>Last: {formatDate(site.lastVisit)}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3 mr-1.5" />
            <span>Visits: {site.visitCount}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {site.socialNetworks.map((network, i) => (
            <Badge 
              key={`${network}-${i}`}
              variant="secondary" 
              className="text-[10px] px-1.5 py-0.5 font-normal"
            >
              {network}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SiteCard;
