import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
  public app: express.Application;
  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    //* logging middleware
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[3]);
      console.log("this is logging middleware");
      next();
    });

    //* json middleware
    this.app.use(express.json());

    //* loading route
    this.setRoute();

    //* 404 middleware
    this.app.use((req, res, next) => {
      console.log("this is errror middleware");
      res.send({ error: "404 not found" });
    });
  }

  public listen() {
    this.setMiddleware();

    this.app.listen(8000, () => {
      console.log("server is on...");
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
