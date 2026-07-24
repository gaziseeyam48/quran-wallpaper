import { readFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

function getDailyAyahNumber() {
  const today = new Date();

  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  return (seed % 6236) + 1;
}
function wrapText(text: string, maxLength: number) {
  const words = text.split(" ");
  const lines: string[] = [];

  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).length <= maxLength) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}
export async function GET() {
  const ayahNumber = Math.floor(Math.random() * 6236) + 1;

  const response = await fetch(
    `https://api.alquran.cloud/v1/ayah/${ayahNumber}/editions/quran-uthmani,en.sahih`
  );

  const data = await response.json();

  const english = data.data[1];
  const arabic = data.data[0];

  const imagePath = path.join(process.cwd(), "public", "day.png");
  const imageBuffer = await readFile(imagePath);

  const metadata = await sharp(imageBuffer).metadata();

  const width = metadata.width || 937;
  const height = metadata.height || 1678;

  const centerX = Math.floor(width / 2);
  const englishLines = wrapText(english.text, 22);
const englishTextSvg = englishLines
  .map(
    (line, index) => `
      <text
        x="${centerX}"
        y="${Math.floor(height * 0.30) + index * 60}"
        text-anchor="middle"
        class="english shadow"
      >
        ${line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}
      </text>
    `
  )
  .join("");
  const svg = `
<svg width="${width}" height="${height}">
  <style>
    .arabic {
      fill: white;
      font-size: 56px;
      font-family: serif;
      font-weight: 600;
    }

    .english {
      fill: white;
      font-size:48px;
    font-weight: 600;
      font-family: Arial, sans-serif;
    }

    .reference {
      fill: rgba(255,255,255,0.85);
      font-size: 28px;
      font-family: Arial, sans-serif;
    }

    .shadow {
      filter: drop-shadow(0px 4px 10px rgba(0,0,0,0.8));
    }
  </style>

${englishTextSvg}

<text
  x="${centerX}"
  y="${Math.floor(height * 0.30) + englishLines.length * 60 + 40}"
  text-anchor="middle"
  class="reference shadow"
>
  — ${english.surah.englishName} ${english.numberInSurah} —
</text>
</svg>
`;

  const buffer = await sharp(imageBuffer)
    .composite([
      {
        input: Buffer.from(svg),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}