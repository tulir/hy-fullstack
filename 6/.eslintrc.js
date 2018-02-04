module.exports = {
	"env": {
		"commonjs": true,
		"es6": true,
		"browser": true,
	},
	"extends": ["eslint:recommended", "plugin:jest/recommended", "plugin:react/recommended"],
	"parser": "babel-eslint",
	/*"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"ecmaVersion": 8,
		"sourceType": "module"
	},*/
	"plugins": [
		"react",
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
		"no-console": "off",
		"react/prop-types": "off"
	}
}
