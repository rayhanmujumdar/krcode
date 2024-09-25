import jwt from "jsonwebtoken";
export const createVerificationToken = (
  email: string,
  type: "subscriberVerification" | "userVerification",
) => {
  return jwt.sign({ email, type }, process.env.JWT_SECRET!, {
    expiresIn: "30m",
  });
};
