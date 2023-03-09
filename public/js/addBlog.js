const addBlogBtn = document.querySelector('.new-blog-form');

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
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create new post. Please try again.')
        }
    }
};

addBlogBtn.addEventListener('submit', saveNewBlog);