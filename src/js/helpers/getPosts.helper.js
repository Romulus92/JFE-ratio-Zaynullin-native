export default async function getPosts() {
	const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
		.then((response) => {
			return response.json();
		})
	return posts
}