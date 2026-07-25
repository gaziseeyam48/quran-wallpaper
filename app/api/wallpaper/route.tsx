import { ImageResponse } from "@vercel/og";
import { devices, wallpaperCollections } from "../../wallpaper-options";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode");
  const requestedDevice = searchParams.get("device");
  const requestedCollection = searchParams.get("collection");
  const hour = getBangladeshHour();
  const device = devices.find((item) => item.id === requestedDevice) ?? devices[0];

  // A Shortcut can explicitly choose the image using ?mode=day or ?mode=night.
  // Without that parameter, follow Bangladesh local time (06:00–17:59 is day).
  const isDay = mode === "day" || (mode !== "night" && hour >= 6 && hour < 18);

  const collection =
    wallpaperCollections.find((item) => item.id === requestedCollection) ??
    wallpaperCollections[0];

  if (!collection) {
    return new Response("No wallpaper collections are configured.", { status: 500 });
  }

  const wallpaperPath = isDay ? collection.dayPath : collection.nightPath;
  const wallpaperUrl = new URL(wallpaperPath, request.url).toString();
  const scale = device.width / 937;

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
            paddingLeft: 80 * scale,
            paddingRight: 80 * scale,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: 34 * scale,
              textAlign: "center",
              lineHeight: 1.4,
              textShadow: "0 4px 12px rgba(0,0,0,0.7)",
              maxWidth: 700 * scale,
            }}
          >
            {english.text}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30 * scale,
              color: "rgba(255,255,255,0.8)",
              fontSize: 24 * scale,
              textAlign: "center",
            }}
          >
            — {english.surah.englishName} {english.numberInSurah} —
          </div>
        </div>
      </div>
    ),
    {
      width: device.width,
      height: device.height,
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
