
const blogSection = document.querySelector('.news')
let searchTxt = decodeURI(location.pathname)
let searchValue = searchTxt.split('/')
searchValue.shift()
document.getElementById('search').innerHTML = `Search result for "${searchValue[1]}"`
db.ref(`blogs/${searchValue[1]}`).limitToLast(15).on('value', (snapshot) => {
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
})