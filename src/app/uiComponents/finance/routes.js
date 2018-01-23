import AddFinanceFormWrapper from './components/AddFinanceFormWrapper';

export default [{
  name: 'income',
  path: '/income',
  redirect: '/income/new',
  icon: 'attach_money arrow_left'
}, {
  name: 'add-income',
  path: '/income/new',
  component: AddFinanceFormWrapper
}, {
  name: 'expenditure',
  path: '/expenditure',
  redirect: '/expenditure/new',
  icon: 'attach_money arrow_right'
}, {
  name: 'add-expenditure',
  path: '/expenditure/new',
  component: AddFinanceFormWrapper
}];
