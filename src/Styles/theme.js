import { css } from 'styled-components';

const theme = {
  flex: (justify = null, align = null, direction = null) => {
    return css`
      display: flex;
      justify-content: ${justify};
      align-items: ${align};
      flex-direction: ${direction};
    `;
  },
};
export default theme;
