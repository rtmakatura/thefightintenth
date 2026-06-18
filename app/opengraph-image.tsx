import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';
export const alt = "The Fightin' Tenth — A Memoir by Captain Michael Makatura";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`;
  // Firefox 3 UA gets format('truetype') from Google Fonts; modern UAs get WOFF2 / IE6 gets EOT — neither parseable by Satori.
  const css = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.3) Gecko/2008092417 Firefox/3.0.3',
    },
  }).then((r) => r.text());
  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!match) throw new Error(`Could not extract font URL for ${family}`);
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function OpengraphImage() {
  const title = "The Fightin' Tenth";
  const subtitle = 'Cold War to Desert Storm';
  const eyebrow = 'A MEMOIR';
  const byline = 'BY CAPTAIN MICHAEL MAKATURA';
  const domain = 'thefightintenth.com';

  const playfairText = title;
  const sansText = `${subtitle}${eyebrow}${byline}${domain}`;

  const [playfairBold, sourceSans] = await Promise.all([
    loadGoogleFont('Playfair Display', 700, playfairText),
    loadGoogleFont('Source Sans 3', 600, sansText),
  ]);

  const coverBuf = readFileSync(path.join(process.cwd(), 'public/assets/cover.jpg'));
  const coverDataUri = `data:image/jpeg;base64,${coverBuf.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#141418',
          padding: '60px',
          alignItems: 'center',
          gap: '60px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#4894D0',
          }}
        />
        <img
          src={coverDataUri}
          width={335}
          height={506}
          style={{
            objectFit: 'cover',
            boxShadow: '0 30px 60px rgba(0,0,0,0.65)',
            border: '1px solid rgba(237,237,240,0.08)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            height: '506px',
            justifyContent: 'space-between',
            paddingTop: '8px',
            paddingBottom: '8px',
          }}
        >
          <div
            style={{
              color: '#4894D0',
              fontFamily: 'Source Sans 3',
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                fontSize: '92px',
                color: '#EDEDF0',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontFamily: 'Source Sans 3',
                fontSize: '34px',
                color: '#95959E',
                marginTop: '22px',
                fontWeight: 600,
              }}
            >
              {subtitle}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                height: '1px',
                width: '64px',
                background: '#4894D0',
                marginBottom: '20px',
              }}
            />
            <div
              style={{
                fontFamily: 'Source Sans 3',
                fontSize: '18px',
                color: '#EDEDF0',
                letterSpacing: '0.22em',
                fontWeight: 600,
              }}
            >
              {byline}
            </div>
            <div
              style={{
                fontFamily: 'Source Sans 3',
                fontSize: '15px',
                color: '#52525C',
                marginTop: '10px',
                letterSpacing: '0.18em',
                fontWeight: 600,
              }}
            >
              {domain}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Playfair Display', data: playfairBold, weight: 700, style: 'normal' },
        { name: 'Source Sans 3', data: sourceSans, weight: 600, style: 'normal' },
      ],
    }
  );
}
