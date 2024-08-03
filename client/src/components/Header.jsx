// components/Header.jsx
import React from 'react';
import { FaTwitter } from 'react-icons/fa';

function Header({ account, connectWallet }) {
  return (
    <nav className="bg-slate-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <FaTwitter className="text-blue-400 text-3xl" />
        {!account ? (
          <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 transition duration-300">
            Connect Wallet
          </button>
        ) : (
          <span className="text-gray-300 font-bold">{account.slice(0, 6)}...{account.slice(-4)}</span>
        )}
      </div>
    </nav>
  );
}

export default Header;