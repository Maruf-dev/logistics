# Partner logos

Drop the partner logo PNGs in this folder using the exact filenames below.
The "Our Partners" section ([components/Partners.tsx](../../components/Partners.tsx))
reads them from `/partners/<file>` and the list is defined in
[lib/i18n.ts](../../lib/i18n.ts) under `t.partners.items`.

| Partner               | Filename       |
| --------------------- | -------------- |
| SPOT                  | `spot.jpg`     |
| U.S. Xpress           | `usx.png`      |
| J.B. Hunt             | `jb-hunt.png`  |
| Echo Global Logistics | `echo.jpg`     |
| TQL                   | `tql.jpg`      |
| AC                    | `ac.jpg`       |

Tips:

- **Transparent backgrounds** look best — solid-color logos (e.g. yellow/navy)
  will show as colored rectangles inside the tile.
- Any reasonable resolution works; logos are capped at 56px tall and scaled down.
- Until a file is added, its tile gracefully shows the partner name as text
  instead of a broken image.
- To add/remove a partner, edit `t.partners.items` in `lib/i18n.ts`.
