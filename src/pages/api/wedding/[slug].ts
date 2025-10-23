import type { APIRoute } from 'astro';
import prisma from '../../../lib/prisma';

export const GET: APIRoute = async ({ params }) => {
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
      include: {
        events: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!weddingSite) {
      return new Response(
        JSON.stringify({ error: 'Wedding site not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Check if site is published
    if (!weddingSite.isPublished) {
      return new Response(
        JSON.stringify({ error: 'Wedding site not published' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Return site data (excluding sensitive fields)
    const { password, userId, ...publicData } = weddingSite;
    const hasPassword = !!password;

    return new Response(
      JSON.stringify({ weddingSite: publicData, hasPassword }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to fetch wedding site';
    console.error('Wedding site fetch error:', error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { slug } = params;
    const { password } = await request.json();

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
      include: {
        events: {
          orderBy: { order: 'asc' },
        },
      },
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

    // Check password if required
    if (weddingSite.password && weddingSite.password !== password) {
      return new Response(
        JSON.stringify({ error: 'Incorrect password' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Return site data (excluding sensitive fields)
    const { password: _, userId, ...publicData } = weddingSite;

    return new Response(JSON.stringify({ weddingSite: publicData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Verification failed';
    console.error('Password verification error:', error);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
