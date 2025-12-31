import { validateSignupData } from "../Auth_Compo/authValidators";

export const validateSignup = (req, res, next) => {
  const validation = validateSignupData(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({ 
      message: "Datos de registro inválidos",
      errors: validation.errors 
    });
  }
  
  next();
};

export const validateLogin = (req, res, next) => {
  const { controlNumber, password } = req.body;
  
  if (!controlNumber || !password) {
    return res.status(400).json({ 
      message: "Número de control y contraseña son requeridos" 
    });
  }
  
  next();
};