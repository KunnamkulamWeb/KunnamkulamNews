var firebaseConfig = {
    apiKey: "AIzaSyAbLuNWUnN9iO_5Nx-VbuWpjazH4T4A-2I",
      databaseURL: "https://kunnamkulam-news-20c37-default-rtdb.firebaseio.com",
    authDomain: "kunnamkulam-news-20c37.firebaseapp.com",
    projectId: "kunnamkulam-news-20c37",
    storageBucket: "kunnamkulam-news-20c37.appspot.com",
    messagingSenderId: "870943115346",
    appId: "1:870943115346:web:b51df1371d918d3a2b778b"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.database()
var auth = firebase.auth()
var stRef = firebase.storage()

