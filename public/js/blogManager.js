const addBlog = document.querySelector('.new-blog-form');

const saveNewBlog = async (event) => {
    event.preventDefault();
    const blogTitle = document.querySelector('#new-blog-title').value.trim();
    const blogText = document.querySelector('#new-blog-text').value.trim();
    if (blogTitle && blogText) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ blogTitle, blogText }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
        console.log('past the response')
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create new post. Please try again.')
        }
    }
}


addBlog.addEventListener('submit', saveNewBlog);