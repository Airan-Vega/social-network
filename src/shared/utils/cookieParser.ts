import { Response, Request, CookieOptions } from "express";

const cookiesOptions: CookieOptions = {
  httpOnly: true, // Solo se puede acceder a la cookie desde el servidor
  secure: process.env.NODE_ENV === "production", // Solo se puede acceder desde https
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "none", // La cookie solo se puede acceder en el mismo domino
};

export const setCookie = ({
  res,
  name,
  value,
}: {
  res: Response;
  name: string;
  value: string;
}) => {
  res.cookie(name, value, cookiesOptions);
};

export const getCookie = (req: Request, name: string) => {
  return req.cookies[name];
};

export const clearCookie = (res: Response, name: string) => {
  // Cuando se limpia las cookies hay que pasarles las mismas opciones con las que se creo para que el navegador las limpie.
  // Si no se le pasa estas opciones el navegador no las concidera iguales a las que ya existen.
  res.clearCookie(name, cookiesOptions);
};
