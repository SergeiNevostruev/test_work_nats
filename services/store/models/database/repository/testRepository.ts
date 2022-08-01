import dataSourse from "../../../ormconfig";
import { TestContract } from "../../../../lib/contracts";
import { Test } from "../entity/Test";

const testRepository = {
  create: async (data: TestContract.TestRequest<"create">) => {
    const { request } = data;

    const testRepo = dataSourse.getRepository(Test);

    const test = await testRepo.save(request);

    const response = await testRepo.findOne({
      select: ["id", "title", "message"],
      where: { id: test.id },
    });

    if (!response) {
      throw new Error("Не удалось сохранить сообщение в базе данных");
    }

    return response;
  },
  find: async (param: TestContract.TestRequest<"find">) => {
    const { request } = param;

    const conditions = dataSourse
      .createQueryBuilder(Test, "test")
      .limit(request.count);

    if (request.search) {
      conditions.where("test.title ILIKE :title", {
        title: `%${request.search}%`,
      });
    }
    const response = await conditions.getMany();
    return response;
  },
};

export default testRepository;
