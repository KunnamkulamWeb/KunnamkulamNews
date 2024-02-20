

const menuBtn = document.querySelector(".menuBtn")
menuBtn.addEventListener("click", ()=>{
  document.querySelector(".sidenav").style.width = "240px"
})
let search = false
const closeNav = () =>{
  document.querySelector(".sidenav").style.width = ""
}


if(window.innerWidth >= 768){
    document.querySelector('.left').classList.remove('nullspace')
}
document.querySelector('.search-input').addEventListener('input', ()=>{
    search = true
})
document.querySelector('.searchBtn').addEventListener('click', ()=>{
    if(window.innerWidth < 768){
        if(!search){
        document.querySelector('.menuBtn').style.display = 'none'
        document.querySelector('.logoImg').style.display = 'none'
        document.querySelector('.nullspace').style.display = 'none'
        document.querySelector('.searchBox').style.width = '100%'
        document.querySelector('.searchBox').style.background = '#f4f4f4'
        document.querySelector('.search-input').style.display = 'block'
    }else{
        var searchTxt = document.querySelector('.search-input').value
        location.href = `/search/${searchTxt}`
    }
    }else{
        var searchTxt = document.querySelector('.search-input').value
        location.href = `/${searchTxt}`
    }
        
})





let newsId = decodeURI(location.pathname.split('/').pop())
db.ref('blogs/' + newsId).once('value', (snapshot)=> {
    document.body.querySelector('#overlayLoading').classList.remove('show')
    document.body.style.pointerEvents = "auto"
    const blog = snapshot.val()
    if(blog){
        document.querySelector('.tags').style.display = 'block'
        document.querySelector('.news-info').style.display = 'flex'
        document.querySelector('.title').innerHTML = blog.title
        document.querySelector('.share-news').style.display = 'block'
    document.querySelector('.location').innerHTML = `Home > ${blog.title}`
    document.querySelector('.date').innerHTML = blog.publishedAt
    document.querySelector('.news-article').innerHTML = blog.article
    if (blog.imagePath != null) {
        document.querySelector('.news-image').src = blog.imagePath
    } else {
        document.querySelector('.news-image').style.display = 'none'
    }
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
                                <a href="${blog.id}"" class="simple-news-title">${blog.title}</a>
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
                                <a href="${blog.id}"" class="simple-news-title">${blog.title}</a>
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

