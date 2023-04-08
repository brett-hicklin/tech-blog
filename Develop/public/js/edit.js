const updateBlogPostButtonHandler = async (event) => {
    console.log('triggered by submit')
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
    

    console.log(title)
    console.log(body)
    console.log(event.target.hasAttribute('data-id'))


    if (title && body){
  
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogposts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post');
      }
    }
  }
};

  
document
  .querySelector('#submit-edit')
  .addEventListener('click', updateBlogPostButtonHandler);