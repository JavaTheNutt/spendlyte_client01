import AddIncomeView from './components/AddIncomeView';
import AddExpenditureView from './components/AddExpenditureView';
import DisplayIncomeView from './components/DisplayIncomeView';
import DisplayExpenditureView from './components/DisplayExpenditureView';
import DisplayTransactionView from './components/DisplayTransactionView';

export default [{
  name: 'income',
  path: '/income',
  redirect: '/income/all',
  icon: 'attach_money arrow_left'
}, {
  name: 'add-income',
  path: '/income/new',
  component: AddIncomeView
}, {
  name: 'display-income',
  path: '/income/all',
  component: DisplayIncomeView
}, {
  name: 'display-expenditure',
  path: '/expenditure/all',
  component: DisplayExpenditureView
}, {
  name: 'expenditure',
  path: '/expenditure',
  redirect: '/expenditure/all',
  icon: 'attach_money arrow_right'
}, {
  name: 'transaction',
  path: '/transactions/all',
  component: DisplayTransactionView,
  icon: 'attach_money'
}, {
  name: 'add-expenditure',
  path: '/expenditure/new',
  component: AddExpenditureView
}];
