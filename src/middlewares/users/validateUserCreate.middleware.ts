import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { IValidateUser } from "../../interfaces/users";

const validateUserCreate =
  (schema: SchemaOf<IValidateUser>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const file: any = req.file;
      const data = { ...body, ...file };

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        next();
      } catch (err: any) {
        return res.status(400).json({
          message: err.errors?.join(", "),
          status: "Error",
          code: 400,
        });
      }
    } catch (err) {
      next(err);
    }
  };

export default validateUserCreate;
