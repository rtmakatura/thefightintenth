'use client';

import { useMemo, useState, useTransition, type FormEvent, type ReactNode } from 'react';
import { submitContact, type ContactPayload } from './actions';
import styles from './contact.module.css';

type ChannelId = 'general' | 'press' | 'speaking' | 'bulk' | 'squadron';

type Channel = {
  id: ChannelId;
  label: string;
  helper: ReactNode;
};

const CHANNELS: Channel[] = [
  {
    id: 'general',
    label: 'General',
    helper: (
      <span>
        <b>Reader notes, questions, kind words.</b> If you&apos;ve finished the book and want
        to say so — or argue with something I wrote — this is the right channel. I read
        everything and reply when I can.
      </span>
    ),
  },
  {
    id: 'press',
    label: 'Press & Media',
    helper: (
      <span>
        <b>Reviews, interviews, podcast bookings, op-ed pitches.</b> The press kit (cover
        art, headshots, fact sheet, suggested questions) is on the Press page. Tell me your
        outlet and your timeline.
      </span>
    ),
  },
  {
    id: 'speaking',
    label: 'Speaking',
    helper: (
      <span>
        <b>Talks, readings, panels, classroom visits.</b> I travel for libraries, military
        museums, civic groups, and book clubs. Veteran groups and student audiences get
        priority and reduced fees.
      </span>
    ),
  },
  {
    id: 'bulk',
    label: 'Signed & Bulk',
    helper: (
      <span>
        <b>Signed copies, bulk orders, classroom sets.</b> I sign and ship from Pittsburgh.
        Veteran groups, libraries, and ROTC programs get a discount — just say so in the
        message.
      </span>
    ),
  },
  {
    id: 'squadron',
    label: 'Squadron Mates',
    helper: (
      <span>
        <b>Tenth TFS alumni, families, and anyone who served at Hahn or Al Minhad.</b> If
        your name, your callsign, or your photo should be in the archive — please tell me.
        I&apos;m still collecting.
      </span>
    ),
  },
];

type FormState = {
  first: string;
  last: string;
  email: string;
  message: string;
  outlet: string;
  deadline: string;
  org: string;
  audience: string;
  date: string;
  copies: string;
  inscription: string;
  callsign: string;
  unit: string;
};

const EMPTY: FormState = {
  first: '',
  last: '',
  email: '',
  message: '',
  outlet: '',
  deadline: '',
  org: '',
  audience: '',
  date: '',
  copies: '',
  inscription: '',
  callsign: '',
  unit: '',
};

export default function ContactForm() {
  const [channel, setChannel] = useState<ChannelId>('general');
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const active = CHANNELS.find((c) => c.id === channel)!;

  // Random ticket regenerated whenever the channel changes.
  const ticket = useMemo(() => {
    const code =
      channel.slice(0, 3).toUpperCase() +
      '-' +
      Math.floor(1000 + Math.random() * 9000);
    return code;
  }, [channel]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const payload: ContactPayload = {
      channel,
      channelLabel: active.label,
      ticket,
      first: form.first,
      last: form.last,
      email: form.email,
      message: form.message,
      outlet: form.outlet || undefined,
      deadline: form.deadline || undefined,
      org: form.org || undefined,
      audience: form.audience || undefined,
      date: form.date || undefined,
      copies: form.copies || undefined,
      inscription: form.inscription || undefined,
      callsign: form.callsign || undefined,
      unit: form.unit || undefined,
    };
    startTransition(async () => {
      const result = await submitContact(payload);
      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.metaRow}>
        <span>Send a Message</span>
        <span className={styles.metaId}>TICKET · {ticket}</span>
      </div>

      <div className={styles.router}>
        <div className={styles.routerLabel}>Route my message →</div>
        <div className={styles.tabs} role="tablist">
          {CHANNELS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={channel === t.id}
              className={`${styles.tab} ${channel === t.id ? styles.tabActive : ''}`}
              onClick={() => setChannel(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.helper}>{active.helper}</div>

      {!submitted ? (
        <form onSubmit={submit}>
          <div className={styles.formRow}>
            <label className={styles.field}>
              <span className={styles.label}>First Name</span>
              <input
                required
                value={form.first}
                onChange={(e) => update('first', e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Last Name</span>
              <input
                required
                value={form.last}
                onChange={(e) => update('last', e.target.value)}
              />
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </label>

          {channel === 'press' && (
            <div className={styles.formRow}>
              <label className={styles.field}>
                <span className={styles.label}>Outlet / Publication</span>
                <input
                  value={form.outlet}
                  onChange={(e) => update('outlet', e.target.value)}
                  placeholder="e.g. Air & Space Forces Magazine"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Deadline</span>
                <input
                  value={form.deadline}
                  onChange={(e) => update('deadline', e.target.value)}
                  placeholder="When you need a reply"
                />
              </label>
            </div>
          )}

          {channel === 'speaking' && (
            <>
              <label className={styles.field}>
                <span className={styles.label}>Organization / Venue</span>
                <input
                  value={form.org}
                  onChange={(e) => update('org', e.target.value)}
                  placeholder="Library, museum, base, civic group…"
                />
              </label>
              <div className={styles.formRow}>
                <label className={styles.field}>
                  <span className={styles.label}>Audience size</span>
                  <select
                    value={form.audience}
                    onChange={(e) => update('audience', e.target.value)}
                  >
                    <option value="">Select…</option>
                    <option>Under 25 (book club / classroom)</option>
                    <option>25 – 100 (small venue)</option>
                    <option>100 – 500 (auditorium)</option>
                    <option>500+ (large hall)</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Target date</span>
                  <input
                    value={form.date}
                    onChange={(e) => update('date', e.target.value)}
                    placeholder="Approximate date"
                  />
                </label>
              </div>
            </>
          )}

          {channel === 'bulk' && (
            <div className={styles.formRow}>
              <label className={styles.field}>
                <span className={styles.label}>How many copies?</span>
                <select
                  value={form.copies}
                  onChange={(e) => update('copies', e.target.value)}
                >
                  <option value="">Select…</option>
                  <option>1 (signed personal copy)</option>
                  <option>2 – 10</option>
                  <option>10 – 50 (book club / classroom)</option>
                  <option>50 – 250 (group order)</option>
                  <option>250+ (institution)</option>
                </select>
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Inscription (optional)</span>
                <input
                  value={form.inscription}
                  onChange={(e) => update('inscription', e.target.value)}
                  placeholder="To Dad, with thanks for…"
                />
              </label>
            </div>
          )}

          {channel === 'squadron' && (
            <div className={styles.formRow}>
              <label className={styles.field}>
                <span className={styles.label}>Callsign (if you had one)</span>
                <input
                  value={form.callsign}
                  onChange={(e) => update('callsign', e.target.value)}
                  placeholder="e.g. Boom-Boom"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Unit · Years</span>
                <input
                  value={form.unit}
                  onChange={(e) => update('unit', e.target.value)}
                  placeholder="10 TFS · 1988–91"
                />
              </label>
            </div>
          )}

          <label className={styles.field}>
            <span className={styles.label}>
              {channel === 'squadron' ? 'Your story (no length limit)' : 'Message'}
            </span>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
            />
          </label>

          <label className={styles.consent}>
            <input type="checkbox" required />
            <span>
              I&apos;m okay with Mak replying directly to the email above. He won&apos;t
              share it, sell it, or add me to a list.
            </span>
          </label>

          {error && (
            <div className={styles.errorBox} role="alert">
              <b>Transmission failed.</b> {error}
            </div>
          )}

          <div className={styles.submitRow}>
            <button
              type="submit"
              className="btn btn-dark"
              style={{ justifyContent: 'center', minWidth: '220px' }}
              disabled={isPending}
            >
              {isPending ? 'Transmitting…' : 'Transmit Message →'}
            </button>
            <div className={styles.responseNote}>
              <b>Auth:</b> author · direct
              <br />
              <b>ETA:</b> 3–5 business days
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.sendReadout} role="status" aria-live="polite">
          <span className={styles.line}>
            <span className={styles.ack}>► ACK</span>
            &nbsp;&nbsp;Message received · ticket {ticket}
          </span>
          <span className={styles.line}>
            <span className={styles.ack}>► ROUTE</span>
            &nbsp;&nbsp;{active.label} channel · author direct
          </span>
          <span className={styles.line}>
            <span className={styles.ack}>► ETA</span>
            &nbsp;&nbsp;Reply within 3–5 business days
          </span>
          <span className={styles.line} style={{ marginTop: '0.6rem' }}>
            <span className={styles.blinkInline} />
            Standing by. Thank you for writing.
          </span>
        </div>
      )}
    </div>
  );
}
