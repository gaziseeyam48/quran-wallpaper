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
      <section className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-[#6d785c] uppercase">
          Quran Wallpaper
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Make a daily ayah wallpaper that feels like yours.
        </h1>

        <div className="mt-10 space-y-8 rounded-3xl bg-white p-6 shadow-[0_18px_60px_rgba(46,55,39,0.10)] sm:p-8">
          <fieldset>
            <legend className="text-base font-semibold">1. Choose your iPhone</legend>
            <select
              aria-label="Choose your iPhone"
              className="mt-4 w-full rounded-2xl border border-[#d8ddd2] bg-white px-4 py-4 text-base font-medium outline-none transition focus:border-[#4d6345] focus:ring-2 focus:ring-[#d7e1d0]"
              onChange={(event) => setDeviceId(event.target.value)}
              value={deviceId}
            >
              {devices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name} - {device.width} x {device.height}
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
                  <span aria-hidden="true" className="flex aspect-[9/11]">
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
          </div>

          <section className="border-t border-[#e7e5df] pt-8">
            <p className="text-xl font-semibold">Set up your iPhone Shortcut</p>
            <p className="mt-2 text-sm leading-6 text-[#687064]">
              Make two personal automations: one for the Day link at 6:00 AM and
              one for the Night link at 6:00 PM.
            </p>

            <ol className="mt-6 space-y-6 text-sm leading-6 text-[#485144]">
              <li className="rounded-2xl bg-[#f8f8f5] p-5">
                <strong className="block text-base text-[#1c241d]">1. Create the Day automation</strong>
                Open <strong>Shortcuts</strong>, tap <strong>Automation</strong>, then tap
                the <strong>+</strong> button and choose <strong>Create Personal Automation</strong>.
                Choose <strong>Time of Day</strong>, set it to <strong>6:00 AM</strong>, select
                <strong> Daily</strong>, then tap <strong>Next</strong>.
              </li>
              <li className="rounded-2xl bg-[#f8f8f5] p-5">
                <strong className="block text-base text-[#1c241d]">2. Download the Day wallpaper</strong>
                Tap <strong>Add Action</strong>, search for <strong>Get Contents of URL</strong>,
                then paste the Day link copied above into its URL field. Keep the method as GET.
              </li>
              <li className="rounded-2xl bg-[#f8f8f5] p-5">
                <strong className="block text-base text-[#1c241d]">3. Set the wallpaper</strong>
                Add the <strong>Set Wallpaper Photo</strong> action. Tap its image input and choose
                the output from <strong>Get Contents of URL</strong>. Select the Lock Screen,
                Home Screen, or both, according to your preference.
              </li>
              <li className="rounded-2xl bg-[#f8f8f5] p-5">
                <strong className="block text-base text-[#1c241d]">4. Let it run automatically</strong>
                Tap <strong>Next</strong>, turn off <strong>Ask Before Running</strong> (or choose
                <strong> Run Immediately</strong> on newer iOS versions), then tap <strong>Done</strong>.
                Use the play button once to test it immediately.
              </li>
              <li className="rounded-2xl bg-[#f8f8f5] p-5">
                <strong className="block text-base text-[#1c241d]">5. Repeat for Night</strong>
                Create the same personal automation again, set the time to <strong>6:00 PM</strong>,
                and paste the Night link instead. The two automations will then switch your chosen
                collection each morning and evening.
              </li>
            </ol>

            <p className="mt-6 text-sm leading-6 text-[#687064]">
              Apple&apos;s automation labels can vary slightly by iOS version. Apple confirms that
              Time of Day automations can run daily and can be configured to run without asking. {" "}
              <a
                className="font-semibold text-[#40563a] underline underline-offset-2"
                href="https://support.apple.com/en-asia/guide/shortcuts/-apdfbdbd7123/ios"
                rel="noreferrer"
                target="_blank"
              >
                Read Apple&apos;s automation guide
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
