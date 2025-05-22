"use client";

import React from 'react';
import { WalletProvider } from '@suiet/wallet-kit';

export function SuiWalletProvider({ children }: { children: any }) {
  return (
    <WalletProvider autoConnect>
      {children}
    </WalletProvider>
  );
} 