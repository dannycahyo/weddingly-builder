import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

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
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Unauthorized' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      },
    );
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

    let weddingSite: any;

    if (existingSite) {
      // Update existing site
      const { events, ...siteData } = data;

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
        if (events.length > 0) {
          await prisma.event.createMany({
            data: events.map((event: any, index: number) => ({
              siteId: weddingSite.id,
              title: event.title,
              date: new Date(event.date),
              time: event.time,
              location: event.location,
              address: event.address,
              order: index,
            })),
          });
        }

        // Fetch updated site with events
        weddingSite = await prisma.weddingSite.findUnique({
          where: { id: weddingSite.id },
          include: {
            events: {
              orderBy: { order: 'asc' },
            },
          },
        });
      }
    } else {
      // Create new site
      const { events, ...siteData } = data;

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
      if (events && events.length > 0) {
        await prisma.event.createMany({
          data: events.map((event: any, index: number) => ({
            siteId: weddingSite.id,
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
          where: { id: weddingSite.id },
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
  } catch (error: any) {
    console.error('Wedding site save error:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to save wedding site',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
};
