
document.body.style.pointerEvents = 'auto'


var url = decodeURI(window.location.href)

const menuBtn = document.querySelector(".menuBtn")
menuBtn.addEventListener("click", ()=>{
  document.querySelector(".sidenav").style.width = "240px"
})
let search = false
let newsTitle
let newsBody
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
                                <a href="${blog.htmlPath}" class="simple-news-title">${blog.title}</a>
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
                                <a href="${blog.htmlPath}" class="simple-news-title">${blog.title}</a>
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

function shareOnFacebook(){
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
}

function shareOnWhatsapp(){
    window.open('whatsapp://send?text=' + url, '_blank');
}
function shareOnTwitter() {
      window.open('https://twitter.com/intent/tweet?url=' + url, '_blank');
}

function shareOnLinkedIn() {
      window.open('https://www.linkedin.com/shareArticle?url=' + url, '_blank');
}
function shareViaEmail() {
      var subject = newsTitle
      var body = newsBody
      window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
    }

db.ref('ads/banner-ad-1').once('value', (snapshot)=>{
    var ads1Data = snapshot.val()
    if(ads1Data){
        var bannerAd1 = document.getElementById('ba-1')
        bannerAd1.src = ads1Data.image
    }
})
db.ref('ads/sq-ad-1').once('value', (snapshot)=>{
    var sqAds1Data = snapshot.val()
    if(sqAds1Data){
        var sqAd1 = document.getElementById('sq-1')
        sqAd1.src = sqAds1Data.image
    }
})