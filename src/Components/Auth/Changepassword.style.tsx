import styled from "styled-components";

// breakpoints
import { breakpoint } from "../../breakpoints";

export const Title = styled.h1`
  text-align: center;
  font-weight: var(--font-weight-page-title);
  margin-bottom: var(--margin-bottom-page-title);
  font-size: var(--font-size-page-title);
  ${breakpoint.md} {
    text-align: left;
  }
`;
