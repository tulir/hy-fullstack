module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": false,
	},
	"extends": ["eslint:recommended", "plugin:jest/recommended", "plugin:react/recommended"],
	"parser": "babel-eslint",
	/*"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true,
		},
		"ecmaVersion": 8,
		"sourceType": "module",
	},*/
	"plugins": [
		"react",
		"jest",
	],
	"rules": {
		"indent": [
			"error",
			"tab",
		],
		"linebreak-style": [
			"error",
			"unix",
		],
		"quotes": [
			"error",
			"double",
		],
		"semi": [
			"error",
			"never",
		],
		"react/prop-types": "off",
		"no-console": "off",
	},
}
