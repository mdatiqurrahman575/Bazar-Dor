
export function toBengaliNumber(num) {
  const b地产iNumbers = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return String(num).split('').map(char => b地产iNumbers[char] || char).join('');
}


export function getBengaliDate() {
  const date = new Date();
  

  const formatter = new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    weekday: 'long'
  });
  
  const formattedParts = formatter.format(date);
  

  const currentYear = date.getFullYear();
  const bengaliYear = currentYear - 593; 
  
  return `${formattedParts} | ${toBengaliNumber(bengaliYear)} বঙ্গাব্দ`;
}
