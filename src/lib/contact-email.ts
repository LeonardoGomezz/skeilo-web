export interface ContactSubmission {
	name: string;
	email: string;
	company: string;
	message: string;
}

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const brandBar = (color: string, height: number) => `
	<td valign="bottom" style="padding:0 1px;">
		<div style="width:5px;height:${height}px;background:${color};border-radius:2px 2px 0 0;line-height:0;font-size:0;">&nbsp;</div>
	</td>
`;

export function buildContactEmailHtml(submission: ContactSubmission): string {
	const name = escapeHtml(submission.name);
	const email = escapeHtml(submission.email);
	const company = submission.company ? escapeHtml(submission.company) : '';
	const message = escapeHtml(submission.message).replace(/\n/g, '<br>');

	return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nuevo mensaje de contacto</title>
</head>
<body style="margin:0;padding:0;background:#f4f6fa;font-family:'IBM Plex Sans',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fa;padding:32px 16px;">
<tr>
<td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;">

<tr>
<td style="background:#0b1e3f;padding:28px 32px;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td valign="middle" style="padding-right:10px;">
<table role="presentation" cellpadding="0" cellspacing="0" style="height:20px;">
<tr>
${brandBar('#00e0b8', 7)}
${brandBar('#22cfc6', 12)}
${brandBar('#3db9da', 17)}
${brandBar('#2563eb', 20)}
</tr>
</table>
</td>
<td valign="middle" style="font:600 19px 'Sora',Helvetica,Arial,sans-serif;color:#ffffff;letter-spacing:-0.01em;">
Skeilo
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:8px 32px 0;">
<div style="font:500 11px 'IBM Plex Mono',Courier,monospace;letter-spacing:.12em;color:#00a88a;padding-top:20px;">
NUEVO MENSAJE DE CONTACTO
</div>
<h1 style="font:600 22px 'Sora',Helvetica,Arial,sans-serif;color:#0b1e3f;letter-spacing:-0.01em;margin:10px 0 24px;">
Alguien te escribió desde skeilo.tech
</h1>
</td>
</tr>

<tr>
<td style="padding:0 32px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fa;border-radius:10px;">
<tr>
<td style="padding:20px 22px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="padding-bottom:14px;">
<div style="font:500 11px 'IBM Plex Mono',Courier,monospace;letter-spacing:.08em;color:#1c2533;opacity:.55;">NOMBRE</div>
<div style="font:500 15px 'IBM Plex Sans',Helvetica,Arial,sans-serif;color:#0b1e3f;margin-top:2px;">${name}</div>
</td>
</tr>
<tr>
<td style="padding-bottom:${company ? '14px' : '0'};">
<div style="font:500 11px 'IBM Plex Mono',Courier,monospace;letter-spacing:.08em;color:#1c2533;opacity:.55;">CORREO</div>
<div style="font:500 15px 'IBM Plex Sans',Helvetica,Arial,sans-serif;margin-top:2px;">
<a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>
</div>
</td>
</tr>
${
	company
		? `<tr>
<td>
<div style="font:500 11px 'IBM Plex Mono',Courier,monospace;letter-spacing:.08em;color:#1c2533;opacity:.55;">EMPRESA</div>
<div style="font:500 15px 'IBM Plex Sans',Helvetica,Arial,sans-serif;color:#0b1e3f;margin-top:2px;">${company}</div>
</td>
</tr>`
		: ''
}
</table>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:22px 32px 0;">
<div style="font:500 11px 'IBM Plex Mono',Courier,monospace;letter-spacing:.08em;color:#1c2533;opacity:.55;margin-bottom:8px;">MENSAJE</div>
<div style="font:400 15px/1.65 'IBM Plex Sans',Helvetica,Arial,sans-serif;color:#1c2533;border:1px solid #e3e7ee;border-radius:10px;padding:16px 18px;">
${message}
</div>
</td>
</tr>

<tr>
<td style="padding:28px 32px 32px;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background:#00e0b8;border-radius:999px;">
<a href="mailto:${email}" style="display:inline-block;font:600 13px 'IBM Plex Sans',Helvetica,Arial,sans-serif;color:#0b1e3f;padding:12px 26px;text-decoration:none;">
Responder a ${name}
</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:20px 32px 28px;border-top:1px solid #e3e7ee;">
<div style="font:400 12px 'IBM Plex Sans',Helvetica,Arial,sans-serif;color:#1c2533;opacity:.55;">
Este mensaje fue enviado automáticamente desde el formulario de contacto de
<a href="https://www.skeilo.tech" style="color:#2563eb;text-decoration:none;">skeilo.tech</a>.
</div>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;
}

export function buildContactEmailText(submission: ContactSubmission): string {
	const lines = [
		'Nuevo mensaje de contacto — skeilo.tech',
		'',
		`Nombre: ${submission.name}`,
		`Correo: ${submission.email}`,
	];

	if (submission.company) {
		lines.push(`Empresa: ${submission.company}`);
	}

	lines.push('', 'Mensaje:', submission.message);

	return lines.join('\n');
}
