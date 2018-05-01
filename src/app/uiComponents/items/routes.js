const AddItemView = () => import(
  /* webpackChunkName: "item-views" */ './components/AddItemFormWrapper'
  );

export default [{
  name: 'new item',
  path: '/item',
  redirect: '/item/new',
  icon: 'add'
}, {
  name: 'add-item',
  path: '/item/new',
  component: AddItemView
}];
