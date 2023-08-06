import { config } from "https://deno.land/x/dotenv/mod.ts";
const env = config();

export const gpt = async (content: string, temperature: number) => {

	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			temperature,
			messages: [{ role: "user", content }],
		}),
	});

	const data = await response.json();

	console.log(`openai response: ${data.choices[0].message.content}`);

	return data.choices[0].message.content as string
}