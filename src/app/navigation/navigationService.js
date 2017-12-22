const NAV_LINKS = [{
  title: 'home',
  route: '/',
  icon: 'home',
  shown: true
}];
export const getAllNavLinks = () => NAV_LINKS;

export const fetchShownLinks = links => links.filter(link => link.shown);

