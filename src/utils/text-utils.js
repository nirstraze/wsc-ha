/**
 * converts camel case to normal text
 * @param {string} text 
 */
export function camelCaseToNormal(text) {
    return text// insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function (str) {
            return str.toUpperCase();
        }).replace('_',' ')
}

/**
 * Returns true if text is a valid number
 * @param {string} text 
 */
export function isNumericData(text) {
    return !isNaN(text);
}
