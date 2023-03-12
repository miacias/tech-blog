const addCommentBtn = document.querySelector('#add-comment');

const saveNewComment = async (event) => {
    event.preventDefault();
    // collects values for URL params and data for database
    const blogId = document.querySelector('.blog-post').id;
    const bloggerName = document.querySelector('.user').id;
    const commentText = document.querySelector('#new-comment-text').value.trim();
    const commenterID = document.querySelector('.comment-form').id;
    // checks user-provided values
    if (commentText && commenterID) {
        const response = await fetch(`/api/${bloggerName}/blogs/${blogId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ commentText, commenterID }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create new comment. Please try again.');
        }
    }
};

addCommentBtn.addEventListener('click', saveNewComment);