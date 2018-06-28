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
export function maskIdentifier( identifier, maskScheme ) {
  let stars = '*'.repeat( identifier.length - CC_MASK_SCHEMES[maskScheme].TOTAL_MASKED );
  let maskedIdentifier = identifier.substring( 0, CC_MASK_SCHEMES[maskScheme].START ) + stars;
  return maskedIdentifier + identifier.substring(identifier.length - CC_MASK_SCHEMES[maskScheme].END);
} // end maskIdentifier

/**
 * encrypt any string. presently uses a string passed in from SSM
 * @param clearText
 * @returns {*}
 */
export function encryptString( clearText, encKey ) {
  return crypto.AES.encrypt( clearText, encKey ).toString();
} // end encryptString

/**
 * boolean test that the number could be a BSB
 * @param candidateBsb
 * @returns {boolean}
 */
export function isBsb( candidateBsb ) {
  return bsbString.test( candidateBsb )
}

/**
 * Boolean test that a string is in fact a regular number
 * @param candidateString
 * @returns {boolean}
 */
export function isNumberString( candidateString ) {
  return numString.test( candidateString )
}