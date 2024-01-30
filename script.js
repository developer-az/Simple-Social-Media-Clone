let followers = 100;
let likes = 500;
let uploadedImages = [];
let username = prompt("Enter your username:");
// darkmode
function changeMode(){
  var element = document.body;
  element.classList.toggle("dark-mode");
}
//values for the followers, likes, and username
function updateProfile() {
  const followersElement = document.getElementById('followers');
  const likesElement = document.getElementById('likes');
  const usernameElement = document.getElementById('username');

  if (followersElement && likesElement && usernameElement) {
    const followersText = 'Followers: ' + followers;
    const likesText = 'Likes: ' + likes;
    const usernameText = 'Username: ' + username;

    followersElement.textContent = followersText;
    likesElement.textContent = likesText;
    usernameElement.textContent = usernameText;
  }
}
//function to find a random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// https://www.youtube.com/watch?v=GAwm3_624K8 "loadSnippet" tutorial video (used loadContent for my program)
function loadContent(section) {
  const contentContainer = document.getElementById('content');

  if (section === 'home') {
    let homeContent = '<h1>InstaFamous</h1><p>Welcome to the your InstaFamous Feed!</p>';
    // Display uploaded images in the home section
    homeContent += '<div class="flex-container">';


    // Display uploaded images in the home section
    for (const img of uploadedImages) {
      homeContent += '<img src="' + img + '" class="uploaded-image">';
    }

    homeContent += '</div>';
    contentContainer.innerHTML = homeContent;
  } else if (section === 'upload') {
    contentContainer.innerHTML = `
     
      <h2>Upload Photo</h2>
      <input type="file" id="photoInput" accept="image/*">
      <button onclick="uploadPhoto()">Upload</button>
    `;
    // else if statements for which section the user is in
  } else if (section === 'profile') {
    const followersText = 'Followers: ' + followers;
    const likesText = 'Likes: ' + likes;
    const usernameText = 'Username: ' + username;
//displaying profile contents
    contentContainer.innerHTML = '<h2>Your Profile</h2>' +
      '<p id="username">' + usernameText + '</p>' +
      '<p id="followers">' + followersText + '</p>' +
      '<p id="likes">' + likesText + '</p>';
  }
}
//uploading image using javascript
function uploadPhoto() {
  const photoInput = document.getElementById('photoInput');
  const photoUrl = URL.createObjectURL(photoInput.files[0]);

  // Use of spread operator to add photoUrl to the uploadedImages array https://www.youtube.com/watch?v=pYI-UuZVtHI&pp=ygUYc3ByZWFkIG9wZXJhdG9yIHRvIGFycmF5
  uploadedImages = [...uploadedImages, photoUrl];

  // updating the likes and followers based on the user uploading
  followers += getRandomNumber(1, 10);
  likes += getRandomNumber(5, 25);
  updateProfile();

  // alerting based on each uploading photo
  alert('You now have ' + followers + ' followers and ' + likes + ' likes!');
}

// initualizing the profile with the provided username
updateProfile();