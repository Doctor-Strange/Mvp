import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

function LongDate(date) {
  return moment(date).format('dddd jDD jMMMM jYY');
}

function ShortDate(date) {
  return moment(date).format('jYY/jMM/jDD');
}

function convertDateToMoment(date: IDate) {
  if (!date) return;
  const formatedDate = `${date.year}/${date.month}/${date.day}`;
  return moment(formatedDate, 'jYYYY/jMM/jDD');
}

function convertRangeDateToMoment(date: IRange) {
  if (!date) return;
  return {
    from: convertDateToMoment(date.from),
    to: convertDateToMoment(date.to)
  };
}

function convertMomentToDate(date) {
  if (!date) return;
  return {
    day: Number(moment(date).format('jDD')),
    month: Number(moment(date).format('jMM')),
    year: Number(moment(date).format('jYYYY'))
  };
}

function convertMomentsToDateRange(start, end) {
  if (!start && !end) return;
  return {
    from: convertMomentToDate(start),
    to: convertMomentToDate(end)
  };
}

function getBetweenRange(date: IRange) {
  const { from, to } = convertRangeDateToMoment(date);
  if (from && to) {
    // console.log('from and to  are:', { from, to });
    const days = [];
    const out = [];
    const duration = from.diff(to, 'days');
    // console.log('duration is:', duration);
    for (let i = 0; i <= -duration; i++) {
      days.push(moment(from).add(i, 'days'));
    }
    // console.log('days is:', out);
    days.map((value, index) => {
      out.push(convertMomentToDate(value));
    });
    // console.log('out is:', out);
    return out;
  }
}

interface IDate {
  year: number;
  month: number;
  day: number;
}

interface IRange {
  from: IDate;
  to: IDate;
}

export {
  LongDate,
  ShortDate,
  convertDateToMoment,
  convertRangeDateToMoment,
  convertMomentToDate,
  convertMomentsToDateRange,
  getBetweenRange
};
