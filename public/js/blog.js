let newsId = decodeURI(location.pathname.split('/').pop())
const menuBtn = document.querySelector(".menuBtn")
menuBtn.addEventListener("click", ()=>{
  document.querySelector(".sidenav").style.width = "240px"
})

const closeNav = () =>{
  document.querySelector(".sidenav").style.width = ""
}
db.ref('blogs/' + newsId).once('value', (snapshot)=> {
    document.body.querySelector('#overlayLoading').classList.remove('show')
    document.body.style.pointerEvents = "auto"
    const blog = snapshot.val()
    document.querySelector('.title').innerHTML = blog.title
    document.querySelector('.location').innerHTML = `Home > ${blog.title}`
    document.querySelector('.date').innerHTML = blog.publishedAt
    document.querySelector('.news-article').innerHTML = blog.article
    if (blog.imagePath != null) {
        document.querySelector('.news-image').src = blog.imagePath
    } else {
        document.querySelector('.news-image').style.display = 'none'
    }

})
.then(()=> {})
.catch((err)=> {
    alert(err.Message)
})
let blogSection = document.querySelector('.faveNewsSec')
let mostPopular = document.querySelector('.mostNewsSec')
db.ref('blogs').limitToLast(6).once('value', (snapshot)=> {
    const blogs = []
    snapshot.forEach((blogSnapshot)=> {
        const blog = blogSnapshot.val()
        blogs.push(blog)
    })
    const sortedBlogs = blogs.sort((a, b)=> b.timestamp - a.timestamp)
    const favPosts = sortedBlogs.slice(1, 7)
    favPosts.forEach((blog)=> {
        if (blog.id != decodeURI(location.pathname.split('/').pop())) {
            var path = blog.imagePath
            blogSection.innerHTML += `
            <div class="simple-news">
            <div class="simple-news-image-container">
            <img class="simple-news-image" src="${path}">
            </div>
            <div class="simple-news-content-container">
            <div class="simple-news-title-container">
            <p class="simple-news-title">${blog.title}</p>
            </div>
            <div class="simple-news-article-container">
            <p class="simple-news-article">${blog.article}</p>
            </div>
            </div>
            </div>
            `
            mostPopular.innerHTML = `
                        <div class="simple-news">
            <div class="simple-news-image-container">
            <img class="simple-news-image" src="${path}">
            </div>
            <div class="simple-news-content-container">
            <div class="simple-news-title-container">
            <p class="simple-news-title">${blog.title}</p>
            </div>
            <div class="simple-news-article-container">
            <p class="simple-news-article">${blog.article}</p>
            </div>
            </div>
            </div>
            `

        }
    })
})