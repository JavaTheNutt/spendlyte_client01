const AddIncomeView = () => import(
  /* webpackChunkName: "finance-views" */ './components/AddIncomeView'
  );
const AddExpenditureView = () => import(
  /* webpackChunkName: "finance-views" */ './components/AddExpenditureView'
  );
const DisplayIncomeView = () => import(
  /* webpackChunkName: "finance-views" */ './components/DisplayIncomeView'
  );
const DisplayExpenditureView = () => import(
  /* webpackChunkName: "finance-views" */ './components/DisplayExpenditureView'
  );
const DisplayTransactionView = () => import(
  /* webpackChunkName: "finance-views" */ './components/DisplayTransactionView'
  );

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
