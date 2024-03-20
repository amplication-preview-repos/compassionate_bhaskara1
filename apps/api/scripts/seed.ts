import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { customSeed } from "./customSeed";

if (require.main === module) {
  dotenv.config();

  seed().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed() {
  console.info("Seeding database...");

  const client = new PrismaClient();
  const data = {
    password: "27fe1c7828064ff8d9a3",
    roles: ["user"],
    username: "admin",
  };
  await client.user.create({
    data,
  });
  void client.$disconnect();

  console.info("Seeding database with custom seed...");
  customSeed();

  console.info("Seeded database successfully");
}
