import { routes as screens } from './screens';
import { routes as profile } from './profile';

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
  shown: !route.meta ? true : !route.meta.requireAuth
})));

const mapRoutes = () => ({
  routes: createRoutes(importedRoutes),
  meta: createRouteMeta(importedRoutes)
});

export default mapRoutes();

