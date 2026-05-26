import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MT_USERNAME = "Aprillio";
const APE_KEY = process.env.MONKEYTYPE_APE_KEY ?? "";

// Fetch from MonkeyType API with ApeKey auth
async function mtFetch(path: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (APE_KEY) {
    headers["Authorization"] = `ApeKey ${APE_KEY}`;
  }
  const res = await fetch(`https://api.monkeytype.com${path}`, {
    headers,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`MT ${path} → ${res.status}`);
  return res.json();
}

export async function GET() {
  try {
    // Public profile — no auth needed
    const profileRes = await fetch(
      `https://api.monkeytype.com/users/${MT_USERNAME}/profile`,
      { cache: "no-store" }
    );
    const profileData = profileRes.ok ? await profileRes.json() : null;
    const profile = profileData?.data;

    // Try authenticated endpoints if ApeKey is present
    let recentResults: MTResult[] = [];
    if (APE_KEY) {
      try {
        const resultsData = await mtFetch("/users/results?limit=10");
        recentResults = resultsData?.data ?? [];
      } catch {
        recentResults = [];
      }
    }

    // Extract stats from public profile
    const ts = profile?.typingStats;
    const pb15 = profile?.personalBests?.time?.["15"]?.[0];
    const pb60 = profile?.personalBests?.time?.["60"]?.[0];
    const pbWord = profile?.personalBests?.words?.["25"]?.[0];

    const bestPb = pb15 ?? pb60 ?? pbWord ?? null;

    const completedTests = ts?.completedTests ?? 0;
    const timeTypingSeconds = ts?.timeTyping ?? 0;
    const hours = Math.floor(timeTypingSeconds / 3600);
    const minutes = Math.floor((timeTypingSeconds % 3600) / 60);
    const timeTyping = timeTypingSeconds > 0
      ? hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
      : "9h 52m";

    // Build chart data from recentResults (last 5 for chart)
    const chartData = recentResults.slice(0, 10).reverse().map((r, i) => ({
      label: `T${i + 1}`,
      wpm: Math.round(r.wpm ?? 0),
      raw: Math.round(r.rawWpm ?? r.raw ?? 0),
      acc: Math.round(r.acc ?? 0),
      consistency: Math.round(r.consistency ?? 0),
    }));

    // Average WPM from last results
    const avgWpm = recentResults.length > 0
      ? Math.round(recentResults.reduce((s, r) => s + (r.wpm ?? 0), 0) / recentResults.length)
      : (bestPb ? Math.floor(bestPb.wpm * 0.85) : 94);

    return NextResponse.json({
      ok: true,
      bestWpm: bestPb ? Math.floor(bestPb.wpm) : 121,
      bestRaw: bestPb ? Math.floor(bestPb.raw ?? bestPb.wpm + 4) : 125,
      bestAcc: bestPb ? Math.floor(bestPb.acc) : 97,
      bestConsistency: bestPb ? Math.floor(bestPb.consistency ?? 79) : 79,
      avgWpm,
      completedTests,
      completionPct: ts?.startedTests
        ? Math.round((completedTests / ts.startedTests) * 100)
        : 21,
      timeTyping,
      startedTests: ts?.startedTests ?? 3300,
      chartData: chartData.length > 0 ? chartData : null,
    });
  } catch (err) {
    console.error("[monkeytype api]", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

type MTResult = {
  wpm?: number;
  rawWpm?: number;
  raw?: number;
  acc?: number;
  consistency?: number;
};
