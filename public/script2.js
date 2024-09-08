document.addEventListener('DOMContentLoaded', () => {
    fetch('/saved-papers-data')
        .then(response => response.json())
        .then(papers => {
            const results = document.getElementById('saved-papers');
            results.innerHTML = '';  // Clear previous results

            if (papers.length === 0) {
                // Display "No papers saved" message
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="6" style="text-align: center;">No papers saved</td>
                `;
                results.appendChild(row);
            } else {
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
                                <a href="#" class="delete-paper" data-paper-id="${paper.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M8 6v-2a2 2 0 0 1 4 0v2" transform="translate(2, 0)" />
                                        <path d="M19 6l-2 14H7L5 6"></path>
                                        <path d="M10 11v6"></path>
                                        <path d="M14 11v6"></path>
                                    </svg>
                                </a>
                            </div>
                        </td>
                    `;
                    results.appendChild(row);
                });

                document.querySelectorAll('.delete-paper').forEach(button => {
                    button.addEventListener('click', function(event) {
                        event.preventDefault(); // Prevent default anchor behavior
                        const paperId = this.getAttribute('data-paper-id');

                        // Call the deletePaper function to remove the paper
                        deletePaper(paperId, this.closest('tr'));
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error fetching saved papers:', error);
        });
});


function deletePaper(paperId, rowElement) {
    fetch(`/delete-paper/${paperId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Remove the row from the table
            rowElement.remove();

            // Check if the table is now empty and display the message if needed
            if (document.getElementById('saved-papers').children.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="6" style="text-align: center;">No papers saved</td>
                `;
                document.getElementById('saved-papers').appendChild(row);
            }
        }
    });
}