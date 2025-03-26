
import React from 'react';
import SocialTracker from '../components/SocialTracker';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Social Data Tracker Extension</h1>
        <p className="text-muted-foreground mb-4">To use this extension, you need to load it into Chrome</p>
        <div className="bg-secondary/50 p-4 rounded-lg text-left max-w-md mx-auto">
          <h2 className="font-semibold mb-2">How to install:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Build the extension: <code className="bg-background px-1.5 py-0.5 rounded">npm run build</code></li>
            <li>Open Chrome and navigate to: <code className="bg-background px-1.5 py-0.5 rounded">chrome://extensions</code></li>
            <li>Enable "Developer mode" (toggle in top right)</li>
            <li>Click "Load unpacked" button</li>
            <li>Select the <code className="bg-background px-1.5 py-0.5 rounded">dist</code> folder</li>
            <li>The extension should now appear in your extensions list</li>
            <li>Click on the extension icon in Chrome to view your tracked social data</li>
          </ol>
        </div>
      </div>
      <SocialTracker />
    </div>
  );
};

export default Index;
