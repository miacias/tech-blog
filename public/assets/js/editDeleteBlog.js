// manage blogs
const deleteBlogBtn = document.querySelector('#delete-blog');
const editBlogBtn = document.querySelector('#edit-blog');

const deleteMyBlog = async (event) => {
    event.preventDefault();
    // verifies user wants to delete
    const areYouSure = confirm('Are you sure you want to delete this blog?');
    if (!areYouSure) {
        return;
    }
    const blogId = document.querySelector('.blog-post').id;
    const username = document.querySelector('.user').id;
    const response = await fetch(`/api/${username}/blogs/${blogId}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json'}
    });
    if (response.ok) {
        // returns user to their dashboard
        document.location.replace(`/${username}`);
    } else {
        alert('Failed to delete blog');
    }
};

const editMyBlog = async () => {
    // verifies user is satisfied with edits
    const areYouSure = confirm('Are you satisfied with your edits to this post?');
    if (!areYouSure) {
        return;
    }
    // collects values
    const username = document.querySelector('.user').id;
    const blogData = {
        id: document.querySelector('.blog-post').id,
        text_content: document.querySelector('[contenteditable=true]').textContent
    }
    // checks provided values
    if (blogData.id && blogData.text_content) {
        const response = await fetch(`/api/${username}/blogs/${blogData.id}`, {
            method: 'PUT',
            body: JSON.stringify({blogData}),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to update blog. Please try again.');
        }
    }
};

deleteBlogBtn.addEventListener('click', deleteMyBlog);
editBlogBtn.addEventListener('click', editMyBlog);