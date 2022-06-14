import { useWeb3React } from '@web3-react/core';
import { connector } from '../../config/web3';

type ReturnValues = {
	active: boolean;
	account: string | null | undefined;
	walletError: Error | undefined;
	isUnsupported: boolean;
	connect: () => Promise<any> | undefined;
	disconnect: () => void;
};

export const useWallet = (): ReturnValues => {
	const { active, activate, deactivate, error, account } = useWeb3React();

	const connect = async (): Promise<void> => {
		if (!active) {
			await activate(connector);
			window.localStorage.setItem('isConnected', 'true');
		}
	};

	const disconnect = () => {
		if (active) {
			deactivate();
			window.localStorage.setItem('isConnected', 'false');
		}
	};

	const isUnsupported = error?.name === 'UnsupportedChainIdError';

	return { active, account, walletError: error, connect, disconnect, isUnsupported };
};
