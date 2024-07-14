document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase URL or API key is missing');
        return;
    }

    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

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