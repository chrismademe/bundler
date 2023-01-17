const getFilenameFromPath = (path) => {
	let filename = path.lastIndexOf('/');
	return path.substring(filename + 1);
};

const getDirFromPath = (path) => {
	let filename = getFilenameFromPath(path);
	return path.replace(filename, '');
};

const getExtensionFromFilename = (filename) => {
	let extension = filename.lastIndexOf('.');
	return filename.substring(extension + 1);
};

module.exports = { getFilenameFromPath, getDirFromPath, getExtensionFromFilename };
