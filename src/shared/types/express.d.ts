import { TokenPayload } from "../../modules/auth/application/services/token.service";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
