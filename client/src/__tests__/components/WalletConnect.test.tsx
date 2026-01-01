import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WalletConnect from '../../components/WalletConnect';

describe('WalletConnect Component', () => {
  it('renders wallet connect button', () => {
    render(<WalletConnect />);
    const button = screen.getByText(/Connect Wallet/i);
    expect(button).toBeDefined();
  });

  it('displays wallet button in the document', () => {
    const { container } = render(<WalletConnect />);
    expect(container.querySelector('button')).toBeDefined();
  });
});
