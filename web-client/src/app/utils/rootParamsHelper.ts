import { ActivatedRoute } from '@angular/router';


export function getRouterParam (route: ActivatedRoute, param: string) {
  const currentRoute = route.pathFromRoot.find(path => (path.routeConfig || {}).path === `:${param}`);
  return currentRoute ? currentRoute.snapshot.params[param] : null;
}
