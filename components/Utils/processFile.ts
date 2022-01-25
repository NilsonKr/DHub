const mimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

export function ProcessFile(file: File) {
	if (mimeTypes.includes(file.type)) {
		const blob = new Blob([file], { type: file.type });
		const src = URL.createObjectURL(blob);
		// const filreader = new FileReader()
		// filreader.readAsDataURL(blob)

		return src;
	} else {
		return false;
	}
}
