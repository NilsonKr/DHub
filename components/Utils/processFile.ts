const mimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

export function ProcessFile(file: File) {
	if (mimeTypes.includes(file.type)) {
		const blob = new Blob([file], { type: file.type });
		const src = URL.createObjectURL(blob);
		return src;
	} else {
		return false;
	}
}
