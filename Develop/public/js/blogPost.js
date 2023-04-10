
const replyButtonHandler = async (event) => {

    event.preventDefault();

    const body = document.querySelector('#comment-body').value.trim();
    
    if (body){
  
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            body,
            blog_post_id:id
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/blogpost/${id}`);
      } else {
        alert('Failed to add comment');
      }
    }
  }
};

  
document
  .querySelector('#replyBtn')
  .addEventListener('click', replyButtonHandler);