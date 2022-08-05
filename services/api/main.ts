import init from "./src/lib/server";
import * as Nats from "nats";
import config from "./src/config";
import dotenv from "dotenv";
dotenv.config();

init();

const option: Nats.ConnectionOptions = {
  name: config.natsName,
  servers: process.env.NATS_HOST || config.natsHost,
  // port: config.natsPort,
};
const nats = Nats.connect(option);

console.log(`Nats starts on ${option.servers}`);
console.log(`Nats documentation running on http://localhost:8222`);

export default { nats };
