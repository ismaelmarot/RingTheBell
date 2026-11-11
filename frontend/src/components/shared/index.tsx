import styled from 'styled-components';

// Apple-style shared components

export const PageContainer = styled.main`
  min-height: 100vh;
  padding: 0 0 24px 0;
  max-width: 100%;
  margin: 0;
  animation: fadeIn 0.3s ease;
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 4px;
`;

export const PageTitle = styled.h1`
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.022em;
  color: var(--color-text);
  line-height: 1.1;
`;

export const PageSubtitle = styled.p`
  font-size: 15px;
  color: var(--color-text-secondary);
  margin-top: 4px;
  letter-spacing: -0.01em;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin: 0 0 12px 0;
`;

export const Card = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
  transition: all 0.25s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  }
`;

export const CardGroup = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
`;

export const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 0.5px solid var(--color-separator);

  &:last-child {
    border-bottom: none;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: all 0.15s ease;
  min-height: 44px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: var(--color-fill-secondary);
          color: var(--color-accent);
          &:hover { background: var(--color-fill); }
          &:active { transform: scale(0.97); }
        `;
      case 'danger':
        return `
          background: var(--color-danger);
          color: #FFFFFF;
          &:hover { background: var(--color-danger); }
          &:active { transform: scale(0.97); }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: var(--color-accent);
          padding: 8px 12px;
          &:hover { background: var(--color-accent-light); }
          &:active { transform: scale(0.97); }
        `;
      default:
        return `
          background: var(--color-accent);
          color: #FFFFFF;
          &:hover { background: var(--color-accent-hover); }
          &:active { transform: scale(0.97); }
        `;
    }
  }}

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

export const SmallButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: all 0.15s ease;
  min-height: 36px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: var(--color-fill-secondary);
          color: var(--color-accent);
          &:hover { background: var(--color-fill); }
          &:active { transform: scale(0.97); }
        `;
      case 'danger':
        return `
          background: var(--color-danger);
          color: #FFFFFF;
          &:hover { background: var(--color-danger); }
          &:active { transform: scale(0.97); }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: var(--color-accent);
          &:hover { background: var(--color-accent-light); }
          &:active { transform: scale(0.97); }
        `;
      default:
        return `
          background: var(--color-accent);
          color: #FFFFFF;
          &:hover { background: var(--color-accent-hover); }
          &:active { transform: scale(0.97); }
        `;
    }
  }}

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--color-separator);
  border-radius: 12px;
  font-size: 17px;
  background: var(--color-card);
  color: var(--color-text);
  transition: all 0.2s ease;
  min-height: 44px;

  &::placeholder {
    color: var(--color-text-tertiary);
  }

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 4px var(--color-turquoise-light);
  }

  &:disabled {
    background: var(--color-fill);
    color: var(--color-text-tertiary);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--color-separator);
  border-radius: 12px;
  font-size: 17px;
  background: var(--color-card);
  color: var(--color-text);
  transition: all 0.2s ease;
  min-height: 44px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 4px var(--color-turquoise-light);
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-left: 4px;
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;

  ${({ $status }) => {
    switch ($status) {
      case 'ACCEPTED':
      case 'accepted':
        return `
          background: var(--color-success-light);
          color: var(--color-success);
        `;
      case 'REJECTED':
      case 'rejected':
        return `
          background: var(--color-danger-light);
          color: var(--color-danger);
        `;
      case 'FINALIZED':
      case 'finalized':
        return `
          background: var(--color-fill);
          color: var(--color-gray);
        `;
      case 'PENDING':
      case 'pending':
        return `
          background: var(--color-warning-light);
          color: var(--color-warning);
        `;
      default:
        return `
          background: var(--color-fill);
          color: var(--color-gray);
        `;
    }
  }}
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: var(--color-text-secondary);

  p {
    font-size: 17px;
    margin: 0;
  }

  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.4;
  }
`;

export const ErrorText = styled.p`
  font-size: 13px;
  color: var(--color-danger);
  margin: 4px 0 0 4px;
  letter-spacing: -0.01em;
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  a {
    color: var(--color-accent);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background 0.15s ease;

    &:hover {
      background: var(--color-accent-light);
      text-decoration: none;
    }
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--color-accent);
  font-size: 17px;
  font-weight: 400;
  padding: 8px 4px;
  margin: -8px 0;
  border-radius: 8px;
  transition: background 0.15s ease;

  &:hover {
    background: var(--color-accent-light);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 0.5px;
  background: rgba(60, 60, 67, 0.12);
  margin: 16px 0;
`;

export const Spacer = styled.div<{ $size?: number }>`
  height: ${({ $size }) => $size || 16}px;
`;

export const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2.5px solid var(--color-separator);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
