document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;
        const timestamp = new Date().toLocaleString();

        const commentObj = { name, comment, timestamp };
        saveComment(commentObj);
        displayComment(commentObj);

        form.reset();
    });

    function saveComment(comment) {
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : [];
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : [];
        comments.reverse(); // Reverse the order of comments
        comments.forEach(comment => displayComment(comment));
    }

    function displayComment(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.textContent = `${comment.name}: ${comment.comment} (${comment.timestamp})`;
        commentsList.appendChild(commentDiv);
    }

    loadComments();
});
