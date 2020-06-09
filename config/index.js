const Config = function () {
	return {
		// appMode:	"production",
		appMode:	"development",
		appPort:	"8080",

		pathStatic: "public",
	};
};

module.exports = new Config();
