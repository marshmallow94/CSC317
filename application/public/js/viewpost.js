const appendComment = (commentObj) => {
    let textarea = document.getElementById("comment-text");
    textarea.value = "";
    let newCommentList = document.createElement("div");
    newCommentList.setAttribute("class", "comment-list");
    let commentFirstChild = document.createElement("div");
    newCommentList.appendChild(commentFirstChild);
    let commentSecondChild = document.createElement("div");
    commentSecondChild.setAttribute("class", "comment-text");
    commentSecondChild.innerHTML = commentObj.comment;
    newCommentList.appendChild(commentSecondChild);
    let authorName = document.createElement("span");
    authorName.innerHTML = `@${commentObj.username}`;
    authorName.setAttribute("class", "color-text");
    let createdAt = document.createElement("span");
    createdAt.innerHTML = new Date().toLocaleString();
    commentFirstChild.appendChild(authorName);
    commentFirstChild.appendChild(createdAt);
    let commentDiv = document.getElementById("commentDiv");
    commentDiv.prepend(newCommentList);
  };
  
  document
    .getElementById("submit-comment")
    .addEventListener("click", function (event) {
      const postId = event.currentTarget.dataset.postid;
      const comment = document.getElementById("comment-text").value;
      fetch("/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          comment,
          postId,
        }),
      })
        .then((response) => response.json())
        .then((res_json) => {
          appendComment(res_json.data);
          Toastify({
            text: "Your comment successfuly created",
            duration: 3000,
            position: "center",
            stopOnFocus: true,
          }).showToast();
        })
        .catch((err) => {
          if (err) {
            Toastify({
              text: "Failed to created comment",
              duration: 3000,
              position: "center",
              stopOnFocus: true,
              backgroundColor: "#f44336",
            }).showToast();
          }
        });
    });
  