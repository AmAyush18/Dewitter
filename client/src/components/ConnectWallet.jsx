import React from 'react';
import { motion } from 'framer-motion';

function ConnectWallet({ connectWallet, isConnecting }) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Welcome to DeWitter</h2>
        <p className="mb-8 text-gray-400">Connect your wallet to start tweeting</p>
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-600 transition duration-300"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </motion.div>
      {isConnecting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-slate-800 p-8 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-4">Connecting to Wallet</h3>
            <p>Please confirm the connection in your wallet...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectWallet;