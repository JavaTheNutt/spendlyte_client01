import { routeMeta as links } from '@/app';
import store from '@/store';
import router from '@/router';

export const getAllNavLinks = () => links;

export const fetchShownLinks = links => links.filter(link => link.shown);

export const fetchSideNavLinks = () => getAuthorizedRoutes().filter(link => link.path !== router.currentRoute.path);

export const getAuthorizedRoutes = () => links.filter(link => link.shown ? true : store.state.auth.loggedIn);

