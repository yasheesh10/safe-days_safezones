import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const contractAddress = "YOUR_CONTRACT_ADDRESS";

const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_blockchainId",
        "type": "string"
      }
    ],
    "name": "registerTourist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getTourist",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const connectWallet = async (): Promise<string | null> => {

  if (!window.ethereum) {
    alert("MetaMask not installed");
    return null;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
};

export const registerOnBlockchain = async (
  name: string,
  blockchainId: string
): Promise<string | null> => {

  try {

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    const tx = await contract.registerTourist(
      name,
      blockchainId
    );

    await tx.wait();

    return tx.hash;

  } catch (error) {
    console.error(error);
    return null;
  }
};