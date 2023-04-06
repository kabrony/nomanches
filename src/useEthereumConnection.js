import { useState, useEffect } from 'react';
import { ENS } from '@ensdomains/ensjs';
import { WalletConnectProvider } from '@walletconnect/web3-provider';
import { Web3Provider } from 'ethers/providers';

export const useEthereumConnection = () => {
  const [ens, setEns] = useState(null);
  const [web3Provider, setWeb3Provider] = useState(null);

  const connectWallet = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: '3431d396db43496dbc9a92c0ad658db0',
        },
      },
    };

    const provider = new WalletConnectProvider(providerOptions.walletconnect.options);
    await provider.enable();

    const web3ProviderInstance = new Web3Provider(provider);
    setWeb3Provider(web3ProviderInstance);

    const ensInstance = new ENS({ provider: web3ProviderInstance });
    setEns(ensInstance);
  };

  return { ens, web3Provider, connectWallet };
};

