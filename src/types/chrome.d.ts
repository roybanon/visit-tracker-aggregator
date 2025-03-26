
// Type definitions for Chrome extension API
interface Chrome {
  storage: {
    local: {
      get: (keys: string[], callback: (result: any) => void) => void;
      set: (items: object, callback?: () => void) => void;
      onChanged: {
        addListener: (callback: (changes: any) => void) => void;
        removeListener: (callback: (changes: any) => void) => void;
      };
    };
    onChanged: {
      addListener: (callback: (changes: any) => void) => void;
      removeListener: (callback: (changes: any) => void) => void;
    };
  };
  runtime: {
    sendMessage: (message: any) => void;
  };
}

declare global {
  interface Window {
    chrome?: Chrome;
  }
  const chrome: Chrome | undefined;
}

export {};
