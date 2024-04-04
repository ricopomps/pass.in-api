import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "2c589bfb-c7f8-48dc-8393-b4bdd2485524",
      title: "Unite Summit",
      slug: "unite-summit",
      details: "Um evento para devs apaixonados por código!",
      maximumAttendees: 120,
    },
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
