"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        {isConnected ? (
          <div>
            Connected to {address}
            <button
              onClick={() => disconnect()}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={() => connect()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </main>
  );
}