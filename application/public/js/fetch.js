

function buildCardsUsinJSAPI(containter, data) {
    let cardDiv = document.createElement("div"); //create div element
    cardDiv.addEventListener('click', function(ev){
      console.log(ev.currentTarget);
        let elem = ev.target.classList.contains("post-card") ? ev.target: ev.target.parentNode;
        elem.classList.add("removed");
        setTimeout(()=>{
          elem.remove();
          document.getElementById("count").innerHTML = document.getElementsByClassName("post-card").length;
        }, 1000)
    })
    cardDiv.setAttribute("class", "post-card"); //set class HTML attribute 
    let imgDiv = document.createElement("img"); //create img element
    imgDiv.setAttribute("src", data.thumbnailUrl); //set src HTML attribute
    imgDiv.setAttribute("class", "post-img"); //set class HTML attribute
    let infoDiv = document.createElement("div"); //create div element
    // infoDiv.setAttribute("class", "post-info"); //set class HTML attribute
    let titleP = document.createElement("p"); //create p element
    titleP.setAttribute("class", "post-title"); //set class HTML attribute
    titleP.appendChild(document.createTextNode(data.title)); //adding a text node to the p tag
    // infoDiv.appendChild(titleP) // add the p tag to prod-info div
    cardDiv.appendChild(imgDiv) // add the img tag to product-card div
    cardDiv.appendChild(titleP); // add the img tag to product-card div
    containter.appendChild(cardDiv); // add product-card div to prdouct list div
  }
  

  function fetchPhotos() {
    console.log('hi')
    // where we will get products from
    var url = "https://jsonplaceholder.typicode.com/albums/2/photos";
    fetch(url)
      .then((response) => { 
        return response.json();
      })
      .then((data) => {
        //get product-list div
        let containerDiv = document.getElementById("list");
        //get the array of products from data json object
        let photos = data;
        //create a document Fragment (https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment)
        let containerFragment = document.createDocumentFragment();
        //for each product , build a card HTML element
        photos.forEach((photo) => {
          buildCardsUsinJSAPI(containerFragment, photo);
        });
        //add the container fragment to DOM(the product-list div)
        containerDiv.appendChild(containerFragment);

        let count = document.getElementById("count");
        count.innerHTML = data.length;
        console.log(count);
      })
      .catch((error) => {
        console.log(error);
      });
  
  }
  fetchPhotos();
  