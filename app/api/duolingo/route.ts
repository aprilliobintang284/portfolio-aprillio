import { NextResponse } from "next/server";

export const revalidate = 300;

const USERNAME = "AprillioBi";

const FALLBACK = {
  ok: true,
  streak: 17,
  totalXp: 9458,
  activeCourses: 3,
  username: USERNAME,
  joinedAt: null as string | null,
  longestStreak: 17,
  courses: [
    { title: "English", xp: 5277, language: "en" },
    { title: "Korean",  xp: 4037, language: "ko" },
    { title: "Chinese", xp: 144,  language: "zh-cn" },
  ],
  _cached: true,
};

async function fetchDuolingo(attempt = 1): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(
      `https://www.duolingo.com/2017-06-30/users?username=${USERNAME}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://www.duolingo.com/",
        },
        signal: controller.signal,
        cache: "no-store",
      }
    );
    return res;
  } catch (err) {
    if (attempt < 3) {
      await new Promise(r => setTimeout(r, 800));
      return fetchDuolingo(attempt + 1);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/** Resolve joinedAt from various Duolingo field names/formats */
function resolveJoinedAt(user: Record<string, unknown>): string | null {
  const raw = user.joinedAt ?? user.createdAt ?? user.memberSince ?? null;
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "number") {
    // Duolingo sometimes sends Unix seconds, sometimes ms
    const ms = raw < 1e10 ? raw * 1000 : raw;
    return new Date(ms).toISOString();
  }
  return String(raw);
}

export async function GET() {
  try {
    const res = await fetchDuolingo();
    if (!res.ok) throw new Error(`Duolingo responded with ${res.status}`);

    const data = await res.json();
    const user = data?.users?.[0] as Record<string, unknown> | undefined;
    if (!user) throw new Error("User not found in response");

    type RawCourse = { title: string; xp: number; learningLanguage: string };
    const courses: RawCourse[] = (user.courses as RawCourse[]) ?? [];

    return NextResponse.json({
      ok: true,
      streak: (user.streak as number) ?? 0,
      totalXp: (user.totalXp as number) ?? 0,
      activeCourses: courses.length,
      username: (user.username as string) ?? USERNAME,
      joinedAt: resolveJoinedAt(user),
      longestStreak: (user.longestStreak as number) ?? (user.streak as number) ?? 0,
      courses: courses.map((c) => ({
        title: c.title,
        xp: c.xp,
        language: c.learningLanguage,
      })),
    });
  } catch (err) {
    console.error("[duolingo api] all retries failed, using fallback:", err);
    return NextResponse.json(FALLBACK);
  }
}
