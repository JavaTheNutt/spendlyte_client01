import { routeMeta as links } from '@/app';

/* const NAV_LINKS = [{
  title: 'Home',
  route: '/',
  icon: 'home',
  shown: true
}, {
  title: 'Profile',
  route: '/profile',
  icon: 'supervisor_account',
  shown: true
}];*/
export const getAllNavLinks = () => links;

export const fetchShownLinks = links => links.filter(link => link.shown);

export const fetchSideNavLinks = () => fetchShownLinks(getAllNavLinks());

