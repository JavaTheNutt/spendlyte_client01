import { routes as screens } from './uiComponents/screens';
import { routes as profile } from './uiComponents/profile';

const importedRoutes = [...screens, ...profile];

const createRoutes = routeDef => (routeDef.map(route => ({
  name: route.name,
  path: route.path,
  meta: route.meta,
  component: route.component
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

