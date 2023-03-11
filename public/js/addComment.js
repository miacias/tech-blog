const addCommentBtn = document.querySelector('#add-comment');

const saveNewComment = async (event) => {
    event.preventDefault();
    console.log('hello new comment')
    const blogId = document.querySelector('.blog-post').id;
    const bloggerName = document.querySelector('.user').id;
    const commentText = document.querySelector('#new-comment-text').value.trim();
    const blogReaderId = document.querySelector('.comment-form').id;
    console.log(blogId, bloggerName, commentText, blogReaderId)
    if (blogId && bloggerName && commentText && blogReaderId) {
        const response = await fetch(`/api/${bloggerName}/blogs/${blogId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ commentText, blogReaderId }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create new comment. Please try again.')
        }
    }
};

addCommentBtn.addEventListener('submit', saveNewComment);