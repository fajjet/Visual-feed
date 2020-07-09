import { createGlobalStyle } from 'styled-components';

enum Color {
    blackText = '#373737',

    purple200 = '#caa3e8',
    purple = '#8b54b5',
    purple700 = '#6e5580',

    aquamarineTextOnBlackCover = '#b9e4e7',
    aquamarineHeading = '#83afb3',
    aquamarine300 = '#398c94',
    aquamarine100 = '#46bcc4',
    aquamarine = '#398c94',
    aquamarine700 = '#386b70',

    red = '#ff0029',

    blue = '#4fd6ff',
    linkColor = '#1d7894',

    footerBackground = 'white',
}

export default {
    color: Color,
    hexToRgba(hex: string, alpha = 1) {
        let c: any;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${alpha})`;
        }
        return null;
    },
    overflow: createGlobalStyle`
        body {
          top: 0;
          left: 0;
          overflow: hidden;
          width: 100%;
          height: 100vh;
        }
      `
};
