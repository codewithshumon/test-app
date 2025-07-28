// Currency configurations
const CURRENCY_CONFIG = {
  US: {
    major: 'Dollar',
    majorPlural: 'Dollars',
    minor: 'Cent',
    minorPlural: 'Cents',
    conjunction: 'and',
    suffix: 'Only'
  },
  GB: {
    major: 'Pound',
    majorPlural: 'Pounds',
    minor: 'Pence',
    minorPlural: 'Pence',
    conjunction: 'and',
    suffix: 'Only'
  },
  BD: {
    major: 'Taka',
    majorPlural: 'Taka',
    minor: 'Paisa',
    minorPlural: 'Poisha',
    conjunction: 'and',
    suffix: 'Only'
  },
  IN: {
    major: 'Rupee',
    majorPlural: 'Rupees',
    minor: 'Paise',
    minorPlural: 'Paise',
    conjunction: 'and',
    suffix: 'Only'
  },
  AE: {
    major: 'Dirham',
    majorPlural: 'Dirhams',
    minor: 'Fils',
    minorPlural: 'Fils',
    conjunction: 'and',
    suffix: 'Only'
  },
  MY: {
    major: 'Ringgit',
    majorPlural: 'Ringgit',
    minor: 'Sen',
    minorPlural: 'Sen',
    conjunction: 'and',
    suffix: 'Only'
  },
  PK: {
    major: 'Rupee',
    majorPlural: 'Rupees',
    minor: 'Paisa',
    minorPlural: 'Paisa',
    conjunction: 'and',
    suffix: 'Only'
  },
  CA: {
    major: 'Dollar',
    majorPlural: 'Dollars',
    minor: 'Cent',
    minorPlural: 'Cents',
    conjunction: 'and',
    suffix: 'Only'
  },
  QA: {
    major: 'Riyal',
    majorPlural: 'Riyals',
    minor: 'Dirham',
    minorPlural: 'Dirhams',
    conjunction: 'and',
    suffix: 'Only'
  },
  SA: {
    major: 'Riyal',
    majorPlural: 'Riyals',
    minor: 'Halala',
    minorPlural: 'Halalas',
    conjunction: 'and',
    suffix: 'Only'
  }
};

// Main conversion function
export const convertToWords = (amount, localeCode = 'BD') => {
  const config = CURRENCY_CONFIG[localeCode.toUpperCase()] || CURRENCY_CONFIG.US;
  
  if (isNaN(amount) || amount === null) {
    return `Zero ${config.majorPlural} ${config.suffix}`;
  }

  const num = parseFloat(amount);
  if (num === 0) {
    return `Zero ${config.majorPlural} ${config.suffix}`;
  }

  const dollars = Math.floor(num);
  const cents = Math.round((num - dollars) * 100);

  const majorWord = dollars === 1 ? config.major : config.majorPlural;
  let result = `${convertNumberToWords(dollars)} ${majorWord}`;
  
  if (cents > 0) {
    const minorWord = cents === 1 ? config.minor : config.minorPlural;
    result += ` ${config.conjunction} ${convertNumberToWords(cents)} ${minorWord}`;
  }
  
  return `${result} ${config.suffix}`;
};

// Helper function to convert numbers to words
const convertNumberToWords = (num) => {
  if (num === 0) return 'Zero';
  
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  const chunkToWords = (n) => {
    if (n === 0) return '';
    let words = '';
    
    if (n >= 100) {
      words += units[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    
    if (n >= 20) {
      words += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    } else if (n >= 10) {
      words += teens[n - 10] + ' ';
      n = 0;
    }
    
    if (n > 0) {
      words += units[n] + ' ';
    }
    
    return words.trim();
  };

  let words = '';
  let scaleIndex = 0;
  
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      let chunkWords = chunkToWords(chunk);
      if (scaleIndex > 0) {
        chunkWords += ' ' + scales[scaleIndex];
      }
      words = chunkWords + ' ' + words;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }
  
  return words.trim();
};

// React component wrapper
export const CurrencyToWords = ({ amount, localeCode = 'BD' }) => {
  const words = convertToWords(amount, localeCode);
  return words;
}


export const toCapitalize = (value) => (value && value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()));

export const formateTime = (isoTime) => {

  if(!isoTime) return;

  const [hours, minutes] = isoTime.split(':');
  let hoursNum = parseInt(hours);
  const ampm = hoursNum >= 12 ? 'PM' : 'AM';
  hoursNum = hoursNum % 12;
  hoursNum = hoursNum || 12;
  return `${hoursNum}:${minutes} ${ampm}`;
}


export const formateDate = (date) =>{
  date = new Date(date);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options).replace(',', '');
  
  return formattedDate

}