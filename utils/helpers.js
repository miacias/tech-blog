module.exports = {
    // formats date for handlebars views
    format_time: (date) => {
        const timestamp = new Intl.DateTimeFormat("en", {
            timeStyle: "short",
            dateStyle: "medium"
        }).format(date);
        return timestamp;
    }
};