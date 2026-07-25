import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const mode = new URL(request.url).searchParams.get("mode");
  const hour = getBangladeshHour();

  // A Shortcut can explicitly choose the image using ?mode=day or ?mode=night.
  // Without that parameter, follow Bangladesh local time (06:00–17:59 is day).
  const isDay = mode === "day" || (mode !== "night" && hour >= 6 && hour < 18);

  const wallpaperUrl = isDay
    ? "https://quran-wallpaper.vercel.app/day.png"
    : "https://quran-wallpaper.vercel.app/night.png";

  const ayahNumber = getDailyAyahNumber();

  const response = await fetch(
    `https://api.alquran.cloud/v1/ayah/${ayahNumber}/editions/quran-uthmani,en.sahih`
  );

  const data = await response.json();

  const english = data.data[1];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        <img
          src={wallpaperUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 80,
            paddingRight: 80,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: 34,
              textAlign: "center",
              lineHeight: 1.4,
              textShadow: "0 4px 12px rgba(0,0,0,0.7)",
              maxWidth: 700,
            }}
          >
            {english.text}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              color: "rgba(255,255,255,0.8)",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            — {english.surah.englishName} {english.numberInSurah} —
          </div>
        </div>
      </div>
    ),
    {
      width: 937,
      height: 1678,
      headers: {
        // The image changes during the day, so never let the phone or a CDN reuse
        // an older response for this URL.
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

function getBangladeshHour() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  return Number(parts.find((part) => part.type === "hour")?.value);
}

function getDailyAyahNumber() {
  const today = new Date();

  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  return (seed % 6236) + 1;
}
