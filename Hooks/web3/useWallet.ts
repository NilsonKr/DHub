import { useWeb3React } from '@web3-react/core';
import { connector } from '../../config/web3';

type ReturnValues = {
	active: boolean;
	account: string | null | undefined;
	error: Error | undefined;
	connect: () => Promise<any> | undefined;
	disconnect: () => void;
};

export const useWallet = (): ReturnValues => {
	const { active, activate, deactivate, error, account } = useWeb3React();

	const connect = (): Promise<any> | undefined => {
		if (!active) {
			return activate(connector);
		}
	};

	const disconnect = () => {
		if (active) {
			deactivate();
		}
	};

	return { active, account, error, connect, disconnect };
};
