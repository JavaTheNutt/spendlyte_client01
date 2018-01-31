import AddIncomeView from './components/AddIncomeView';
import AddExpenditureView from './components/AddExpenditureView';

export default [{
  name: 'income',
  path: '/income',
  redirect: '/income/new',
  icon: 'attach_money arrow_left'
}, {
  name: 'add-income',
  path: '/income/new',
  component: AddIncomeView
}, {
  name: 'expenditure',
  path: '/expenditure',
  redirect: '/expenditure/new',
  icon: 'attach_money arrow_right'
}, {
  name: 'add-expenditure',
  path: '/expenditure/new',
  component: AddExpenditureView
}];
