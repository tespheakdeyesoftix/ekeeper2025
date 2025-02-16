declare global {
    interface Window {
      storageService: {
        setItem(key: string, value: any): void;
        removeItem(key: string, value: any): void;
        getItem(key: string): string | null;
        t(key: string): string | null;
      };
    }
  }
  
  export {};
  