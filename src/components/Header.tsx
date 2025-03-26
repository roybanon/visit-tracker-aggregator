
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, BarChart3, Settings } from "lucide-react";

interface HeaderProps {
  totalSites: number;
  totalSocials: number;
}

const Header: React.FC<HeaderProps> = ({ totalSites, totalSocials }) => {
  return (
    <header className="sticky top-0 z-10 glass-panel backdrop-blur-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2 animate-fade-in">
        <Shield className="h-5 w-5 text-primary" />
        <h1 className="text-lg font-medium">Social Tracker</h1>
        
        <div className="ml-4 flex items-center space-x-2">
          <div className="flex items-center px-2 py-1 rounded-full bg-secondary/80">
            <span className="text-xs font-medium text-muted-foreground">
              {totalSites} sites
            </span>
          </div>
          <div className="flex items-center px-2 py-1 rounded-full bg-secondary/80">
            <span className="text-xs font-medium text-muted-foreground">
              {totalSocials} social connections
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <BarChart3 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
