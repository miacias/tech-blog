module.exports = {
    // formats date for handlebars views
    format_time: (date) => {
        const timestamp = new Intl.DateTimeFormat("en", {
            timeStyle: "short",
            dateStyle: "medium"
        }).format(date);
        return timestamp;
    },
    // verifies if blogReader is the same person as blogAuthor
    blogMatch: (blogReader, blogAuthor) => {
        // console.log(blogReader, blogAuthor)
        if (blogReader === blogAuthor) {
            return true;
        } else {
            return false;
        }
    },
    commentMatch: (blogReader, commentAuthor) => {
        console.log(blogReader, commentAuthor)
        if (blogReader === commentAuthor) {
            return true;
        } else {
            return false;
        }
    },
    addCommentMatch: (blogReader, blogAuthor) => {
        if (blogReader !== blogAuthor) {
            return true;
        } else {
            return false;
        }
    }
};