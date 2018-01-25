module.exports = {
	"env": {
		"commonjs": true,
		"es6": true,
		"node": true,
		"jest/globals": true
	},
	"extends": ["eslint:recommended", "plugin:jest/recommended"],
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"ecmaVersion": 8,
		"sourceType": "module"
	},
	"plugins": [
		"jest"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"no-console": "off"
	}
}
