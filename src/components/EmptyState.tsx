
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Globe, MousePointer } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
    <Card className="glass-panel h-64 flex items-center justify-center animate-fade-in">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 p-3 bg-secondary/50 rounded-full">
          <Globe className="h-6 w-6 text-muted-foreground animate-pulse-subtle" />
        </div>
        <h3 className="text-lg font-medium mb-2">No tracked sites yet</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Browse the web and visit sites with social connections. Your data will appear here.
        </p>
        
        <div className="mt-6 flex items-center text-xs text-muted-foreground">
          <MousePointer className="h-3 w-3 mr-1.5" />
          <span>Try visiting sites with social media elements</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
