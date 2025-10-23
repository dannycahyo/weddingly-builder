import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

export const GET: APIRoute = async (context) => {
  try {
    const session = await requireAuth(context);

    const weddingSite = await prisma.weddingSite.findUnique({
      where: { userId: session.userId },
    });

    if (!weddingSite) {
      // Return empty data instead of 404 for new users
      return new Response(
        JSON.stringify({
          rsvps: [],
          analytics: {
            totalAttending: 0,
            totalDeclined: 0,
            total: 0,
          },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const rsvps = await prisma.rSVP.findMany({
      where: { siteId: weddingSite.id },
      orderBy: { createdAt: 'desc' },
    });

    const totalAttending = rsvps.filter((r) => r.attending).length;
    const totalDeclined = rsvps.filter((r) => !r.attending).length;

    return new Response(
      JSON.stringify({
        rsvps,
        analytics: {
          totalAttending,
          totalDeclined,
          total: rsvps.length,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unauthorized';
    return new Response(JSON.stringify({ error: message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
