export type Device = {
  id: string;
  name: string;
  width: number;
  height: number;
};

export type WallpaperCollection = {
  id: string;
  name: string;
  dayPath: string;
  nightPath: string;
};

// Add device output sizes here as the collection grows. Background masters are
// shared by every device and cropped with `objectFit: "cover"` at render time.
export const devices: Device[] = [
  {
    id: "android-1440x3200",
    name: "Android (1440 × 3200)",
    width: 1440,
    height: 3200,
  },
  { id: "iphone-11", name: "iPhone 11", width: 828, height: 1792 },
  { id: "iphone-11-pro", name: "iPhone 11 Pro", width: 1125, height: 2436 },
  { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max", width: 1242, height: 2688 },
  { id: "iphone-12-12-pro", name: "iPhone 12 / 12 Pro", width: 1170, height: 2532 },
  { id: "iphone-12-mini", name: "iPhone 12 mini", width: 1080, height: 2340 },
  { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max", width: 1284, height: 2778 },
  { id: "iphone-13-13-pro", name: "iPhone 13 / 13 Pro", width: 1170, height: 2532 },
  { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max", width: 1284, height: 2778 },
  { id: "iphone-13-mini", name: "iPhone 13 mini", width: 1080, height: 2340 },
  { id: "iphone-14", name: "iPhone 14", width: 1170, height: 2532 },
  { id: "iphone-14-pro", name: "iPhone 14 Pro", width: 1179, height: 2556 },
  { id: "iphone-14-plus", name: "iPhone 14 Plus", width: 1284, height: 2778 },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", width: 1290, height: 2796 },
  { id: "iphone-15-15-pro", name: "iPhone 15 / 15 Pro", width: 1179, height: 2556 },
  { id: "iphone-15-plus-15-pro-max", name: "iPhone 15 Plus / 15 Pro Max", width: 1290, height: 2796 },
  { id: "iphone-16-16e", name: "iPhone 16 / 16e", width: 1179, height: 2556 },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", width: 1206, height: 2622 },
  { id: "iphone-16-plus", name: "iPhone 16 Plus", width: 1290, height: 2796 },
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", width: 1320, height: 2868 },
  { id: "iphone-17-17-pro", name: "iPhone 17 / 17 Pro", width: 1206, height: 2622 },
  { id: "iphone-17-pro-max", name: "iPhone 17 Pro Max", width: 1320, height: 2868 },
  { id: "iphone-17-air-slim", name: "iPhone 17 Air / Slim", width: 1260, height: 2736 },
];

export const wallpaperCollections: WallpaperCollection[] = [
  {
    id: "islamic-arc",
    name: "Islamic Arch",
    dayPath: "/wallpapers/islamic-arc/day.png",
    nightPath: "/wallpapers/islamic-arc/night.png",
  },
  {
    id: "mountain",
    name: "Mountain Serenity",
    dayPath: "/wallpapers/mountain/day.png",
    nightPath: "/wallpapers/mountain/night.png",
  },
  {
    id: "sand",
    name: "Desert Sand",
    dayPath: "/wallpapers/sand/day.png",
    nightPath: "/wallpapers/sand/night.png",
  },
];
