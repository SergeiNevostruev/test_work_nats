import Joi from "joi";
import Hapi from "@hapi/hapi";
import testController from "../controllers/testController";

const testRoute: Hapi.ServerRoute[] = [
  {
    method: "GET",
    path: "/api/test",
    options: {
      handler: testController.test,
      description: "Get products of database",
      notes: "Returns array with users",
      tags: ["api"],
      validate: {
        options: {
          allowUnknown: true,
        },
        query: Joi.object({
          search: Joi.string(),
          count: Joi.string().regex(/\d/),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/api/create",
    options: {
      handler: testController.create,
      description: "Get products of database",
      notes: "Returns array with users",
      tags: ["api"],
      validate: {
        options: {
          allowUnknown: true,
        },
        query: Joi.object({
          title: Joi.string(),
          message: Joi.string(),
        }),
      },
    },
  },
];

export default testRoute;
