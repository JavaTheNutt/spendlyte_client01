import Home from './home/Home';

const About = () => import(
  /* webpackChunkName: "about-view" */ './home/About'
  );

export default [{
  name: 'home',
  path: '/',
  component: Home,
  icon: 'home',
  meta: {
    noAuth: true
  }
}, {
  name: 'about',
  path: '/about',
  component: About,
  icon: 'lightbulb_outline',
  meta: {
    noAuth: true
  }
}];
