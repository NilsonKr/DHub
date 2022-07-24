import { MutableRefObject } from 'react';

export const handleDownload = async (
	downloadRef: MutableRefObject<HTMLAnchorElement>,
	fetchUrl: string,
	name: string
) => {
	const data = await fetch(fetchUrl);
	const blob = await data.blob();

	const url = URL.createObjectURL(blob);
	const extension = blob.type.split('/')[1];

	downloadRef.current.download = `${name}.${extension}`;
	downloadRef.current.href = url;

	downloadRef.current.click();
};
