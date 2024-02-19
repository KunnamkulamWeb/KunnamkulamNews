const menuBtn = document.querySelector(".menuBtn")
menuBtn.addEventListener("click", ()=> {
    document.querySelector(".sidenav").style.width = "240px"
})

const closeNav = () => {
    document.querySelector(".sidenav").style.width = ""
}

const blogSection = document.querySelector('.news')
var category = decodeURI(location.pathname.split('/').pop())
var categoryTitle = category.split('-').join(' ')
document.querySelector('.category-title').innerHTML = categoryTitle
if (category != 'local-news') {
    categoryRef = 'blogs/' + category
} else categoryRef = 'blogs'

db.ref(categoryRef).on('value', (snapshot)=> {
    document.body.querySelector('#overlayLoading').classList.remove('show')
    document.body.style.pointerEvents = 'auto'
    const blogs = []
    snapshot.forEach((blogSnapshot)=> {
        const blog = blogSnapshot.val()
        blogs.push(blog)
    })
    const sortedBlogs = blogs.sort((a, b)=> b.timestamp - a.timestamp)
    sortedBlogs.forEach((blog)=> {
        if (blog.id != decodeURI(location.pathname.split('/').pop())) {
            createBlog(blog)
        }
    })
})

const createBlog = (blog) => {
    var path = blog.imagePath
    var image = path
    blogSection.innerHTML += `
    <div class="news-card">
    <div class="image-container">
    <img src="${image}" alt="">
    </div>
    <div class="news-container">
    <a href="${blog.id}" id="title" >${blog.title}</a>
    <p class="article">${blog.article}</p>
    </div>
    <div class="news-card-footer">
    <div class="author-container">
    <p class="by-icon">By</p>
    <p class="author">
    Ajmal Kunnamkulam
    </p>
    </div>
    <div class="date-container">
    <span class="material-symbols-outlined">calendar_month</span>
    <p class="date">${blog.publishedAt}</p>
    </div>
    <div class="null-container"></div>
    </div>

    <div onclick="location.href= '${blog.id}'" class="read-more">
    <span class="material-symbols-outlined">open_in_new</span>
    <p>Read more</p>
    </div>
    </div>
    `

}
document.querySelector('.searchBtn').addEventListener('click', ()=> {
    if (window.innerWidth < 768) {
        document.querySelector('.menuBtn').style.display = 'none'
        document.querySelector('.logoImg').style.display = 'none'
        document.querySelector('.searchBox').style.width = '100%'
        document.querySelector('.searchBox').style.background = '#f4f4f4'
        document.querySelector('.search-input').style.display = 'block'
    }

})