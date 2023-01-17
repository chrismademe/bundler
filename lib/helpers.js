const getFilenameFromPath = (path) => {
	let filename = path.lastIndexOf('/');
	return path.substring(filename + 1);
};

const getDirFromPath = (path) => {
	let filename = getFilenameFromPath(path);
	return path.replace(filename, '');
};

module.exports = { getFilenameFromPath, getDirFromPath };
