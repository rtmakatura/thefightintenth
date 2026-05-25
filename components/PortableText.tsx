import {
  PortableText as BasePortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
};

export default function PortableText({
  value,
}: {
  value: PortableTextBlock[] | undefined;
}) {
  if (!value || value.length === 0) return null;
  return <BasePortableText value={value} components={components} />;
}
