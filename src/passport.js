/** @format */

import passport from "passport";
import JWTStrategy, { ExtractJwt, Strategy } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, doen) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return doen(null, user);
    } else {
      return doen(null, false);
    }
  } catch {
    return doen(null, error);
  }
};
export function authenticateJwt(req, res, next) {
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
}

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
