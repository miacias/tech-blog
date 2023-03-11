// manage blogs
const deleteBlogBtn = document.querySelector('#delete-blog');
const editBlogBtn = document.querySelector('#edit-blog');

const deleteMyBlog = async (event) => {
    event.preventDefault();
    // verifies user wants to delete
    const areYouSure = confirm('Are you sure you want to delete this blog?');
    if (areYouSure) {
        const blogId = document.querySelector('.blog-post').id;
        const username = document.querySelector('.user').id;
        const response = await fetch(`/api/${username}/blogs/${blogId}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json'}
        });
        if (response.ok) {
            
            document.location.replace(`/${username}`);
        } else {
            alert('Failed to delete blog');
        }
    }
};

const editMyBlog = async () => {
    console.log('hello edit')

};

deleteBlogBtn.addEventListener('click', deleteMyBlog);
editBlogBtn.addEventListener('click', editMyBlog);