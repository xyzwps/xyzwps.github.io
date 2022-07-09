import redisRoutes from "./redis/routes";

const data = {
  redis: redisRoutes,
};

const routes = {};

for (const anthologyPath in data) {
  const epigrams = data[anthologyPath];
  for (const epigramPath in epigrams) {
    routes[`${anthologyPath}/${epigramPath}`] = epigrams[epigramPath];
  }
}

export default routes;
