import Home from './home/Home';

const About = () => import(
  /* webpackChunkName: "about-view" */ './home/About'
  );
const References = () => import(
  /* webpackChunkName: "references-view*/ './references/References'
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
}, {
  name: 'references',
  path: '/references',
  component: References,
  icon: 'description',
  meta: {
    noAuth: true
  }
}];
