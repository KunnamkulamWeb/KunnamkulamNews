
const blogSection = document.querySelector('.news')


db.ref('blogs').limitToLast(15).on('value', (snapshot) => {
    document.body.querySelector('#overlayLoading').classList.remove('show')
    document.body.style.pointerEvents = 'auto'
    blogSection.innerHTML = ''
    const blogs = []
    snapshot.forEach((blogSnapshot)=> {
        const blog = blogSnapshot.val()
        blogs.push(blog)
    })
    const sortedBlogs = blogs.sort((a,b)=> b.timestamp - a.timestamp)
    sortedBlogs.forEach((blog)=>{
    if (blog.id != decodeURI(location.pathname.split('/').pop())) {
            createBlog(blog)
        }
})
    const simpleNews = sortedBlogs.slice(1,4)
    simpleNews.forEach((blog)=>{
        console.log(blog)
        createNews(blog)
    })
    const latestBlog = sortedBlogs[0]
    if(latestBlog){
        document.querySelector('.swiping-card__image').src = `${latestBlog.imagePath}`
        document.querySelector('.swiping-card__card-link').href = `${latestBlog.id}`
        document.querySelector('.swiping-card__title').innerHTML = `${latestBlog.title}`
        document.querySelector('.swiping-card__post-date').innerHTML = `${latestBlog.publishedAt}`
        document.querySelector('.swiping-card__excerpt').innerHTML = `${latestBlog.article}`
        document.querySelector('.scrolling-news').innerHTML = `${latestBlog.title} - ${latestBlog.article}`
        
        const startScrolling = () =>{
            var container = document.querySelector('.breaking-news-content')
            
            var text = document.querySelector('.scrolling-news')
            
            var position = container.offsetWidth;
            var textWidth = text.offsetWidth;
            
            const moveText = () =>{
                position--;
                text.style.left = position + 'px'
                if(position < -textWidth){
                    position = container.offsetWidth;
                }
                requestAnimationFrame(moveText)
            }
            moveText()
        }
        startScrolling()
    }
    
})


const createBlog = (blog)  => {
    var path = blog.imagePath
    var image = path
    blogSection.innerHTML +=`
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
const createNews = (blog) =>{
    var path = blog.imagePath
    const newsSection = document.querySelector('.simple-news-container')
    newsSection.innerHTML +=`
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




function shuffleArray(array) {
  const shuffledArray = [];
  while (array.length > 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    shuffledArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return shuffledArray;
}
let specialStories = document.querySelector('.specialNews')
let mostPopular = document.querySelector('.mostNewsSec')
let sportsNews = document.querySelector('.sportsNews')
let obituaryNews = document.querySelector('.obituaryNews')
db.ref('blogs').limitToLast(6).once('value', (snapshot)=> {
    const blogs = []
    snapshot.forEach((blogSnapshot)=> {
        const blog = blogSnapshot.val()
        blogs.push(blog)
    })
    const sortedBlogs = blogs.sort((a, b)=> b.timestamp - a.timestamp)
    let favPosts = sortedBlogs.slice(1, 7)
    favPosts = shuffleArray(favPosts);
    favPosts.forEach((blog)=> {
        if (blog.id != decodeURI(location.pathname.split('/').pop())) {
            var path = blog.imagePath
            specialStories.innerHTML += `
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
    favPosts = shuffleArray(favPosts);
    favPosts.forEach((blog)=> {
        if (blog.id != decodeURI(location.pathname.split('/').pop())) {
            var path = blog.imagePath
            sportsNews.innerHTML += `
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
    favPosts = shuffleArray(favPosts);
    favPosts.forEach((blog)=> {
        if (blog.id != decodeURI(location.pathname.split('/').pop())) {
            var path = blog.imagePath
            obituaryNews.innerHTML += `
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
    favPosts = shuffleArray(favPosts);
    favPosts.forEach((blog)=> {
        if (blog.id != decodeURI(location.pathname.split('/').pop())) {
            var path = blog.imagePath
            mostPopular.innerHTML += `
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
        location.href = `/search/${searchTxt}`
    }
        
})