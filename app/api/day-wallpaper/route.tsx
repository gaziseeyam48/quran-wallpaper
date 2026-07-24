import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
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
    width: "100%",
    top: 450,
    display: "flex",
    justifyContent: "center",
    color: "white",
    fontSize: 60,
  }}
>
  TEST
</div>
</div>
    ),
    {
      width: 937,
      height: 1678,
    }
  );
}