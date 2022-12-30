let mainWrapper = document.getElementById('postWrapper');
let overlay = document.getElementById('overlay');
let popapContent = document.getElementById('content');
let closeIcon = document.getElementById('close');




function ajax(url, callback){
  let requist = new XMLHttpRequest();
  requist.open('GET', url);
  requist.addEventListener('load', function(){
    let responseData = JSON.parse(this.responseText);

  callback(responseData)
  })

  requist.send();
}

// POST DIV FUNCTION
function createPost(item){
const divWrapper = document.createElement('div');
divWrapper.classList.add('posts');
divWrapper.setAttribute('data-id',item.id);

let postId = document.createElement('h4');
postId.textContent = item.id;

let postTittle = document.createElement ('h2');
postTittle.textContent = item.title;

divWrapper.appendChild (postId);
divWrapper.appendChild(postTittle);
divWrapper.appendChild(popapContent);






// click on div addEvent
divWrapper.addEventListener('click', function(event) {
  let id = event.currentTarget.getAttribute('data-id');
  overlay.classList.add('active');
  closeIcon.classList.add('active');
  const servUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;  

  ajax(servUrl, function (responseData) {
    console.log(responseData);
    overlayDescription(responseData);
  });
 
  console.log(id);

});




mainWrapper.appendChild(divWrapper);
console.log(divWrapper);
}

//post review details
function overlayDescription(item) {
  let description = document.createElement("p");
  description.innerText = item.body;

  popapContent.appendChild(description);
}



 /// poppup Remove 
closeIcon.addEventListener('click', function(){
  overlay.classList.remove("active");
  closeIcon.classList.remove('active');
})

// main fun  
ajax('https://jsonplaceholder.typicode.com/posts', function(responseData){
  responseData.forEach(item => {
    createPost(item);
  });
});