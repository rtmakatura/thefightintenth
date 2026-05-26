'use server';

import { Resend } from 'resend';
import { AUTHOR_EMAIL } from '@/lib/content';

export type ContactPayload = {
  channel: string;
  channelLabel: string;
  ticket: string;
  first: string;
  last: string;
  email: string;
  message: string;
  outlet?: string;
  deadline?: string;
  org?: string;
  audience?: string;
  date?: string;
  copies?: string;
  inscription?: string;
  callsign?: string;
  unit?: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(k: string, v?: string) {
  if (!v) return '';
  return `<tr><td style="padding:6px 12px 6px 0;color:#52525C;font-size:12px;letter-spacing:.12em;text-transform:uppercase;vertical-align:top;width:140px;">${escapeHtml(
    k,
  )}</td><td style="padding:6px 0;color:#141416;font-size:14px;vertical-align:top;">${escapeHtml(
    v,
  )}</td></tr>`;
}

export async function submitContact(p: ContactPayload): Promise<SubmitResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error:
        'Email service not configured. Set RESEND_API_KEY in .env.local — see README.',
    };
  }

  const resend = new Resend(apiKey);
  const fullName = `${p.first} ${p.last}`.trim();

  const channelRows = [
    row('Outlet', p.outlet),
    row('Deadline', p.deadline),
    row('Organization', p.org),
    row('Audience', p.audience),
    row('Target date', p.date),
    row('Copies', p.copies),
    row('Inscription', p.inscription),
    row('Callsign', p.callsign),
    row('Unit · Years', p.unit),
  ]
    .filter(Boolean)
    .join('');

  const html = `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;color:#141416;">
  <div style="border-left:3px solid #4894D0;padding-left:14px;margin-bottom:18px;">
    <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#3070A8;font-weight:600;">
      ${escapeHtml(p.channelLabel)} · ${escapeHtml(p.ticket)}
    </div>
    <div style="font-size:18px;font-weight:600;margin-top:4px;">${escapeHtml(fullName)} &lt;${escapeHtml(p.email)}&gt;</div>
  </div>
  <table style="border-collapse:collapse;margin-bottom:18px;">
    ${row('Channel', p.channelLabel)}
    ${row('Ticket', p.ticket)}
    ${row('Name', fullName)}
    ${row('Email', p.email)}
    ${channelRows}
  </table>
  <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#52525C;border-top:1px solid #e5e5e8;padding-top:10px;">Message</div>
  <div style="white-space:pre-wrap;margin-top:8px;font-size:15px;line-height:1.6;">${escapeHtml(
    p.message,
  )}</div>
</div>`;

  const text = [
    `${p.channelLabel} · Ticket ${p.ticket}`,
    `From: ${fullName} <${p.email}>`,
    p.outlet && `Outlet: ${p.outlet}`,
    p.deadline && `Deadline: ${p.deadline}`,
    p.org && `Organization: ${p.org}`,
    p.audience && `Audience: ${p.audience}`,
    p.date && `Target date: ${p.date}`,
    p.copies && `Copies: ${p.copies}`,
    p.inscription && `Inscription: ${p.inscription}`,
    p.callsign && `Callsign: ${p.callsign}`,
    p.unit && `Unit: ${p.unit}`,
    '',
    p.message,
  ]
    .filter(Boolean)
    .join('\n');

  // Sender: until a custom domain is verified in Resend, send from the
  // shared `onboarding@resend.dev` address. Replies go to the visitor's
  // own email so Mak can respond directly.
  const from = process.env.CONTACT_FROM ?? 'The Fightin\' Tenth <onboarding@resend.dev>';

  // Destination: with the dev sender, Resend will only deliver to the
  // email used to register the Resend account. Allow CONTACT_TO to
  // override AUTHOR_EMAIL until a verified domain is in place.
  const to = process.env.CONTACT_TO?.trim() || AUTHOR_EMAIL;

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: p.email,
      subject: `[${p.channelLabel}] ${fullName} · ${p.ticket}`,
      html,
      text,
    });

    if (result.error) {
      console.error('[contact] Resend returned error:', result.error);
      return { ok: false, error: result.error.message || 'Email send failed.' };
    }

    return { ok: true };
  } catch (err) {
    console.error('[contact] Unexpected error sending email:', err);
    const msg = err instanceof Error ? err.message : 'Unknown error.';
    return { ok: false, error: msg };
  }
}
