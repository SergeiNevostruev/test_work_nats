// import swagger
import * as Hapi from "@hapi/hapi";
import * as HapiSwagger from "hapi-swagger";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
// import * as jwt from "@hapi/jwt";
// import ip from "hapi-geo-locate";

// options swagger
// =====================================================================================
const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: "API Documentation",
    description: "API Documentation",
  },
  jsonPath: "/documentation.json",
  documentationPath: "/documentation",
  schemes: ["http", "https"],
  debug: true,
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
    },
  },
};

const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert,
  },
  {
    plugin: Vision,
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
  // jwt,
  // ip,
];

export default plugins;
