export const cssPropertiesParent = [
	'flexDirection',
	'flexWrap',
	'justifyContent',
	'alignItems',
	'alignContent'
];

export const cssPropertiesFlexItem = ['flexGrow', 'flexShrink', 'flexBasis'];

export const defaultParentFlexBoxCssProperties = {
	flexDirection: 'row',
	flexWrap: 'wrap',
	justifyContent: 'flex-start',
	alignItems: 'flex-start',
	alignContent: 'flex-start'
};

export const defaultFlexItemCssProperties = {
	flexGrow: '0',
	flexShrink: '1',
	flexBasis: 'auto'
};

export const capitalToHyphen = (str) => str.replace(/[A-Z]/, (match) => `-${match.toLowerCase()}`);

export const cssPropertiesMap = [...cssPropertiesParent, ...cssPropertiesFlexItem].reduce(
	(map, cssProp) => {
		return {
			...map,
			[cssProp]: capitalToHyphen(cssProp)
		};
	},
	{}
);

export const convertStyleObjectToCSSString = (styleObj, cssProperties = []) => {
	let cssString = '';

	if (cssProperties.length) {
		cssProperties.forEach((cssProp) => {
			const nativeCss = capitalToHyphen(cssProp);
			cssString += `${nativeCss}: ${styleObj[cssProp]};\n`;
		});
	} else {
		Object.keys(styleObj).forEach((cssProp) => {
			const nativeCss = capitalToHyphen(cssProp);
			cssString += `${nativeCss}: ${styleObj[cssProp]};\n`;
		});
	}

	return cssString;
};

export const replaceInlineCssStr = (inlineCssStr, cssProp, value) => {
	const nativeCssProperty = cssPropertiesMap[cssProp];
	const regex = new RegExp(`${nativeCssProperty}.[^;]*`, 'g');
	return inlineCssStr.replace(regex, `${nativeCssProperty}: ${value}`);
};
