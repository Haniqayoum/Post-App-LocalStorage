var form = document.querySelector(".signUpForm");
var signUpFormBox = document.getElementById("signUpFormBox");
var postApp = document.getElementById("postApp");


form.addEventListener("submit", function (event) {
  event.preventDefault();

  var password = document.getElementById("Password").value;
 var firstName = document.getElementById("FirstName").value;
var userName = document.getElementById("LastName").value;

  localStorage.setItem("firstName", firstName);
  localStorage.setItem("userName", userName);
localStorage.setItem("password",password);

  signUpFormBox.classList.add("hidden");
  postApp.classList.remove("hidden");

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Account Created ❤️!",
    showConfirmButton: false,
    timer: 2000
  });
});

var profilePhotoImg = document.getElementById("profilePhotoImg");
var profilePhotoInput = document.getElementById("profilePhotoInput");

profilePhotoImg.addEventListener("click", function(){
  profilePhotoInput.click();
});

profilePhotoInput.addEventListener("change" , function(e){
  var file = e.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(){
    profilePhotoImg.src = reader.result;
    cardImg = reader.result;
  };
  reader.readAsDataURL(file);
});

 var cardImg;
  
function deletePost(index){
  var posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.splice(index, 1);

  localStorage.setItem("posts", JSON.stringify(posts));

  showPosts();
}

function editPost(index) {
  var posts = JSON.parse(localStorage.getItem("posts")) || [];

  var post = posts[index];

  document.getElementById("title").value = post.title;
  document.getElementById("description").value = post.description;

  posts.splice(index, 1);

  localStorage.setItem("posts", JSON.stringify(allPosts));

  showPosts();
}

function post() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;

  var firstName = localStorage.getItem("firstName");
  var userName = localStorage.getItem("userName");

  var name = firstName + " (" + userName + ")";
  var currentTime = new Date().toLocaleTimeString();

  if (title.trim() && description.trim()) {

    var postObj = {
      title: title,
      description: description,
      name: name,
      time: currentTime,
      image: cardImg,
      profile: profilePhotoImg.src
    };

    var allPosts = JSON.parse(localStorage.getItem("posts")) || [];

    allPosts.push(postObj);

    localStorage.setItem("posts", JSON.stringify(allPosts));

    showPosts();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

  } else {
    alert("Fill all fields");
  }
}
function selectImg(src) {
  cardImg = src;
  console.log(cardImg);
  var cImg = document.getElementsByClassName("bgImg");
  for( var i = 0; i< cImg.length; i++){
    cImg[i].className = "bgImg";
  }
  event.target.classList.add("selectImg");
}

window.onload = function () {
  var firstName = localStorage.getItem("firstName");
  var userName = localStorage.getItem("userName");

  if (firstName && userName) {
    signUpFormBox.classList.add("hidden");
    postApp.classList.remove("hidden");
  } else {
    signUpFormBox.classList.remove("hidden");
    postApp.classList.add("hidden");
  }

  showPosts();
};

function showPosts() {
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  var container = document.getElementById("posts");

  container.innerHTML = "";

  posts.forEach(function(post, index) {
    container.innerHTML += `
      <div class="card m-2">
        <div class="card-header d-flex"> 
          <img class="profilePhoto" src="${post.profile}"/>
          <h6>${post.name}</h6>    
          <div class="time">${post.time}</div>
        </div>

        <div style="background-image: url(${post.image});" class="card-body">
          <h5>${post.title}</h5>
          <p>${post.description}</p>
        </div>

        <div class="ms-auto m-2">
          <button onclick="editPost(${index})" class="btn btn-info">Edit</button>
          <button onclick="deletePost(${index})" class="btn btn-danger">Delete</button>
        </div>
      </div>`;
  });
}
function goToSignup() {
  signUpFormBox.classList.remove("hidden");
  postApp.classList.add("hidden");
}