import { itemHttp } from '@/http';
import { fetchHeaders } from '@/http/util';

export const addItem = async details => {
  console.log('attempting to add item using details', details);
  const mappedDetails = mapItemWithData(details);
  const headers = await fetchHeaders();
  const res = await itemHttp.post('/', { item: mappedDetails }, { headers: headers.data });
  return res.status === 200;
};

export const fetchMonthlySummary = async () => {
  console.log('attempting to fetch monthly summary details');
  const headers = await fetchHeaders();
  const res = await itemHttp.get('/summary', { headers: headers.data });
  console.log('result of summary fetch', res);
  return mapSummary(res.data);
};
export const fetchMonthlySummaryList = async (periodic = false) => {
  console.log('attempting to fetch summary list');
  const headers = await fetchHeaders();
  const res = await itemHttp.get('/summary?list=true', { headers: headers.data });
  console.log('result of summary fetch', res);
  return periodic ? mapPeriodicSummaryList(res.data) : mapSummaryList(res.data);
};
const mapSummary = summary => {
  console.log('mapping summary', summary);
  const newSummary = [];
  newSummary[0] = Object.assign({ name: 'today' }, summary.daily);
  newSummary[1] = Object.assign({ name: 'next 7 days' }, summary.weekly.inc);
  newSummary[2] = Object.assign({ name: 'next 30 days' }, summary.monthly.inc);
  return newSummary;
};

const mapPeriodicSummaryList = summaryList => {
  const response = {
    today: [],
    thisWeek: [],
    thisMonth: []
  };
  summaryList.forEach(item => {
    const baseItem = {
      amount: item.amount,
      title: item.title,
      type: item.finance.direction > 0 ? 'Income' : 'Expense'
    };
    item.dates.today.forEach(date => {
      response.today.push(Object.assign({ date }, baseItem));
    });
    item.dates.thisWeek.forEach(date => {
      response.thisWeek.push(Object.assign({ date }, baseItem));
    });
    item.dates.thisMonth.forEach(date => {
      response.thisMonth.push(Object.assign({ date }, baseItem));
    });
  });
  const mappedBase = summaryList.map(item => {
    item.dates = item.dates.today.concat(item.dates.thisWeek.concat(item.dates.thisMonth));
    item.type = item.finance.direction > 0 ? 'Income' : 'Expense';
    return item;
  });
  return { data: response, base: mappedBase };
};
const mapSummaryList = summaryList => {
  console.log('attempting to generate monthly summary list from', summaryList);
  let newList = [];
  summaryList.forEach(item => {
    console.log('converting item', item);
    const baseList = [];
    const baseItem = {
      amount: item.amount,
      title: item.title,
      type: item.finance.direction > 0 ? 'Income' : 'Expense'
    };
    console.log('base list for item', baseItem);
    const allDates = item.dates.thisMonth.concat(item.dates.thisWeek.concat(item.dates.today));
    console.log('all dates for item', allDates);
    allDates.forEach(date => {
      console.log('adding date', date, 'to base item');
      baseList.push(Object.assign({ date }, baseItem));
    });
    console.log('baselist is now', baseList);
    newList = newList.concat(baseList);
  });
  console.log('returning', newList);
  return { data: newList, base: summaryList };
};

const mapItemWithData = details => ({
  title: details.title,
  amount: details.amount,
  tags: details.tags,
  isIncome: details.isIncome,
  isRecurring: details.isRecurring,
  dates: [details.nextDueDate],
  frequency: details.frequency ? details.frequency.toLowerCase() : undefined,
  freq01: details.freq01,
  freq02: details.freq02,
  type: details.type,
  interval: details.interval
});

