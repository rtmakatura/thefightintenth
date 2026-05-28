// Coerces any body-paragraph value into a plain string. Handles both the
// post-Phase-3 shape (plain string) and the legacy Portable Text block shape
// (`{_type: 'block', children: [{text: '...'}]}`). Use this on body arrays
// during the transition until all docs have been migrated.

type PortableSpan = { _type?: string; text?: string };
type PortableBlock = { _type?: string; children?: PortableSpan[] };

export function toParagraphText(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    const block = value as PortableBlock;
    if (Array.isArray(block.children)) {
      return block.children.map((c) => c?.text ?? '').join('');
    }
  }
  return String(value);
}
