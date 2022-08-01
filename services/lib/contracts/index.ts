export namespace TestContract {
  type RequestType = "create" | "find";

  interface RequestCreateType {
    title: string;
    message: string;
  }

  interface RequestFindType {
    search: string;
    count: number;
  }

  interface ResponseCreateType {
    done: boolean;
    message: string;
  }

  interface ResponseFindType {
    done: boolean;
    message: any | any[];
  }

  export class TestRequest<T extends RequestType> {
    type: T;
    request: T extends "create" ? RequestCreateType : RequestFindType;
  }

  export class TestResponse<T extends RequestType> {
    type: T;
    request: T extends "create" ? ResponseCreateType : ResponseFindType;
  }
}
