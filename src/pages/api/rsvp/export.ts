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
      return new Response('Wedding site not found', { status: 404 });
    }

    const rsvps = await prisma.rSVP.findMany({
      where: { siteId: weddingSite.id },
      orderBy: { createdAt: 'desc' },
    });

    // Create CSV
    const headers = [
      'Full Name',
      'Email',
      'Attending',
      'Dietary Restrictions',
      'Message',
      'Submitted At',
    ];
    const rows = rsvps.map((rsvp) => [
      rsvp.fullName,
      rsvp.email || '',
      rsvp.attending ? 'Yes' : 'No',
      rsvp.dietaryRestrictions || '',
      rsvp.message || '',
      rsvp.createdAt.toISOString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="rsvps-${weddingSite.slug}.csv"`,
      },
    });
  } catch (error: any) {
    return new Response(error.message || 'Unauthorized', {
      status: 401,
    });
  }
};
