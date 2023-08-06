import file from "../structure.json" assert {type: "json"}
import { gpt } from "./openai.ts"
//load json file

// const gpt = async (content: string, temperature: number) => {

// 	return content
// }

const writeChapter = async (chapter: any) => {

	console.log(`writing chapter: ${chapter.title}`)

	const hasSections = chapter.sections && chapter.sections.length > 0
	const createContent = `
		You need to write the content for one of its chapters, with up to 50 words.
		Your response should be the text in markdown format.
		Don't include the title of the chapter.
	`

	const chapterIntro = await gpt(`
	You are a book editor.
	You are writing a book.
	The book has the following structure:
	${JSON.stringify(file, null, 2)}
	
	${hasSections ? createContent : ""}
	The chapter is called: ${chapter.title}
	`, 0.4)

	console.log(`response: ${chapterIntro}`)

	if (chapter.sections) {
		const sections = await Promise.all(chapter.sections.map(writeSection))
		return { ...chapter, intro: chapterIntro, sections }

	} else
		return { ...chapter, intro: chapterIntro }
}

const writeSection = async (section: any) => {

	console.log(`writing section: ${section.title}`)

	const sectionContent = await gpt(`
	You are a book editor.
	You are writing a book.
	The book has the following structure:
	${JSON.stringify(file, null, 2)}
	
	You need to write the content for one of its sections.
	Your response should be the content in markdown format.
	The text should have up to 100 words.
	The target section is: ${section.title}
	`, 0.4)

	console.log(`response: ${sectionContent}`)


	return { ...section, content: sectionContent }

}

const chapters = file.chapters.map(writeChapter)

const chaptersResolved = await Promise.all(chapters)

// save file to disk

const fileResolved = { ...file, chapters: chaptersResolved }

await Deno.writeTextFile("./book.json", JSON.stringify(fileResolved, null, 2))
