var set_deep = function(obj, path, value) {
	if (typeof path === "string")
        path = path.split('.');

    if (path.length > 1) {
        var p = path.shift();
        if (obj[p] == null || typeof obj[p] !== 'object')
             obj[p] = {};
        set_deep(obj[p], path, value);
    } else
        obj[path[0]] = value;
};

module.exports = set_deep;
