
// Social media detection patterns
const socialPatterns = {
  'Facebook': ['facebook.com', 'fb.com', 'facebook', 'fb-root', 'fb:like'],
  'Twitter/X': ['twitter.com', 'twitter', 'tweet', 'x.com'],
  'Instagram': ['instagram.com', 'instagram', 'insta-'],
  'LinkedIn': ['linkedin.com', 'linkedin', 'lnkd.in'],
  'YouTube': ['youtube.com', 'youtu.be', 'youtube'],
  'TikTok': ['tiktok.com', 'tiktok', 'bytedance'],
  'Pinterest': ['pinterest.com', 'pinterest', 'pinit'],
  'Reddit': ['reddit.com', 'reddit'],
  'Snapchat': ['snapchat.com', 'snapchat'],
  'Tumblr': ['tumblr.com', 'tumblr'],
  'Quora': ['quora.com', 'quora'],
  'Medium': ['medium.com', 'medium'],
  'Discord': ['discord.com', 'discord'],
  'Twitch': ['twitch.tv', 'twitch'],
  'Vimeo': ['vimeo.com', 'vimeo']
};

// Detect social networks on page
function detectSocialNetworks() {
  const pageContent = document.documentElement.innerHTML;
  const url = window.location.href;
  const foundNetworks = [];
  
  // Check each social network
  for (const [network, patterns] of Object.entries(socialPatterns)) {
    for (const pattern of patterns) {
      // Check URL
      if (url.includes(pattern)) {
        foundNetworks.push(network);
        break;
      }
      
      // Check page content
      if (pageContent.includes(pattern)) {
        foundNetworks.push(network);
        break;
      }
    }
  }
  
  // Look for common social sharing elements
  const socialSelectors = [
    'a[href*="facebook.com/share"]',
    'a[href*="twitter.com/intent/tweet"]',
    'a[href*="linkedin.com/shareArticle"]',
    'a[href*="pinterest.com/pin/create"]',
    '.social-share',
    '.share-buttons',
    '[class*="social"]',
    '[class*="share"]',
    '[aria-label*="share"]',
    '[aria-label*="social"]'
  ];
  
  // Check for social elements in DOM
  socialSelectors.forEach(selector => {
    if (document.querySelector(selector)) {
      foundNetworks.push('Social Sharing');
      return;
    }
  });
  
  // Return unique networks
  return [...new Set(foundNetworks)];
}

// Wait for page to fully load then detect social networks
window.addEventListener('load', () => {
  setTimeout(() => {
    const socialNetworksFound = detectSocialNetworks();
    
    // Send data to background script
    if (socialNetworksFound.length > 0) {
      chrome.runtime.sendMessage({
        type: 'SOCIAL_DATA',
        socials: socialNetworksFound
      });
    }
  }, 1500);
});
