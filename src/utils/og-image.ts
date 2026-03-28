import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import satori from "satori";
import sharp from "sharp";

// Load font buffers once at module initialization to avoid redundant disk I/O
const fontBold = readFileSync(
  resolve(
    process.cwd(),
    "node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff"
  )
);
const fontMedium = readFileSync(
  resolve(
    process.cwd(),
    "node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff"
  )
);

export interface OGImageData {
  title: string;
  category: string;
  date: string;
}

export async function renderOGImage(data: OGImageData): Promise<Buffer> {
  const titleFontSize =
    data.title.length > 60 ? 56 : data.title.length > 40 ? 64 : 72;

  const element = {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        background: "#fffcf7",
        display: "flex",
        flexDirection: "column" as const,
        padding: "80px 96px",
        justifyContent: "space-between",
        fontFamily: "Manrope",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column" as const,
              gap: "24px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "13px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "#65655c",
                    fontWeight: 500,
                  },
                  children: `${data.category} · ${data.date}`,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: `${titleFontSize}px`,
                    fontWeight: 800,
                    color: "#1a1a17",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    maxWidth: "900px",
                    wordWrap: "break-word" as const,
                  },
                  children: data.title,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#506354",
                    letterSpacing: "-0.02em",
                  },
                  children: "esender.me",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    width: "48px",
                    height: "4px",
                    background: "#506354",
                    borderRadius: "2px",
                  },
                  children: "",
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(
    // biome-ignore lint/suspicious/noExplicitAny: satori expects ReactElement but we pass a plain object
    element as unknown as Parameters<typeof satori>[0],
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Manrope", data: fontMedium, weight: 500, style: "normal" },
        { name: "Manrope", data: fontBold, weight: 800, style: "normal" },
      ],
    }
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}
