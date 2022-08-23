import { IPFSClient } from '../';

type MethodReturn = {
	error: boolean;
	payload: any;
};

export const addFileToIpfs = async (file: any): Promise<MethodReturn> => {
	try {
		const ipfsResult = await IPFSClient.add(file);
		return { error: false, payload: ipfsResult };
	} catch (error) {
		return { error: true, payload: error };
	}
};

export const getFile = async (url: string): Promise<MethodReturn> => {
	try {
		const fileResult = await window.fetch(url);
		const fileBlob = await fileResult.blob();

		return { error: false, payload: fileBlob };
	} catch (error) {
		return { error: true, payload: error };
	}
};
