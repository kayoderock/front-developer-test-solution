
import Moment from 'moment';

export default {
  currencySymbol (currency) {
    const symbols = new Map([
      ['EUR', '&euro;'],
      ['NGR', '&#8358;'],
      ['DKK', '&#107'],
      ['GBP', '&pound;'],
      ['DKK', '&#107'],
    ])
      
    return symbols.get(currency);
  },
  timeAgo (date) {
    return Moment(date, "YYYYMMDD").fromNow();
  },
}