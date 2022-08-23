export type Item = {
	id: string;
	title: string;
	description: string;
	uploadDate: string;
	size: string;
	url: string;
	shareable: boolean;
};

export type DocTags = {
	[x: string]: number[];
};

export type TagsRecord = {
	tags: string[];
	linkedDocs: DocTags;
};
