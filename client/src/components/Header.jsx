import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import makeBlockie from 'ethereum-blockies-base64';

function Header({ account, connectWallet }) {
  const blockie = account ? makeBlockie(account) : null;

  return (
    <nav className="bg-slate-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-x-1">
          <img src="/logo-img.png" alt="logo" className='w-[48px] h-[45px] object-contain' />
          <img src="/logo-txt.png" alt="logo" className='h-[45px] w-[108px] object-contain' />
        </div>
        {!account ? (
          <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 transition duration-300">
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center">
            <img src={blockie} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
            <span className="text-gray-300 font-bold">{account.slice(0, 6)}...{account.slice(-4)}</span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;