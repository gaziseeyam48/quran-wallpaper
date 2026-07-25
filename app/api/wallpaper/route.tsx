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
  const response = await fetch(
    `https://api.alquran.cloud/v1/ayah/${getDailyAyahNumber()}/editions/quran-uthmani,en.sahih`
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
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            backgroundColor: "rgba(7, 16, 13, 0.16)",
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
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: 760 * scale,
              backgroundColor: "rgba(9, 22, 17, 0.52)",
              border: `${1.5 * scale}px solid rgba(255, 255, 255, 0.32)`,
              borderRadius: 36 * scale,
              paddingTop: 42 * scale,
              paddingRight: 38 * scale,
              paddingBottom: 34 * scale,
              paddingLeft: 38 * scale,
              boxShadow: "0 16px 42px rgba(0, 0, 0, 0.28)",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "rgba(255,255,255,0.72)",
                fontSize: 13 * scale,
                fontWeight: 700,
                letterSpacing: 3 * scale,
                textAlign: "center",
              }}
            >
              DAILY AYAH
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 20 * scale,
                color: "white",
                fontSize: 41 * scale,
                fontWeight: 700,
                textAlign: "center",
                lineHeight: 1.3,
                textShadow: "0 3px 10px rgba(0,0,0,0.36)",
              }}
            >
              {english.text}
            </div>

            <div
              style={{
                display: "flex",
                width: 96 * scale,
                height: 1 * scale,
                marginTop: 26 * scale,
                backgroundColor: "rgba(255,255,255,0.45)",
              }}
            />

            <div
              style={{
                display: "flex",
                marginTop: 19 * scale,
                color: "rgba(255,255,255,0.9)",
                fontSize: 21 * scale,
                fontWeight: 600,
                letterSpacing: 0.4 * scale,
                textAlign: "center",
              }}
            >
              {english.surah.englishName} · {english.numberInSurah}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: device.width,
      height: device.height,
      headers: {
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
