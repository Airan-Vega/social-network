export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;

    // Necesario en TypeScript cuando se extiende de Error
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
