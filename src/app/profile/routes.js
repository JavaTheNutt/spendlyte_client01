import Profile from './components/Profile';

export default [{
  name: 'profile',
  path: '/profile',
  component: Profile,
  meta: { requireAuth: true }
}];
