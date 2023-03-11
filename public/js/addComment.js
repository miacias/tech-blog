const addCommentBtn = document.querySelector('#add-comment');

const saveNewComment = async (event) => {
    event.preventDefault();
    const commentText = document.querySelector('#new-comment-text').value.trim();
    const blogReader = document.querySelector('.comment-form').id;
    if (commentText && blogReader) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ commentText, blogReader }),
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