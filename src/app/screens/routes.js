const Home = () => import(
  /* webpackChunkName: home-view */ './home/Home'
  );

export default [{
  name: 'home',
  path: '/',
  component: Home,
  icon: 'home',
  meta: {
    noAuth: true
  }
}];
