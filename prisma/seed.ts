import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const farhan = await db.user.create({
    data: {
      username: "Farhan",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u"
    }
  });
  await Promise.all(
    getJokes().map(report => {
      const jokeData = {reporterId : farhan.id,...report}
      return db.reports.create({data: jokeData})
    })
  );
}

seed();

function getJokes() {
  return [
    {
      jiraId: "OPSAPS-62406",
      jiraContext: `Migrating to typescript`
    },
    {
      jiraId: "OPSAPS-62407",
      jiraContext: `Deploying Remix application`
    },
    {
      jiraId: "OPSAPS-62406",
      jiraContext: `Remix tutorail`
    },
  ];
}