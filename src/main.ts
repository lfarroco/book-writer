import { gpt } from "./openai.ts"


const response = await gpt(`
You are a book editor.
When I give you a topic, you should reply with the book structure: title, chapters, and sections.
If appropriate, you should include chapters for introduction, conclusion and other common sections.
You should optimize the structure for understanding, readability and ease of navigation.
The book should have up to 50 pages.
You response should come as JSON. This is very important - don't reply in any other format.
Example: 
Input: How to write a book 
Output: {
	  "title": "How to write a book",
	  "chapters": [
		{
			"title": "Introduction",
		},
		{
		"title": "Choosing a topic",
		"sections": [
			{
			"title": "What are you passionate about?"
			},
			{
			"title": "What are you good at?"
			}
		],
		},
		{
		"title": "Writing the book",
		"sections": [
			{
			"title": "Writing the first draft"
			},
			{
			"title": "Editing the first draft"
			}
		]
		},
		{
			"title": "Conclusion"
		}
	]
}
The theme for the book is: "The history of pasta"

`, 0.4)

console.log(response)