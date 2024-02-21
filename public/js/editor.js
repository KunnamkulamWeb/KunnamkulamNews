auth.onAuthStateChanged((user) => {
    if (!user)
        location.replace('/login')
})
var doneBtn = document.querySelector('.done-btn')
var doneIcon = document.querySelector('.done')
var titleField = document.querySelector('.title')
var bodyField = document.querySelector('.content')
let banner = document.querySelector('.img-container')
let imageUrl
let blogName
let imageUploaded = false
let fileUploaded = false
let edited = false
let totalNumOfBlogs
db.ref('blogs').on('value', (snapshot)=>{
    totalNumOfBlogs = snapshot.numChildren()
})
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

titleField.addEventListener('input', () => {
    titleField.rows = titleField.value.split('\n').length
})

bodyField.addEventListener('input', () => {
    bodyField.rows = bodyField.value.split('\n').length
})

banner.addEventListener('click', () => {
    const uploader = document.createElement('input')

    uploader.type = 'file'
    uploader.accept = 'image/*'
    uploader.style.display = 'none'

    uploader.addEventListener('change', () => {

        if (uploader.files.length > 0) {
            const selectedFile = uploader.files[0]
            const storageRef = stRef.ref('news-images').child(selectedFile.name)
            createToastMessage('Uploading image')
            storageRef.put(selectedFile).then(function(snapshot) {
                
                return snapshot.ref.getDownloadURL()
            }).then((downloadURL)=> {
                imageUrl = downloadURL
                banner.style.background = `url(${imageUrl})`
            })
            .then(()=> {
                imageUploaded = true
                createToastMessage('Image uploaded successfully')
            })
            .catch((err)=> {
                alert(err + err.Message)
            })

        }



        document.body.removeChild(uploader)
    })

    document.body.appendChild(uploader)

    uploader.click()



})

titleField.addEventListener('input', ()=> {
    if (titleField.value && bodyField.value) {
        doneIcon.style.opacity = 1
    } else {
        doneIcon.style.opacity = 0.3
    }
})

bodyField.addEventListener('input', ()=> {
    if (titleField.value && bodyField.value) {
        doneIcon.style.opacity = 1
    } else {
        doneIcon.style.opacity = 0.3
    }
})
doneBtn.addEventListener('click', ()=> {
    if (imageUploaded) {
        if (bodyField.value && titleField.value) {
            auth.onAuthStateChanged((user)=> {
                if (user) {
                    if (!edited) {
                        var htmlFile = createHtml(titleField.value, bodyField.value, imageUrl)
                        let letters = 'abcdefghijklmnopqrstuvwxyz'
                        let titleTxt = titleField.value.split('.').join('-').split('\n').join('-').split(' ').join('-')
                        console.log(titleTxt)
                        let id = ''
                        for (let i = 0; i < 4; i++)
                            id += letters[Math.floor(Math.random() * letters.length)]

                        let docName = `${titleTxt}-${id}`
                        let date = new Date()

                        db.ref('blogs/' + docName).set({
                            title: titleField.value,
                            article: bodyField.value,
                            id: docName,
                            htmlPath: htmlFile,
                            imagePath: imageUrl,
                            timestamp: Date.now(),
                            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
                        }, (error) => {
                            if (error) {
                                console.error('Data could not be saved.', error);
                            } else {
                                createToastMessage('Post created')
                                location.replace('/dashboard')
                            }
                        });

                       
                    } else {
                        var htmlFile = createHtml(titleField.value, bodyField.value, imageUrl)
                         let date = new Date()
                        db.ref('blogs/' + blogName).update({
                            title: titleField.value,
                            article: bodyField.value,
                            htmlPath: htmlFile,
                            imagePath: imageUrl,
                            timestamp: Date.now(),
                            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
                        }, (error) => {
                            if (error) {
                                console.error('Data could not be saved.', error);
                            } else {
                                createToastMessage('Post created')
                                location.replace('/dashboard')
                            }
                        });
                        
                    }}
            })


        } else {
           
        }
    } else {
        createToastMessage('Please upload a image')
    }
})


const blogId = location.pathname.split('/')
blogId.shift()

if ((blogId[0] != 'editor') && (blogId[0] != 'add-post')) {
    edited = true
    document.getElementById('windowTitle').innerHTML = 'Edit post'
    db.ref('blogs/' + decodeURI(blogId[0])).once('value', (snapshot)=> {
        let blog = snapshot.val()
        blogName = blog.id
        document.querySelector('.title').innerHTML = blog.title
        document.querySelector('.content').innerHTML = blog.article
        if (blog.imagePath != null) {
            banner.style.background = `url(${blog.imagePath})`
            imageUrl = blog.imagePath
            imageUploaded = true
        } else {}
    })
}

function createHtml(newsTitle, newsBody, newsImage){
    
    let date = new Date()
    
    const htmlCode = `
    
    <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="${newsTitle}">
  <meta property="og:image" content="${newsImage}">
  <meta property="og:description" content="${newsBody}">
    <title>${newsTitle}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link href='https://unpkg.com/css.gg@2.0.0/icons/css/youtube.css' rel='stylesheet'>
    <link href='https://unpkg.com/css.gg@2.0.0/icons/css/facebook.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://kunnamkulamnews.onrender.com/css/home.css">
    <link rel="stylesheet" href="https://kunnamkulamnews.onrender.com/css/blog.css">
    <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-database.js"></script>
</head>

<body>

    <div class="sidenav">

        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>

        <a onclick="closeNav()" href="/">
            <li style="display: flex; align-items: center">
                <p class="my-auto" style="margin-left: 1em">
                    Home
                </p>

            </li>
        </a>

        <a onclick="closeNav()" href="/">
            <li style="display: flex; align-items: center">
                <p class="my-auto" style="margin-left: 1em">
                    Local News
                </p>

            </li>
        </a>
        <a onclick="closeNav()" href="/special-stories">
            <li style="display: flex; align-items: center">
                <p class="my-auto" style="margin-left: 1em">
                    Special Stories
                </p>

            </li>
        </a>
        <a onclick="closeNav()" href="/informations">
            <li style="display: flex; align-items: center">
                <p class="my-auto" style="margin-left: 1em">
                    Informations
                </p>

            </li>
        </a>
        <a onclick="closeNav()" href="/jobs">
            <li style="display: flex; align-items: center">
                <p class="my-auto" style="margin-left: 1em">
                    Jobs
                </p>

            </li>
        </a>
        <a onclick="closeNav()" href="/sports">
            <li style="display: flex; align-items: center">
                <p class="my-auto" style="margin-left: 1em">
                    Sports
                </p>

            </li>
        </a>
        <a onclick="closeNav()" href="/obituary">
            <li style="display: flex; align-items: center">
                <p class="my-auto" style="margin-left: 1em">
                    Obituary
                </p>

            </li>
        </a>
    </div>

    <div class="ads">
        <p>
            Get your site on WebWeaver
        </p>
    </div>

    <div class="header">
        <div class="menuBtn">
            <span class="material-symbols-outlined">menu</span>
        </div>
        <span class="nullspace left"></span>
        <img onclick="location.href='/'" class="logoImg"src="/img/kunnamkulam-logo.jpg">
        <span class="nullspace"></span>
        <div class="searchBox">
            <div class="inputBox">
                <input type="text" class="search-input" placeholder="Search News..." />
            </div>
            <div class="searchBtn">
                <span class="material-symbols-outlined">
                    search
                </span>
            </div>

        </div>

    </div>
    <div class="social-media">
        <a href="https://www.facebook.com/profile.php?id=100091613980814&mibextid=JRoKGi">
            <i class="gg-facebook"></i>
        </a>
        <a href="https://youtube.com/@ajuajmal5116?si=4pmNPdvf-Ht4cVQq">
            <i class="gg-youtube"></i>
        </a>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-8 left-side">
                <div class="location">Home > ${newsTitle}</div>
                <div class="news-info">
                    <h1 class="title">${newsTitle}</h1>
                    <div class="info-container">
                        <div class="author-container">
                            <p class="by-icon">
                                By
                            </p>
                            <p class="author">
                                Ajmal Kunnamkulam
                            </p>
                        </div>
                        <div class="date-container">
                            <span class="material-symbols-outlined">calendar_month</span>
                            <p class="date">${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}</p>
                        </div>
                    </div>
                </div>
                <div class="tags">
                    <span class="tag">Local News</span>
                    <span class="tag">Kunnamkulam News</span>
                </div>
                <div class="news-image-container">
                    <img class="news-image" src="${newsImage}" alt="">
                </div>
                <div class="news-content-container">
                    <p class="news-article">${newsBody}</p>
                </div>

                <div class="grey-line"></div>
                <div class="square-ads">
                    <img id="sq-1" src="" alt="">
                </div>
                <div class="share-news">
                    <h4 class="text-center mt-4">Share this news via</h4>
                    <ul class="social-media-share">
                        <li class="facebook share-item">
                            <a onclick="shareOnFacebook()" class="share-btn"><i class="fa fbck">&#xf09a;</i></a>
                        </li>
                        <li class="whatsapp share-item">
                            <a onclick="shareOnWhatsapp()" class="share-btn"><i class="fa wtsp">&#xf232;</i></a>
                        </li>
                        <li class="twitter share-item">
                            <a onclick="shareOnTwitter()" class="share-btn"><i class="fa fa-twitter twtr"></i></a>
                        </li>
                        <li class="linkedin share-item">
                            <a onclick="shareOnLinkedIn()" class="share-btn"><i class="fa lkdn">&#xf0e1;</i></a>
                        </li>
                        <li class="email share-item">
                            <a onclick="shareViaEmail()" class="share-btn"><i class="fa email">&#xf0e0;</i></a>
                        </li>
                    </ul>

                </div>
                                                     <div class="fav-posts">
                <div class="headDiv">
                    <div class="left">
                        <div class="box"></div>
                        <h4>You may also like</h4>
                    </div>
                </div>
                <div class="faveNewsSec">
                    
                </div>
            </div>
            </div>
            <div class="col-12 col-md-4 right-side">

                <div class="social-plugin">
                    <p style="font-size:18px" class="text-center">Follow us on</p>
                    <a href="https://www.facebook.com/profile.php?id=100091613980814&mibextid=JRoKGi">
                        <div class="fbPage">
                            <i class="fa">&#xf09a;</i>
                            <p>Facebook</p>
                    </div>

                        </a>
                        <a href="https://youtube.com/@ajuajmal5116?si=4pmNPdvf-Ht4cVQq
">
                            <div class="ytChannel">
                                <i class="fa">&#xf16a;</i>
                                <p>Youtube</p>
                            </div>
                            
                        </a>
                </div>
                <div class="banner-ads">
                    <img id="ba-1" src="" alt="">
                </div>
                
                                                                     <div class="most-posts">
                <div class="headDiv">
                    <div class="left">
                        <div class="box"></div>
                        <h4>Most popular</h4>
                    </div>
                </div>
                <div class="mostNewsSec">
                    
                </div>
            </div>
                
            </div>
        </div>
    </div>
    
    <footer>
        <div style="display:flex;justify-content:center;flex-direction:column;width:100%">
                <img src="img/kunnamkulam-news-white.png" class="footer-logo text-center" alt="">
                <div class="grey-line"></div>
                </div>
                <p>Made By Webweaver</p>
                <a href="https://www.instagram.com/web___weaver" style="font-size:12px">Contact us</a>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://kunnamkulamnews.onrender.com/js/firebase.js"></script>
    <script src="https://kunnamkulamnews.onrender.com/js/blog.js"></script>
</body>

</html>
    
    
    `
    const blogCount = totalNumOfBlogs + 1
    const fileName = `blog_post_${blogCount}.html`
    
    if(htmlCode && fileName){
        
        fetch('upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fileName, htmlCode})
        })
        .then(response =>{
            if(!response.ok){
                throw new Error('Error while uploading html file.')
            }
            alert('Html uploaded successfully')
        })
        .catch(error =>{
            alert(error)
        })
        
        
        var htmlFilePath = 'blogs/' + fileName
        
        return htmlFilePath
    }
}


function createToastMessage(message){
     var toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
            var toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message

            document.getElementById('toast-container').appendChild(toast);

            setTimeout(function() {
                toast.classList.add('show');
                setTimeout(function() {
                    toast.remove();
                }, 3000);
            }, 100);
}