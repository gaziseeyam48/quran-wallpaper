import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  const response = await fetch(
  "https://api.alquran.cloud/v1/ayah/931/editions/quran-uthmani,en.sahih"
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
    src="https://quran-wallpaper.vercel.app/day.png"
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
    top: 220,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 80,
    paddingRight: 80,
  }}
>
 <div
  style={{
    display: "flex",
    color: "white",
    fontSize: 42,
    textAlign: "center",
    lineHeight: 1.4,
    textShadow: "0 4px 12px rgba(0,0,0,0.7)",
    maxWidth: 760,
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
    }
  );
}