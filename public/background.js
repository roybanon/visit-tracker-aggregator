
// Social networks to detect
const socialNetworks = [
  { name: 'Facebook', patterns: ['facebook.com', 'fb.com'] },
  { name: 'Twitter/X', patterns: ['twitter.com', 'x.com'] },
  { name: 'Instagram', patterns: ['instagram.com'] },
  { name: 'LinkedIn', patterns: ['linkedin.com'] },
  { name: 'YouTube', patterns: ['youtube.com'] },
  { name: 'TikTok', patterns: ['tiktok.com'] },
  { name: 'Pinterest', patterns: ['pinterest.com'] },
  { name: 'Reddit', patterns: ['reddit.com'] },
  { name: 'Snapchat', patterns: ['snapchat.com'] },
  { name: 'Tumblr', patterns: ['tumblr.com'] },
  { name: 'Quora', patterns: ['quora.com'] },
  { name: 'Medium', patterns: ['medium.com'] },
  { name: 'Discord', patterns: ['discord.com'] },
  { name: 'Twitch', patterns: ['twitch.tv'] },
  { name: 'Vimeo', patterns: ['vimeo.com'] }
];

// Initialize data storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    trackedSites: [],
    socialCounts: {},
    settings: {
      isActive: true,
      privacyLevel: 'medium'
    }
  });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SOCIAL_DATA') {
    updateSiteData(sender.tab.url, message.socials, sender.tab.title);
  }
  return true;
});

// Function to update site data
function updateSiteData(url, socialNetworksFound, title) {
  const hostname = new URL(url).hostname;
  const date = new Date().toISOString();
  
  chrome.storage.local.get(['trackedSites', 'socialCounts'], (data) => {
    let { trackedSites, socialCounts } = data;
    
    // Update social counts
    socialNetworksFound.forEach(social => {
      socialCounts[social] = (socialCounts[social] || 0) + 1;
    });
    
    // Find if site exists
    const existingIndex = trackedSites.findIndex(site => site.hostname === hostname);
    
    if (existingIndex !== -1) {
      // Update existing site
      trackedSites[existingIndex].lastVisit = date;
      trackedSites[existingIndex].visitCount += 1;
      trackedSites[existingIndex].socialNetworks = [...new Set([...trackedSites[existingIndex].socialNetworks, ...socialNetworksFound])];
    } else {
      // Add new site
      trackedSites.push({
        hostname,
        title: title || hostname,
        firstVisit: date,
        lastVisit: date,
        visitCount: 1,
        socialNetworks: socialNetworksFound,
        favicon: `https://${hostname}/favicon.ico`
      });
    }
    
    // Sort by last visit
    trackedSites.sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit));
    
    // Store updated data
    chrome.storage.local.set({ trackedSites, socialCounts });
  });
}
