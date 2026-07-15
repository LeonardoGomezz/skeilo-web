import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from 'astro:env/server';
import { buildContactEmailHtml, buildContactEmailText } from '../../lib/contact-email';

export const prerender = false;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 120, email: 200, company: 120, message: 5000 };

const jsonResponse = (status: number, body: Record<string, unknown>) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});

export const POST: APIRoute = async ({ request }) => {
	if (request.headers.get('content-type')?.includes('application/json') !== true) {
		return jsonResponse(400, { success: false, message: 'Solicitud inválida.' });
	}

	let body: unknown;

	try {
		body = await request.json();
	} catch {
		return jsonResponse(400, { success: false, message: 'Solicitud inválida.' });
	}

	if (typeof body !== 'object' || body === null) {
		return jsonResponse(400, { success: false, message: 'Solicitud inválida.' });
	}

	const { name, email, company, message } = body as Record<string, unknown>;

	const cleanName = typeof name === 'string' ? name.trim() : '';
	const cleanEmail = typeof email === 'string' ? email.trim() : '';
	const cleanCompany = typeof company === 'string' ? company.trim() : '';
	const cleanMessage = typeof message === 'string' ? message.trim() : '';

	if (!cleanName || !cleanEmail || !cleanMessage) {
		return jsonResponse(400, { success: false, message: 'Completa nombre, correo y mensaje.' });
	}

	if (!EMAIL_PATTERN.test(cleanEmail)) {
		return jsonResponse(400, { success: false, message: 'Ingresa un correo válido.' });
	}

	if (
		cleanName.length > MAX_LENGTHS.name ||
		cleanEmail.length > MAX_LENGTHS.email ||
		cleanCompany.length > MAX_LENGTHS.company ||
		cleanMessage.length > MAX_LENGTHS.message
	) {
		return jsonResponse(400, { success: false, message: 'Uno de los campos es demasiado largo.' });
	}

	const submission = { name: cleanName, email: cleanEmail, company: cleanCompany, message: cleanMessage };
	const resend = new Resend(RESEND_API_KEY);

	const { error } = await resend.emails.send({
		from: RESEND_FROM_EMAIL,
		to: [RESEND_TO_EMAIL],
		replyTo: submission.email,
		subject: `Nuevo mensaje de contacto — ${submission.name}`,
		html: buildContactEmailHtml(submission),
		text: buildContactEmailText(submission),
	});

	if (error) {
		console.error('Resend error:', error);
		return jsonResponse(502, {
			success: false,
			message: 'No pudimos enviar tu mensaje. Intenta de nuevo en unos minutos.',
		});
	}

	return jsonResponse(200, { success: true });
};
