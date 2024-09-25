"use server";
import { db } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";

export const confirmVerify = async (token: string) => {
  try {
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET!,
    )) as JwtPayload;

    if (decoded.type === "subscriberVerification") {
      const newsSubscriber = await db.newsletterSubscription.findUnique({
        where: {
          email: decoded?.email,
        },
        select: {
          verified: true,
        },
      });

      if (newsSubscriber?.verified) {
        throw new Error("Email already Verified");
      }
      await db.newsletterSubscription.update({
        where: { email: decoded?.email },
        data: {
          verified: true,
        },
      });
    } else if (decoded.type === "userVerification") {
      const user = await db.user.findUnique({
        where: {
          email: decoded?.email,
        },
        select: {
          verified: true,
        },
      });

      if (user?.verified) {
        throw new Error("Email already Verified");
      }
      await db.user.update({
        where: { email: decoded?.email },
        data: {
          verified: true,
        },
      });
    }
    return { success: true, message: "Verification successful" };
  } catch (err: any) {
    console.log(err);
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("Invalid token");
    }
  }
};
