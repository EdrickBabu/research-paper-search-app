// Function to load all papers
function loadAllPapers() {
    fetch('/search') // Fetch all papers
        .then(response => response.json())
        .then(papers => {
            const results = document.getElementById('results');
            results.innerHTML = '';  // Clear previous results

            papers.forEach(paper => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>
                        <div class="widget-26-job-title">
                            <a href="#">${paper.title}</a>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <p class="type m-0">${paper.authors}</p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <p class="type m-0">${paper.year}</p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-category bg-soft-base">
                            <i class="indicator bg-base"></i>
                            <span>${paper.category}</span>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <p class="type m-0">Citations: ${paper.citations}</p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-starred">
                            <a href="#" class="save-star ${paper.isSaved ? 'starred' : ''}" data-paper-id="${paper.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16z"></path>
</svg>

                            </a>
                        </div>
                    </td>
                `;

                results.appendChild(row);
            });

            // Add event listeners to the newly added save stars
            document.querySelectorAll('.save-star').forEach(star => {
                star.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default anchor behavior
                    const paperId = this.getAttribute('data-paper-id');
                    savePaper(paperId, this); // Call function to save the paper
                });
            });
        })
        .catch(error => {
            console.error('Error fetching papers:', error);
        });
}


// Function to search papers
function searchPapers(event) {
    event.preventDefault();

    const searchTerm = document.getElementById('search').value;

    fetch(`/search?query=${searchTerm}`)
        .then(response => response.json())
        .then(papers => {
            const results = document.getElementById('results');
            results.innerHTML = '';  // Clear previous results

            papers.forEach(paper => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>
                        <div class="widget-26-job-title">
                            <a href="#">${paper.title}</a>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <p class="type m-0">${paper.authors}</p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <p class="type m-0">${paper.year}</p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-category bg-soft-base">
                            <i class="indicator bg-base"></i>
                            <span>${paper.category}</span>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-info">
                            <p class="type m-0">Citations: ${paper.citations}</p>
                        </div>
                    </td>
                    <td>
                        <div class="widget-26-job-starred">
                            <a href="#" class="save-star ${paper.isSaved ? 'starred' : ''}" data-paper-id="${paper.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16z"></path>
</svg>

                            </a>
                        </div>
                    </td>
                `;

                results.appendChild(row);
            });

            // Add event listeners to the newly added save stars
            document.querySelectorAll('.save-star').forEach(star => {
                star.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent default anchor behavior
                    const paperId = this.getAttribute('data-paper-id');
                    savePaper(paperId, this); // Call function to save the paper
                });
            });
        })
        .catch(error => {
            console.error('Error fetching papers:', error);
        });
}

function savePaper(paperId, starElement) {
    fetch(`/save/${paperId}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Change star to filled
            const svg = starElement.querySelector('svg');
            svg.innerHTML = `
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16z" fill="#fd8b2c"></path>
            `;
        }
    })
    .catch(error => {
        console.error('Error saving paper:', error);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    loadAllPapers();  // Load all papers on page load

    document.getElementById('search-form').addEventListener('submit', searchPapers);
});