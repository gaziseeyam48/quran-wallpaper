import { NextResponse } from "next/server";

function getDailyAyahNumber() {
  const today = new Date();

  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  return (seed % 6236) + 1;
}

export async function GET() {
  const ayahNumber = getDailyAyahNumber();

  const response = await fetch(
    `https://api.alquran.cloud/v1/ayah/${ayahNumber}/editions/quran-uthmani,en.sahih`
  );

  const data = await response.json();

  const arabic = data.data[0];
  const english = data.data[1];

  return NextResponse.json({
    arabic: arabic.text,
    english: english.text,
    surah: english.surah.englishName,
    ayah: english.numberInSurah,
    surahNumber: english.surah.number,
  });
}