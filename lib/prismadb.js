import { PrismaClient } from "@prisma/client";

let prismadb;

if (typeof global.prismadb === "undefined") {
  prismadb = new PrismaClient();

  if (process.env.NODE_ENV !== "production") {
    global.prismadb = prismadb;
  }
} else {
  prismadb = global.prismadb;
}

export default prismadb;
