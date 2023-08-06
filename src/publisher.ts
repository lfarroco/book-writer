import file from "../book.json" assert {type: "json"}
import { marked } from "npm:marked@5.1.2";

const renderSection = (section: any) => {

	const markup = marked.parse(section.content)

	return `${markup}`
}

const renderChapter = async (chapter: any) => {

	const content = marked.parse(chapter.intro)

	const body = `${content}`

	if (!chapter.sections) return body

	const sections = await Promise.all(chapter.sections.map(renderSection))

	return `
	${body}
	${sections?.join("\n\n")}
	`

}

const chapters = await Promise.all(file.chapters.map(renderChapter))

const book = `
	<h1>${file.title}</h1>
	${chapters.join("\n\n")}`

//write file
const encoder = new TextEncoder()
const data = encoder.encode(book)
await Deno.writeFile("./book.html", data)

