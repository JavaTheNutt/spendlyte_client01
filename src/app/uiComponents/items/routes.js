const AddItemView = () => import(
  /* webpackChunkName: "item-views" */ './components/AddItemFormWrapper'
  );

export default [{
  name: 'item',
  path: '/item',
  redirect: '/item/new',
  icon: 'shopping_basket'
}, {
  name: 'add-item',
  path: '/item/new',
  component: AddItemView
}];
