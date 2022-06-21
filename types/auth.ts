export type User = {
	name: string;
	profileUrl: string;
};

export type loginReturn = {
	error: null | string;
	payload: null | User;
};
