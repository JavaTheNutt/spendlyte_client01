import { routes as screens } from './uiComponents/screens';
import { routes as profile } from './uiComponents/profile';
import { routes as finance } from './uiComponents/finance';
import { routes as items } from './uiComponents/items';

const importedRoutes = [...screens, ...profile, ...finance, ...items];

const createRoutes = routeDef => (routeDef.map(route => ({
  name: route.name,
  path: route.path,
  meta: route.meta,
  component: route.component,
  children: route.children,
  redirect: route.redirect
})));

const createRouteMeta = routeDef => (routeDef.map(route => ({
  title: `${route.name[0].toUpperCase()}${route.name.substring(1)}`,
  path: route.path,
  icon: route.icon,
  hidden: !route.meta ? true : !route.meta.noAuth
})));

const mapRoutes = () => ({
  routes: createRoutes(importedRoutes),
  meta: createRouteMeta(importedRoutes)
});

export default mapRoutes();

