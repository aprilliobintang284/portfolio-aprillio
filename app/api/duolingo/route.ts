import { NextResponse } from "next/server";

// No caching — always fresh data
export const dynamic = "force-dynamic";

const USERNAME = "AprillioBi";

export async function GET() {
  try {
    const res = await fetch(
      `https://www.duolingo.com/2017-06-30/users?username=${USERNAME}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
        // Next.js fetch — no cache
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error(`Duolingo responded with ${res.status}`);

    const data = await res.json();
    const user = data?.users?.[0];
    if (!user) throw new Error("User not found in response");

    type RawCourse = {
      title: string;
      xp: number;
      learningLanguage: string;
    };

    const courses: RawCourse[] = (user.courses ?? []);

    return NextResponse.json({
      ok: true,
      streak: user.streak ?? 0,
      totalXp: user.totalXp ?? 0,
      activeCourses: courses.length,
      username: user.username ?? USERNAME,
      courses: courses.map((c: RawCourse) => ({
        title: c.title,
        xp: c.xp,
        language: c.learningLanguage,
      })),
    });
  } catch (err) {
    console.error("[duolingo api]", err);
    // Minimal fallback — shows nothing is wrong, just returns zeros
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
