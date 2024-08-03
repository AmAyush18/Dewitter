import Web3 from 'web3';
import DewitterABI from './DewitterABI.json';

const CONTRACT_ADDRESS = import.meta.env.VITE_DEPLOYED_CONTRACT_ADDRESS;
console.log({ CONTRACT_ADDRESS });

export const getContract = async () => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(DewitterABI, CONTRACT_ADDRESS);
  }
  return null;
};
