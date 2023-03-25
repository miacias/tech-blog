// manage comments
const deleteCommentBtn = document.querySelectorAll('.delete-comment');
const editCommentBtn = document.querySelectorAll('.edit-comment');

// allows readers to delete their own comments
const deleteMyComment = async (event) => {
    event.preventDefault();
    // verifies user wants to delete
    const areYouSure = confirm('Are you sure you want to delete this comment?');
    if (areYouSure) {
        // collects values for URL params and data for database
        const blogId = document.querySelector('.blog-post').id;
        const bloggerUsername = document.querySelector('.user').id;
        const commentId = document.querySelector('.comment-date').id;
        // checks provided values
        if (blogId && bloggerUsername && commentId) {
            const response = await fetch(`/api/${bloggerUsername}/blogs/${blogId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' }
            });
            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to delete comment');
            }
        }
    }
};

// allows readers to edit their own comments
const editMyComment = async (event) => {
    console.log('hello edit')
    event.preventDefault();
    // collects values from blog for URL params
    const blogId = document.querySelector('.blog-post').id;

    console.log(blogId)
    const bloggerName = document.querySelector('.user').id;
    const commentEdits = {
        id: document.querySelector('.comment-id').id,
        text_content: document.querySelector("[contenteditable]").textContent
    };
    console.log(commentEdits)
    if (commentEdits.id && commentEdits.text_content) {
        const response = await fetch(`/api/${bloggerName}/blogs/${blogId}/comments/${commentEdits.id}`, {
            method: 'PUT',
            body: JSON.stringify({commentEdits}),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to update comment. Please try again.');
        }
    }
};

// deleteCommentBtn.addEventListener('click', deleteMyComment);
// editCommentBtn.addEventListener('click', editMyComment);

editCommentBtn.forEach(btn => btn.addEventListener('click', editMyComment));