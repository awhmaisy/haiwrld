document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    const supabaseClient = supabase.createClient(config.SUPABASE_URL, config.SUPABASE_API_KEY);

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;
        const timestamp = new Date().toISOString();

        const commentObj = { name, comment, created_at: timestamp };
        await saveComment(commentObj);
        displayComment(commentObj);

        form.reset();
    });

    async function saveComment(comment) {
        const { data, error } = await supabaseClient
            .from('comments')
            .insert([comment]);

        if (error) console.error('Error saving comment: ', error);
    }

    async function loadComments() {
        const { data, error } = await supabaseClient
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error loading comments:', error);
        } else {
            data.forEach(comment => displayComment(comment));
        }
    }

    function displayComment(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.textContent = `${comment.name}: ${comment.comment} (${new Date(comment.created_at).toLocaleString()})`;
        commentsList.appendChild(commentDiv);
    }

    loadComments();
});

const config = {
    SUPABASE_API_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4YmZtY21zbW9rbmxkaW5zZGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyNTI3NDIsImV4cCI6MjAzNTgyODc0Mn0.u_XiHTSZeRYz0k2vlE3um4FhWBsqGR-uwg4aeDl-4VU',
    SUPABASE_URL: 'https://uxbfmcmsmoknldinsdan.supabase.co'
};

// Initialize Supabase
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_API_KEY);