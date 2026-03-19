import { Response, Request } from "express";

export const setCookie = ({
  res,
  name,
  value,
}: {
  res: Response;
  name: string;
  value: string;
}) => {
  res.cookie(name, value, {
    httpOnly: true, // Solo se puede acceder a la cookie desde el servidor
    secure: process.env.NODE_ENV === "production", // Solo se puede acceder desde https
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "none", // La cookie solo se puede acceder en el mismo domino
  });
};

export const getCookie = (req: Request, name: string) => {
  return req.cookies[name];
};

export const clearCookie = (res: Response, name: string) => {
  res.clearCookie(name);
};
