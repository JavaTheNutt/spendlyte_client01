// import Profile from './components/Profile';
const Profile = () => import(
  /* webpackChunkName: profile-page*/ './components/Profile'
  );

export default [{
  name: 'profile',
  path: '/profile',
  component: Profile,
  icon: 'supervisor_account'
}];
