import { create } from 'ipfs-http-client';

const { INFURA_ID, INFURA_SECRET } = process.env;

const authorization = 'Basic ' + btoa(INFURA_ID + ':' + INFURA_SECRET);

export const IPFSClient = create({
	url: 'https://ipfs.infura.io:5001/api/v0',
	headers: {
		authorization,
	},
});
