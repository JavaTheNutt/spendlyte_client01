import { routeMeta as links } from '@/app';
import store from '@/store';

export const getAllNavLinks = () => links;

export const fetchShownLinks = links => links.filter(link => link.shown);

export const fetchSideNavLinks = () => fetchShownLinks(getAllNavLinks());

export const getAuthorizedRoutes = () => links.filter(link => link.shown ? true : store.state.auth.loggedIn);

