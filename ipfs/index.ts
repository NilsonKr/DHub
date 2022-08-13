import { create } from 'ipfs-http-client';

//TO-DO: Pass this logic to server-side using NEXT API pages

// const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

export const IPFSClient = create({
	url: 'https://ipfs.infura.io:5001/api/v0',
	headers: {
		// authorization,
	},
});
