# Wallpaper assets

Place each wallpaper collection in its own folder with matching day and night images:

```text
public/wallpapers/<collection-id>/day.png
public/wallpapers/<collection-id>/night.png
```

For example, `public/wallpapers/emerald-mosque/day.png` and `public/wallpapers/emerald-mosque/night.png`.

Create each master at least 1440 × 3200 pixels (PNG or high-quality JPG), with the main subject and important detail in the middle. The API will crop it slightly with `objectFit: "cover"` and render the final image at the chosen device's exact size.

Do not add ayah text to the master image. After adding a collection, add its entry to `app/wallpaper-options.ts` so it appears in the homepage picker and can be used by the image API.
