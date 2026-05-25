export type ReleaseStatus = {
  released: boolean;
  formattedDate: string | null;
  statusLine: string;
  ctaLabel: string;
};

export function releaseStatus(pubDateIso?: string): ReleaseStatus {
  if (!pubDateIso) {
    return {
      released: false,
      formattedDate: null,
      statusLine: 'Pre-Order Available Now',
      ctaLabel: 'Pre-Order on Amazon',
    };
  }

  const pubDate = new Date(pubDateIso);
  if (Number.isNaN(pubDate.getTime())) {
    return {
      released: false,
      formattedDate: null,
      statusLine: 'Pre-Order Available Now',
      ctaLabel: 'Pre-Order on Amazon',
    };
  }

  const formattedDate = pubDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  const released = pubDate.getTime() <= Date.now();

  return {
    released,
    formattedDate,
    statusLine: released
      ? 'Available Now'
      : `Publishing ${formattedDate} · Pre-Order Available Now`,
    ctaLabel: released ? 'Order on Amazon' : 'Pre-Order on Amazon',
  };
}
