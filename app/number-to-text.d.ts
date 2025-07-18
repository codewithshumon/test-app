// types/number-to-text.d.ts
declare module 'number-to-text' {
  export function convertToText(num: number | string): string;
  export function numberToWords(num: number): string;
  export function numberToCurrencyWords(
    amount: number | string,
    countryCode?: string
  ): string;
  
  // Default export if the module uses one
  const numberToText: {
    convertToText: (num: number | string) => string;
    numberToWords: (num: number) => string;
    numberToCurrencyWords: (amount: number | string, countryCode?: string) => string;
  };
  
  export default numberToText;
}