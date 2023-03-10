module.exports = {
    // formats date for handlebars views
    format_time: (date) => {
        const timestamp = new Intl.DateTimeFormat("en", {
            timeStyle: "short",
            dateStyle: "medium"
        }).format(date);
        return timestamp;
    },
    // if reader is blog author, can edit/delete blog
    blogMatch: (blogReader, blogAuthor) => {
        if (blogReader === blogAuthor) {
            return true;
        } else {
            return false;
        }
    },
    // if reader is comment author, can edit/delete comments
    commentMatch: (blogReader, commentAuthor) => {
        // console.log(blogReader, commentAuthor)
        if (blogReader === commentAuthor) {
            return true;
        } else {
            return false;
        }
    },
    // if reader is blog author, can not add comments
    addCommentMatch: (blogReader, blogAuthor) => {
        if (blogReader !== blogAuthor) {
            return true;
        } else {
            return false;
        }
    },
    // if no blogs, "consider writing first blog"
    hasNoBlogs: (blogLength) => {
        if (blogLength) {
            return false;
        } else {
            return true;
        }
    },
    // if no comments or no matching commentAuthor, hide JS file
    hasNoComments: (commentLength, blogReader, commentsList) => {
        // if no comments, hide JS file
        if (!commentLength) {
            return false;
        } else {
            // if one of the comments is written by current reader, show JS file
            const pass = commentsList.map((comment) => {
                const username = comment.user.username;
                if (username === blogReader) {
                    return true;
                }
                return false;
            })
            if (pass) {
                return true;
            } else {
                // if no match, hide JS file
                return false;
            }
        }
    },
};