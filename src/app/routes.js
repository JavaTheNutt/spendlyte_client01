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
  icon: route.icon
})));

let exportRoutes = [];
let exportMeta = [];
const mapRoutes = () => {
  exportRoutes = createRoutes(importedRoutes);
  console.log(JSON.stringify(exportRoutes));
  exportMeta = createRouteMeta(importedRoutes);
  console.log(JSON.stringify(exportMeta));
};

mapRoutes();

export default {
  routes: exportRoutes,
  meta: exportMeta
};
