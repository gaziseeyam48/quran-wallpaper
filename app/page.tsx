"use client";

import { useState } from "react";
import { devices, wallpaperCollections } from "./wallpaper-options";

type Mode = "day" | "night";

export default function Home() {
  const [deviceId, setDeviceId] = useState(devices[0].id);
  const [collectionId, setCollectionId] = useState(wallpaperCollections[0].id);
  const [copiedMode, setCopiedMode] = useState<Mode | null>(null);
  const selectedCollection =
    wallpaperCollections.find((collection) => collection.id === collectionId) ??
    wallpaperCollections[0];

  function getApiLink(mode: Mode) {
    const apiPath = `/api/wallpaper?device=${encodeURIComponent(
      deviceId
    )}&collection=${encodeURIComponent(collectionId)}&mode=${mode}`;
    return typeof window === "undefined" ? apiPath : `${window.location.origin}${apiPath}`;
  }

  async function copyLink(mode: Mode) {
    await navigator.clipboard.writeText(getApiLink(mode));
    setCopiedMode(mode);
    window.setTimeout(() => setCopiedMode(null), 1800);
  }

  return (
    <main className="min-h-screen bg-[#f8f5ee] px-5 py-10 text-[#1c241d] sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section>
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[#6d785c] uppercase">
            Quran Wallpaper
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Make a daily ayah wallpaper that feels like yours.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#566052]">
            Choose a phone and wallpaper collection. We will create a Day and
            Night link for your iPhone Shortcut.
          </p>

          <div className="mt-10 space-y-8 rounded-3xl bg-white p-6 shadow-[0_18px_60px_rgba(46,55,39,0.10)] sm:p-8">
            <fieldset>
              <legend className="text-base font-semibold">1. Choose your phone</legend>
              <select
                aria-label="Choose your phone"
                className="mt-4 w-full rounded-2xl border border-[#d8ddd2] bg-white px-4 py-4 text-base font-medium outline-none transition focus:border-[#4d6345] focus:ring-2 focus:ring-[#d7e1d0]"
                onChange={(event) => setDeviceId(event.target.value)}
                value={deviceId}
              >
                {devices.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.name} — {device.width} × {device.height}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset>
              <legend className="text-base font-semibold">2. Choose a wallpaper collection</legend>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {wallpaperCollections.map((collection) => (
                  <button
                    className={`overflow-hidden rounded-2xl border text-left transition ${
                      collection.id === selectedCollection.id
                        ? "border-[#4d6345] ring-2 ring-[#d7e1d0]"
                        : "border-[#e7e5df] hover:border-[#aeb9a5]"
                    }`}
                    key={collection.id}
                    onClick={() => setCollectionId(collection.id)}
                    type="button"
                  >
                    <span className="flex aspect-[9/11]" aria-hidden="true">
                      <span
                        className="w-1/2 bg-cover bg-center"
                        style={{ backgroundImage: `url(${collection.dayPath})` }}
                      />
                      <span
                        className="w-1/2 bg-cover bg-center"
                        style={{ backgroundImage: `url(${collection.nightPath})` }}
                      />
                    </span>
                    <span className="block p-3 text-sm font-semibold">{collection.name}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <p className="text-base font-semibold">3. Copy both Shortcut links</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {(["day", "night"] as const).map((mode) => (
                  <div className="rounded-2xl bg-[#f3f4ef] p-4" key={mode}>
                    <p className="text-sm font-semibold capitalize">{mode} link</p>
                    <code className="mt-2 block overflow-x-auto text-xs text-[#485144]">
                      {getApiLink(mode)}
                    </code>
                    <button
                      className="mt-4 w-full rounded-xl bg-[#40563a] px-4 py-2.5 font-semibold text-white transition hover:bg-[#30452b]"
                      onClick={() => copyLink(mode)}
                      type="button"
                    >
                      {copiedMode === mode ? "Copied" : `Copy ${mode} link`}
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-[#687064]">
                Use the Day link in the 6 AM Shortcut automation and the Night
                link in the 6 PM automation. Each link returns a fresh daily ayah.
              </p>
            </div>
          </div>
        </section>

        <aside className="mx-auto w-full max-w-[330px] rounded-[2.8rem] border-[9px] border-[#182018] bg-[#182018] p-2 shadow-2xl">
          <div
            className="aspect-[937/1678] overflow-hidden rounded-[2.2rem] bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedCollection.dayPath})` }}
          >
            <div className="flex h-full items-center justify-center bg-black/10 px-7 text-center text-white">
              <div className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.65)]">
                <p className="text-xl leading-relaxed">“And He is with you wherever you are.”</p>
                <p className="mt-3 text-xs tracking-[0.18em] uppercase opacity-85">Al-Hadid 57:4</p>
              </div>
            </div>
          </div>
          <p className="py-2 text-center text-xs font-medium text-white/70">Day preview</p>
        </aside>
      </div>
    </main>
  );
}
