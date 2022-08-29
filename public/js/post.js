const commentFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the comment form
  const message = document.querySelector("#comment-message").value.trim();
  const post_id = document.querySelector("#comment-post_id").value.trim();

  if (message && post_id) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({ post_id, message }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);

//Updating post
const updatePost = async (event) => {
  event.preventDefault();

  // Collect values from the comment form
  const description = document.querySelector("#update-message").value.trim();
  const id = document.querySelector("#update-post_id").value.trim();

  if (description && id) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/posts/updatepost/", {
      method: "POST",
      body: JSON.stringify({ id, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".update-form").addEventListener("submit", updatePost);

const queryString = window.location.search;

if (queryString.includes("?edit=1")) {
  document.querySelector("#normal-mode").style.display = "none";
} else {
  document.querySelector("#edit-mode").style.display = "none";
}
