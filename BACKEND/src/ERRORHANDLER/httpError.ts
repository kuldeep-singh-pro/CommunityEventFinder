export class HttpError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class ClientError extends HttpError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

export class BadRequest extends ClientError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class Unauthorized extends ClientError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class Forbidden extends ClientError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class NotFound extends ClientError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class Conflict extends ClientError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

export class ServerError extends HttpError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

export class InternalServerError extends ServerError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}
