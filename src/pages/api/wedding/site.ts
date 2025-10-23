import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

interface EventData {
  title: string;
  date: string | Date;
  time: string;
  location: string;
  address: string;
}

export const GET: APIRoute = async (context) => {
  try {
    const session = await requireAuth(context);

    const weddingSite = await prisma.weddingSite.findUnique({
      where: { userId: session.userId },
      include: {
        events: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return new Response(JSON.stringify({ weddingSite }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unauthorized';
    return new Response(JSON.stringify({ error: message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async (context) => {
  try {
    const session = await requireAuth(context);
    const data = await context.request.json();

    // Check if site exists
    const existingSite = await prisma.weddingSite.findUnique({
      where: { userId: session.userId },
    });

    const { events, ...siteData } = data;

    let weddingSite: Awaited<
      ReturnType<typeof prisma.weddingSite.create>
    > | null = null;

    if (existingSite) {
      // Update existing site
      weddingSite = await prisma.weddingSite.update({
        where: { userId: session.userId },
        data: {
          ...siteData,
          weddingDate: siteData.weddingDate
            ? new Date(siteData.weddingDate)
            : null,
        },
        include: {
          events: {
            orderBy: { order: 'asc' },
          },
        },
      });

      // Handle events if provided
      if (events) {
        // Delete existing events
        await prisma.event.deleteMany({
          where: { siteId: weddingSite.id },
        });

        // Create new events
        if (events.length > 0 && weddingSite) {
          const siteId = weddingSite.id;
          await prisma.event.createMany({
            data: events.map((event: EventData, index: number) => ({
              siteId,
              title: event.title,
              date: new Date(event.date),
              time: event.time,
              location: event.location,
              address: event.address,
              order: index,
            })),
          });

          // Fetch updated site with events
          weddingSite = await prisma.weddingSite.findUnique({
            where: { id: siteId },
            include: {
              events: {
                orderBy: { order: 'asc' },
              },
            },
          });
        }
      }
    } else {
      // Create new site
      weddingSite = await prisma.weddingSite.create({
        data: {
          userId: session.userId,
          slug: siteData.slug || `wedding-${Date.now()}`,
          ...siteData,
          weddingDate: siteData.weddingDate
            ? new Date(siteData.weddingDate)
            : null,
        },
        include: {
          events: {
            orderBy: { order: 'asc' },
          },
        },
      });

      // Create events if provided
      if (events && events.length > 0 && weddingSite) {
        const siteId = weddingSite.id;
        await prisma.event.createMany({
          data: events.map((event: EventData, index: number) => ({
            siteId,
            title: event.title,
            date: new Date(event.date),
            time: event.time,
            location: event.location,
            address: event.address,
            order: index,
          })),
        });

        // Fetch updated site with events
        weddingSite = await prisma.weddingSite.findUnique({
          where: { id: siteId },
          include: {
            events: {
              orderBy: { order: 'asc' },
            },
          },
        });
      }
    }

    return new Response(JSON.stringify({ weddingSite }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to save wedding site';
    console.error('Wedding site save error:', error);
    return new Response(
      JSON.stringify({
        error: message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
};
