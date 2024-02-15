export const colors = (theme) => (
  theme === 'dark'
    ? {
      bg: {
        1: '#161616',
        5: '#2E2E2E',
        11: '#A0A0A0',
        text: '#EDEDED',
      },
      main: {
        bg: '#BF7AF0',
        text: '#161616',
      },
      secondary: {
        bg: '#392C72',
        text: '#9E8CFC',
      },
      red: '#A42A12',
      white: '#EDEDED',
      lime: {
        11: '#87BE22',
      }
    }
    : {
      bg: {
        1: '#EDEDED',
        5: '#D1D1D1',
        11: '#2E2E2E',
        text: '#161616',
      },
      main: {
        bg: '#BF7AF0',
        text: '#EDEDED',
      },
      secondary: {
        bg: '#392C72',
        text: '#EDEDED',
      },
      red: '#A42A12',
      white: '#EDEDED',
      lime: {
        11: '#87BE22',
      }
    }
);
