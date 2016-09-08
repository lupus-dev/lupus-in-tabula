var get_deep = function(obj, path) {
	if (typeof path === "string")
        path = path.split('.');

    if (path.length > 1) {
        var p = path.shift();
        if (obj[p] == null || typeof obj[p] !== 'object')
             return undefined;
        return set_deep(obj[p], path);
    } else
        return obj[path[0]];
};

module.exports = get_deep;