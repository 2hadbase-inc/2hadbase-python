window.RufflePlayer = window.RufflePlayer || {};

document.addEventListener('DOMContentLoaded', function () {

    // Ruffle
    const ruffle = window.RufflePlayer.newest();
    const objects = document.querySelectorAll("object, embed");
    objects.forEach(el => {
      const container = ruffle.createPlayer();
      el.replaceWith(container);
      container.load(el.getAttribute("data-swf") || el.getAttribute("src") || el.getAttribute("data") || el.querySelector("param[value]").getAttribute("value"));
    });
    document.querySelectorAll(".ruffle-player").forEach(el => {
        const swfUrl = el.getAttribute("data-swf");
        const player = ruffle.createPlayer();
        el.replaceWith(player);
        player.load(swfUrl);
    });

    // By Year Page
    const yearSelect = document.querySelector('#year-select');
    if (yearSelect) {
        yearSelect.addEventListener('change', (event) => {
            window.location.href = "/" + event.target.value
        });
    }

    // Authors page
    const authorSelect = document.querySelector('#author-select');
    if (authorSelect) {
        authorSelect.addEventListener('change', (event) => {
            authorId = event.target.value
            if (authorId) {
                // Get all posts
                const posts = document.querySelectorAll('#page-list article.post-entry');
    
                const postsCount = posts.length;
                let postsNotShown = 0;
    
                // Show/hide posts based on author
                posts.forEach(post => {
                    let postAuthor = post.querySelector('#page-list article.post-entry #post-author').textContent.toLowerCase().trim()
    
                    if (postAuthor === decodeURIComponent(authorId)) {
                        document.getElementById('page-list').style.display = 'block';
                        document.getElementById('no-posts-found').style.display = 'none';
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                        postsNotShown++;
                        if (postsNotShown === postsCount) {
                            document.getElementById('page-list').style.display = 'none';
                            document.getElementById('no-posts-found').style.display = 'block';
                        }
                    }
                });
    
                // Update URL without page reload
                const url = new URL(window.location);
                url.searchParams.set('author', authorId);
                window.history.pushState({}, '', url);
            } else {
                // If no author selected, show all posts
                const posts = document.querySelectorAll('.post-entry');
                posts.forEach(post => {
                    post.style.display = 'block';
                });
    
                // Remove author parameter from URL
                const url = new URL(window.location);
                url.searchParams.delete('author');
                window.history.pushState({}, '', url);
            }
        });
    }

    // Check URL parameters on page load
    const urlParams = new URLSearchParams(window.location.search);
    const authorParam = urlParams.get('author');
    if (authorParam) {
        authorSelect.value = authorParam;
        changeAuthor(authorParam);
    }

    // Authors page refresh button
    const btn = document.getElementById('refresh-btn');
    const spinner = document.getElementById('spinner');

    if (btn && spinner) {
        btn.addEventListener('click', () => {
            spinner.classList.add('spin');
            window.location.href = "/authors"
            setTimeout(() => {
                spinner.classList.remove('spin');
            }, 1000);
        });
    }

    // Single post share button
    const shareLink = document.getElementById('share-link');
    if (shareLink) {
        const notification = document.getElementById('notification');

        // Update href with current URL
        shareLink.href = window.location.href;

        // Handle click to copy to clipboard
        shareLink.addEventListener('click', function (e) {
            e.preventDefault();

            // Copy URL to clipboard
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    // Show notification
                    notification.classList.add('show');

                    // Hide notification after 2 seconds
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    }
});