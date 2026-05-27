import { NextResponse } from "next/server";

// Cache for 5 minutes — reduces hammering Duolingo's API on every refresh
export const revalidate = 300;

const USERNAME = "AprillioBi";

// Static fallback shown when Duolingo API is down/rate-limited
const FALLBACK = {
  ok: true,
  streak: 9,
  totalXp: 7989,
  activeCourses: 3,
  username: USERNAME,
  courses: [
    { title: "English",  xp: 4818, language: "en" },
    { title: "Korean",   xp: 3027, language: "ko" },
    { title: "Chinese",  xp: 144,  language: "zh-cn" },
  ],
  _cached: true,
};

async function fetchDuolingo(attempt = 1): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000); // 6s timeout
  try {
    const res = await fetch(
      `https://www.duolingo.com/2017-06-30/users?username=${USERNAME}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
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
      // Wait 800ms then retry
      await new Promise(r => setTimeout(r, 800));
      return fetchDuolingo(attempt + 1);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export async function GET() {
  try {
    const res = await fetchDuolingo();

    if (!res.ok) throw new Error(`Duolingo responded with ${res.status}`);

    const data = await res.json();
    const user = data?.users?.[0];
    if (!user) throw new Error("User not found in response");

    type RawCourse = { title: string; xp: number; learningLanguage: string };
    const courses: RawCourse[] = user.courses ?? [];

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
    console.error("[duolingo api] all retries failed, using fallback:", err);
    // Return static fallback so the UI always renders
    return NextResponse.json(FALLBACK);
  }
}

