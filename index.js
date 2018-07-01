const crypto = require( 'crypto-js' );

const INSTRUMENT_TYPES = {
  CREDITCARD: 'CREDITCARD',
  BANKACCOUNT: 'BANKACCOUNT'
};

const CARD_SCHEMES = {
  MASTERCARD: "MASTERCARD",
  VISA: "VISA",
  AMEX: "AMEX",
  DINERS: "DINERS"
};

const CC_MASK_SCHEMES = {
  FOUR_THREE: {
    START: 4,
    END: 3,
    TOTAL_MASKED: 7
  },
  ONE_TWO: {
    START: 1,
    END: 2,
    TOTAL_MASKED: 3
  }
}; // end CC_MASK_SCHEMES

let numString = new RegExp(/^\d+$/);
let bsbString = new RegExp(/^\d{3}-?\d{3}$/);

/**
 * used to mask a number with specs from a supplied scheme
 * @param identifier
 * @param maskScheme
 * @returns {string}
 */
module.exports.maskIdentifier = function( identifier, maskScheme ) {
  let stars = '*'.repeat( identifier.length - CC_MASK_SCHEMES[maskScheme].TOTAL_MASKED );
  let maskedIdentifier = identifier.substring( 0, CC_MASK_SCHEMES[maskScheme].START ) + stars;
  return maskedIdentifier + identifier.substring(identifier.length - CC_MASK_SCHEMES[maskScheme].END);
}; // end maskIdentifier

/**
 * encrypt any string. presently uses a string passed in from SSM
 * @param clearText
 * @param encKey
 * @returns {*}
 */
module.exports.encryptString = function( clearText, encKey ) {
  return crypto.AES.encrypt( clearText, encKey ).toString();
}; // end encryptString

/**
 * decrypt a string using the service key
 * @param cypherText
 * @param encKey
 * @returns {*}
 */
const decryptString = function( cypherText, encKey ) {
  return crypto.AES.decrypt(cypherText.toString(), encKey ).toString( crypto.enc.Utf8 );
}; // end decryptString

/**
 * boolean test that the number could be a BSB
 * @param candidateBsb
 * @returns {boolean}
 */
module.exports.isBsb = function( candidateBsb ) {
  return bsbString.test( candidateBsb )
}; // end isBsb

/**
 * Boolean test that a string is in fact a regular number
 * @param candidateString
 * @returns {boolean}
 */
module.exports.isNumberString = function( candidateString ) {
  return numString.test( candidateString )
}; // end isNumberString

