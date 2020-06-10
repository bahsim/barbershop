const Config = function () {
	return {
		appMode:	process.env.MODE || "development",
		appPort:	process.env.PORT || "8080",

		pathStatic: "public",
	};
};

module.exports = new Config();
