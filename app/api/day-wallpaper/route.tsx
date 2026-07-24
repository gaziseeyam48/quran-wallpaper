import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "red",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 80,
        }}
      >
        TEST
      </div>
    ),
    {
      width: 937,
      height: 1678,
    }
  );
}