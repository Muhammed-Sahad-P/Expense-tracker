export class StandardResponse<T = unknown> {
  statusCode: number;
  status: string;
  message: string;
  data?: T;

  constructor(message: string, data?: T, statusCode = 200) {
    this.statusCode = statusCode;
    this.status = "success";
    this.message = message;
    this.data = data;
  }
}
