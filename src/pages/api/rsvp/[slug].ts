import type { APIRoute } from 'astro';
import prisma from '../../../lib/prisma';

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { slug } = params;

    if (!slug) {
      return new Response(
        JSON.stringify({ error: 'Slug is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const weddingSite = await prisma.weddingSite.findUnique({
      where: { slug },
    });

    if (!weddingSite || !weddingSite.isPublished) {
      return new Response(
        JSON.stringify({ error: 'Wedding site not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const data = await request.json();
    const {
      fullName,
      email,
      attending,
      dietaryRestrictions,
      message,
    } = data;

    if (!fullName || attending === undefined) {
      return new Response(
        JSON.stringify({ error: 'Name and attendance are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        siteId: weddingSite.id,
        fullName,
        email: email || null,
        attending: Boolean(attending),
        dietaryRestrictions: dietaryRestrictions || null,
        message: message || null,
      },
    });

    return new Response(JSON.stringify({ rsvp }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to submit RSVP';
    console.error('RSVP submission error:', error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
