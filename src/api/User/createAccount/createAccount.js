/** @format */

import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args, { prisma }) => {
      const { username, email, firstName, lastName, bio } = args;
      const user = await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio
      });
      return null;
    }
  }
};
