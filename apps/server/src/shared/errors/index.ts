export type AppErrorCode = "NOT_FOUND" | "INTERNAL_ERROR";

export abstract class AppError extends Error {
  abstract readonly status: number;
  abstract readonly code: AppErrorCode;

  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  readonly status = 404 as const;
  readonly code = "NOT_FOUND" as const;

  constructor(message = "Resource not found") {
    super(message);
  }
}

export class InternalError extends AppError {
  readonly status = 500 as const;
  readonly code = "INTERNAL_ERROR" as const;

  constructor(message = "Internal server error") {
    super(message);
  }
}
