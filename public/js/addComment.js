const addCommentBtn = document.querySelector('#add-comment');

const saveNewComment = async (event) => {
    event.preventDefault();
    // collects values for URL params and data for database
    const blogId = document.querySelector('.blog-post').id;
    const bloggerName = document.querySelector('.user').id;
    const commentText = document.querySelector('#new-comment-text').value.trim();
    const blogReaderId = document.querySelector('.comment-form').id;
    // checks user-provided values
    if (commentText && blogReaderId) {
        const response = await fetch(`/api/${bloggerName}/blogs/${blogId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ commentText, blogReaderId }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
        if (response.ok) {
            window.location.reload();
        } else {
            alert('Failed to create new comment. Please try again.')
        }
    }
};

addCommentBtn.addEventListener('click', saveNewComment);