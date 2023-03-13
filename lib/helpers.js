export const getFilenameFromPath = (path) => {
	let filename = path.lastIndexOf('/');
	return path.substring(filename + 1);
};

export const getDirFromPath = (path) => {
	let filename = getFilenameFromPath(path);
	return path.replace(filename, '');
};

export const getExtensionFromFilename = (filename) => {
	let extension = filename.lastIndexOf('.');
	return filename.substring(extension + 1);
};
