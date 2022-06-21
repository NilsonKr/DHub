import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';

export const connector = new InjectedConnector({ supportedChainIds: [4] });

export const getLibrary = (provider: any) => {
	return new Web3(provider);
};
