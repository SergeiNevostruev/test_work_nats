import * as Nats from "nats";
import * as uuid from "uuid";
import * as Hapi from "@hapi/hapi";
import main from "../../main";
import config from "../config";
import { TestContract } from "../../../lib/contracts";

const reqResp = async (data: TestContract.TestRequest<"create" | "find">) => {
  const jc = Nats.JSONCodec();
  // const sc = Nats.StringCodec();
  const replyId = uuid.v4();
  (await main.nats).request(config.subscribeName, jc.encode(data), {
    timeout: 1000,
    reply: replyId,
    noMux: true,
  });
  const response = new Promise(async (resolve, reject) => {
    (await main.nats).subscribe(replyId, {
      callback(err, msg) {
        if (err) reject("Ошибка сервера");
        resolve(jc.decode(msg.data));
      },
    });
  });
  // console.log(await response);
  return await response;
};

const test: Hapi.Lifecycle.Method = async (request, h) => {
  console.log("Прилетел запрос поиска");
  const requestToNats: TestContract.TestRequest<"find"> = {
    type: "find",
    request: {
      search: request.query.search,
      count: request.query.count,
    },
  };
  const response = await reqResp(requestToNats);
  return response;
};

const create: Hapi.Lifecycle.Method = async (request, h) => {
  console.log("Прилетел запрос создания");
  const requestToNats: TestContract.TestRequest<"create"> = {
    type: "create",
    request: {
      title: request.query.title,
      message: request.query.message,
    },
  };
  const response = await reqResp(requestToNats);
  return response;
};

export default { test, create };
