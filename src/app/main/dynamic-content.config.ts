// D:\PROJECT\Angular\AgularDjango\src\app\dynamic-content\dynamic-content.config.ts
export const MENU_CONFIG = {
    data: {
      title: 'Data Routes',
      menu: [
        { path: 'aaa' },
        { path: 'bbb' }
      ],
      logo: 'data-logo.png'
    },
    dataA: {
      title: 'Data Routes A',
      menu: [
        { path: 'aaa' }
      ],
      logo: 'dataA-logo.png'
    },
    dataB: {
      title: 'Data Routes B',
      menu: [
        { path: 'bbb' }
      ],
      logo: 'dataB-logo.png'
    }
  };
  
  // Define the type for the keys
  export type MenuConfigKey = keyof typeof MENU_CONFIG;
  