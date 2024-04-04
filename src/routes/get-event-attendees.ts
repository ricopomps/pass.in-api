import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getEventAttendees(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Get event attendees",
        tags: ["events"],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                id: z.number().int(),
                name: z.string(),
                email: z.string().email(),
                createdAt: z.date(),
                checkedInAt: z.date().nullable(),
              })
            ),
          }),
        },
        querystring: z.object({
          query: z.string().nullish(),
          pageIndex: z.string().nullable().default("0").transform(Number),
        }),
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { pageIndex, query } = request.query;

      const pageSize = 10;

      const attendees = await prisma.attendee.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          checkIn: {
            select: {
              createdAt: true,
            },
          },
        },
        where: {
          eventId,
          ...(query && {
            name: {
              contains: query,
            },
          }),
        },
        take: pageSize,
        skip: pageSize * pageIndex,
        orderBy: {
          createdAt: "desc",
        },
      });

      return reply.send({
        attendees: attendees.map(({ id, name, email, createdAt, checkIn }) => ({
          id,
          name,
          email,
          createdAt,
          checkedInAt: checkIn?.createdAt ?? null,
        })),
      });
    }
  );
}
