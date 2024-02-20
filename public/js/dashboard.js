const blogSection = document.querySelector('.posts')

db.ref('blogs').on('value', (snapshot) => {
    blogSection.innerHTML = ''
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

let imageUrl

const createBlog = (blog) => {
    var path = blog.imagePath
    var image
    if (path != null) {
        image = blog.imagePath
    } else {
        image = 'src/camera.png'
    }
    blogSection.innerHTML += `
    <div class="post-container">
    <div class="image-container">
    <img src="${image}" alt="" />
    </div>
    <div class="info-container">
    <div class="title-container">
    <p class="title">
    ${blog.title}
    </p>
    </div>
    <div class="date-container">
    <p class="date">
    Published at ${blog.publishedAt}
    </p>
    </div>

    </div>
    <div class="icon-container">
    <span class="button-back more-btn">
    <span class="material-symbols-outlined">more_vert</span>
    </span>
    </div>
    <ul class="menu">
    <li class="menu-item" onclick="window.open('/${blog.id}')">
    <span class="material-symbols-outlined">visibility</span>
    <p>View</p>
    </li>
    <li class="menu-item" onclick="location.href = '/${blog.id}/editor'">
    <span class="material-symbols-outlined">edit</span>
    <p>Edit</p>
    </li>
    <li class="menu-item delete" onclick="deleteNews('${blog.id}')">
    <span class="material-symbols-outlined">delete</span>
    <p>Delete</p>
    </li>
    </ul>
    </div>
    `
    const moreBtns = document.querySelectorAll('.more-btn');
    const postContainers = document.querySelectorAll('.post-container');

    moreBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const menu = btn.closest('.post-container').querySelector('.menu');
            menu.classList.add('show');
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.icon-container')) {
            postContainers.forEach(container => {
                const menu = container.querySelector('.menu');
                menu.classList.remove('show');
            });
        }
    });

}



document.querySelector('.add-btn').addEventListener('click', ()=> {
    location.href = '/add-post'
})

auth.onAuthStateChanged((user)=> {
    if (!user) {
        location.replace('/login')
    } else {
        console.log(auth.currentUser.uid())
    }
})


const deleteNews = (id) => {
    db.ref('blogs').child(id).remove()
    .then(()=> {
        var toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
        var toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = 'Post deleted';

        document.getElementById('toast-container').appendChild(toast);

        setTimeout(function() {
            toast.classList.add('show');
            setTimeout(function() {
                toast.remove();
            }, 3000);
        }, 100);
    })
    .catch((err)=> {
        console.log('error while deleting', err)
    })

}

const openNews = (id) => {
    let blogId = '/' + id
    window.open(blogId)
}

var ba_1_btn = document.querySelector('#ba-1')
var ba_2_btn = document.querySelector('#ba-2')
var sq_1_btn = document.querySelector('#sq-1')


ba_1_btn.addEventListener('click', ()=> {
    const uploader = document.createElement('input')

    uploader.type = 'file'
    uploader.accept = 'image/*'
    uploader.style.display = 'none'

    uploader.addEventListener('change', () => {

        if (uploader.files.length > 0) {
            const selectedFile = uploader.files[0]
            const storageRef = stRef.ref('ads').child(selectedFile.name)
            var toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
            var toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = 'Uploading banner ad 1';

            document.getElementById('toast-container').appendChild(toast);

            setTimeout(function() {
                toast.classList.add('show');
                setTimeout(function() {
                    toast.remove();
                }, 3000);
            }, 100);
            storageRef.put(selectedFile).then(function(snapshot) {

                return snapshot.ref.getDownloadURL()
            }).then((downloadURL)=> {
                imageUrl = downloadURL
            })
            .then(()=> {
                imageUploaded = true
                var toastContainer = document.createElement('div');
                toastContainer.id = 'toast-container';
                document.body.appendChild(toastContainer);
                var toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = 'Banner ad 1 uploaded successfully';

                document.getElementById('toast-container').appendChild(toast);



                setTimeout(function() {
                    toast.classList.add('show');
                    setTimeout(function() {
                        toast.remove();
                    }, 3000);
                }, 100);

                db.ref('ads/banner-ad-1').set({
                    image: imageUrl
                }).then(()=> {})
                .catch((err)=> {})
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

ba_2_btn.addEventListener('click', ()=> {
    const uploader = document.createElement('input')

    uploader.type = 'file'
    uploader.accept = 'image/*'
    uploader.style.display = 'none'

    uploader.addEventListener('change',
        () => {

            if (uploader.files.length > 0) {
                const selectedFile = uploader.files[0]
                const storageRef = stRef.ref('ads').child(selectedFile.name)
                var toastContainer = document.createElement('div');
                toastContainer.id = 'toast-container';
                document.body.appendChild(toastContainer);
                var toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = 'Uploading banner ad 2';

                document.getElementById('toast-container').appendChild(toast);

                setTimeout(function() {
                    toast.classList.add('show');
                    setTimeout(function() {
                        toast.remove();
                    }, 3000);
                }, 100);
                storageRef.put(selectedFile).then(function(snapshot) {

                    return snapshot.ref.getDownloadURL()
                }).then((downloadURL)=> {
                    imageUrl = downloadURL
                })
                .then(()=> {
                    imageUploaded = true
                    var toastContainer = document.createElement('div');
                    toastContainer.id = 'toast-container';
                    document.body.appendChild(toastContainer);
                    var toast = document.createElement('div');
                    toast.className = 'toast';
                    toast.textContent = 'Banner ad 2 uploaded successfully';

                    document.getElementById('toast-container').appendChild(toast);



                    setTimeout(function() {
                        toast.classList.add('show');
                        setTimeout(function() {
                            toast.remove();
                        }, 3000);
                    }, 100);

                    db.ref('ads/banner-ad-2').set({
                        image: imageUrl
                    }).then(()=> {})
                    .catch((err)=> {})
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

sq_1_btn.addEventListener('click', ()=> {
    const uploader = document.createElement('input')

    uploader.type = 'file'
    uploader.accept = 'image/*'
    uploader.style.display = 'none'

    uploader.addEventListener('change',
        () => {

            if (uploader.files.length > 0) {
                const selectedFile = uploader.files[0]
                const storageRef = stRef.ref('ads').child(selectedFile.name)
                var toastContainer = document.createElement('div');
                toastContainer.id = 'toast-container';
                document.body.appendChild(toastContainer);
                var toast = document.createElement('div');
                toast.className = 'toast';
                toast.textContent = 'Uploading square ad 1';

                document.getElementById('toast-container').appendChild(toast);

                setTimeout(function() {
                    toast.classList.add('show');
                    setTimeout(function() {
                        toast.remove();
                    }, 3000);
                }, 100);
                storageRef.put(selectedFile).then(function(snapshot) {

                    return snapshot.ref.getDownloadURL()
                }).then((downloadURL)=> {
                    imageUrl = downloadURL
                })
                .then(()=> {
                    imageUploaded = true
                    var toastContainer = document.createElement('div');
                    toastContainer.id = 'toast-container';
                    document.body.appendChild(toastContainer);
                    var toast = document.createElement('div');
                    toast.className = 'toast';
                    toast.textContent = 'Square ad 2 uploaded successfully';

                    document.getElementById('toast-container').appendChild(toast);



                    setTimeout(function() {
                        toast.classList.add('show');
                        setTimeout(function() {
                            toast.remove();
                        }, 3000);
                    }, 100);

                    db.ref('ads/sq-ad-1').set({
                        image: imageUrl
                    }).then(()=> {})
                    .catch((err)=> {})
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