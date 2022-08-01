import * as Nats from "nats";
import { TestContract } from "../lib/contracts";
import testController from "./controllers/testController";
import db from "./ormconfig";

console.log("[STORE]: Привет я - STORE!");

const option: Nats.ConnectionOptions = {
  name: "store",
  // servers: 'localhost',
  port: 4222,
};

const subscribeName = "store";

const sc = Nats.StringCodec();
const jc = Nats.JSONCodec();

const store = Nats.connect(option);
store
  .then(async (v) => {
    v.subscribe(subscribeName, {
      async callback(err, msg) {
        console.log(jc.decode(msg.data));
        const data = jc.decode(msg.data) as TestContract.TestRequest<
          "create" | "find"
        >;
        const dbResponse = await testController.controller(data);

        msg.respond(jc.encode(dbResponse));
      },
    });
  })
  .catch((e) => console.log(e));

db.initialize()
  .then(async (ds) => {
    console.log("Соединение с базой данных установлено");
    // запуск миграций
    await db.runMigrations();
  })
  .catch((err) => {
    console.error(" Ошибка базы данных ====> ", err);
  });
