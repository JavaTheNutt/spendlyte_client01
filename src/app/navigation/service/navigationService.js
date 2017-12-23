const NAV_LINKS = [{
  title: 'Home',
  route: '/',
  icon: 'home',
  shown: true
}, {
  title: 'Profile',
  route: '/profile',
  icon: 'supervisor_account',
  shown: true
}];
export const getAllNavLinks = () => NAV_LINKS;

export const fetchShownLinks = links => links.filter(link => link.shown);

export const fetchSideNavLinks = () => fetchShownLinks(getAllNavLinks());

