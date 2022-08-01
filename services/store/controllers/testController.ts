import { TestContract } from "../../lib/contracts";
import testRepository from "../models/database/repository/testRepository";

const controller = async (
  data: TestContract.TestRequest<"create" | "find">
) => {
  switch (data.type) {
    case "create":
      try {
        const response = await testRepository.create(
          data as TestContract.TestRequest<"create">
        );
        // console.log(response);

        return { done: true, message: response };
      } catch (error) {
        return { done: false, message: "Ошибка базы данных" };
      }

      break;
    case "find":
      try {
        const response = await testRepository.find(
          data as TestContract.TestRequest<"find">
        );
        // console.log(response);
        return { done: true, message: response };
      } catch (error) {
        return { done: false, message: "Ошибка базы данных" };
      }

      break;

    default:
      break;
  }
};

export default { controller };
