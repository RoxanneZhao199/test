const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let btn = document.querySelector(".btn").addEventListener("click", getPost);

let posts = []

searchInput.addEventListener("input", e => {
  const value = e.target.value
  posts.forEach(post => {
    const isVisible = post.userId.toString() === value
    post.element.classList.toggle("hide", !isVisible)
  })
})

function getPost() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then((data) => {
      data.sort((a, b) => (a.title > b.title ? 1 : -1));
      posts = data.map(post => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const textTitle = card.querySelector("[data-text-title]")
        const textBody = card.querySelector("[data-text-body]")
        const userText = card.querySelector("[data-user]")
        textTitle.textContent = post.title
        textBody.textContent = post.body
        userText.textContent = `User: ${post.userId}`
        userCardContainer.append(card)

        return { title: post.title, body: post.body, userId: post.userId, element: card }
      })
    })
}
