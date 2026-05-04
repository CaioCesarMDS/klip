export class NotFoundError extends Error {
  status = 404;
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class InternalError extends Error {
  status = 500;
  constructor(message = "Internal server error") {
    super(message);
    this.name = "InternalError";
  }
}
