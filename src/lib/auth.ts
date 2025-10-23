import type { APIContext } from 'astro';
import prisma from './prisma';

export interface Session {
  userId: string;
  email: string;
}

export async function hashPassword(
  password: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export async function createSession(
  userId: string,
  email: string,
): Promise<string> {
  const session: Session = { userId, email };
  return btoa(JSON.stringify(session));
}

export function getSession(context: APIContext): Session | null {
  const sessionCookie = context.cookies.get('session')?.value;
  if (!sessionCookie) return null;

  try {
    return JSON.parse(atob(sessionCookie)) as Session;
  } catch {
    return null;
  }
}

export async function requireAuth(
  context: APIContext,
): Promise<Session> {
  const session = getSession(context);
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function login(
  email: string,
  password: string,
): Promise<{ userId: string; email: string } | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;

  return { userId: user.id, email: user.email };
}

export async function register(email: string, password: string) {
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { userId: user.id, email: user.email };
}
