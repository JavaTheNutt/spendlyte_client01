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
const SummaryView = () => import(
  /* webpackChunkName: "finance-views" */ './components/ViewSummary'
  );

export default [{
  name: 'income',
  path: '/income',
  redirect: '/income/all'
}, {
  name: 'summary',
  path: '/summary',
  icon: 'info_outline',
  component: SummaryView
}, {
  name: 'add-income',
  path: '/income/new',
  component: AddIncomeView
}, {
  name: 'display-income',
  path: '/income/all',
  component: DisplayIncomeView,
  meta: {
    sideNavComponent: 'income-contextual-actions'
  }
}, {
  name: 'display-expenditure',
  path: '/expenditure/all',
  component: DisplayExpenditureView,
  meta: {
    sideNavComponent: 'income-contextual-actions'
  }
}, {
  name: 'expenditure',
  path: '/expenditure',
  redirect: '/expenditure/all'
}, {
  name: 'transaction',
  path: '/transactions/all',
  component: DisplayTransactionView
}, {
  name: 'add-expenditure',
  path: '/expenditure/new',
  component: AddExpenditureView
}];
