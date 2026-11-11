import styled from 'styled-components';

const FooterBar = styled.footer`
  margin-top: auto;
  padding: 16px 24px;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-tertiary);
  border-top: 0.5px solid var(--color-separator);
`;

export function Footer() {
  return <FooterBar>RingTheBell v{__APP_VERSION__}</FooterBar>;
}
