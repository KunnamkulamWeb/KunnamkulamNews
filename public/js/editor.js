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
let edited = false
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
            var toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
        var toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = 'Uploading image';

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
                banner.style.background = `url(${imageUrl})`
            })
            .then(()=> {
                imageUploaded = true
                var toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
        var toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = 'Image uploaded successfully';

        document.getElementById('toast-container').appendChild(toast);

        setTimeout(function() {
            toast.classList.add('show');
            setTimeout(function() {
                toast.remove();
            }, 3000);
        }, 100);
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
                    if (edited) {
                        let date = new Date()
                        db.ref('blogs/' + blogName).update({
                            title: titleField.value,
                            article: bodyField.value,
                            imagePath: imageUrl,
                            timestamp: Date.now(),
                            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
                        }, (error) => {
                            if (error) {
                                console.error('Data could not be saved.', error);
                            } else {
                                var toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  document.body.appendChild(toastContainer);
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = 'Post created';
  
  document.getElementById('toast-container').appendChild(toast);
  
  setTimeout(function() {
    toast.classList.add('show');
    setTimeout(function() {
      toast.remove();
    }, 3000);
  }, 100);
                                location.replace('/dashboard')
                            }
                        });
                    } else {
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
                            imagePath: imageUrl,
                            timestamp: Date.now(),
                            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
                        }, (error) => {
                            if (error) {
                                console.error('Data could not be saved.', error);
                            } else {
                                var toastContainer = document.createElement('div');
                                toastContainer.id = 'toast-container';
                                document.body.appendChild(toastContainer);
                                var toast = document.createElement('div');
                                toast.className = 'toast';
                                toast.textContent = 'Post created';

                                document.getElementById('toast-container').appendChild(toast);

                                setTimeout(function() {
                                    toast.classList.add('show');
                                    setTimeout(function() {
                                        toast.remove();
                                    }, 3000);
                                }, 100);
                                location.replace('/dashboard')
                            }
                        });


                    }}
            })


        } else {
            var toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
            var toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = 'Please fill all fields';

            document.getElementById('toast-container').appendChild(toast);

            setTimeout(function() {
                toast.classList.add('show');
                setTimeout(function() {
                    toast.remove();
                }, 3000);
            }, 100);
        }
    } else {
        var toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
        var toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = 'Please upload a image';

        document.getElementById('toast-container').appendChild(toast);

        setTimeout(function() {
            toast.classList.add('show');
            setTimeout(function() {
                toast.remove();
            }, 3000);
        }, 100);
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