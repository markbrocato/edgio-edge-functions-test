// This file was added by edgio init.
// You should commit this file to source control.
import { Router, edgioRoutes } from "@edgio/core"

export default new Router()
  .get("/", {
    edge_function: "./functions/rewrite.js",
  })
  .use(edgioRoutes)
