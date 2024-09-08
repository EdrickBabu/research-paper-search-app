const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Store papers in-memory
let savedPaperIds = [];

// Search route (you can replace the dummy data with real API later)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});

app.get('/search', (req, res) => {
    const query = req.query.query;
    let dummyPapers = [
        { id: 1, title: 'AI in Healthcare', authors: 'John Doe', year: 2021, category: 'Software', citations: 15 },
        { id: 2, title: 'Machine Learning Basics', authors: 'Jane Smith', year: 2020, category: 'Software', citations: 30 },
        { id: 3, title: 'Quantum Computing Advances', authors: 'Alice Johnson', year: 2022, category: 'Quantum Computing', citations: 25 },
        { id: 4, title: 'Data Privacy in the Cloud', authors: 'Bob Brown', year: 2019, category: 'Cybersecurity', citations: 40 },
        { id: 5, title: 'Neural Networks for Image Recognition', authors: 'Eve Davis', year: 2023, category: 'Artificial Intelligence', citations: 50 },
        { id: 6, title: 'Blockchain Technology Overview', authors: 'Charlie White', year: 2021, category: 'Blockchain', citations: 10 },
        { id: 7, title: 'Advancements in Natural Language Processing', authors: 'Mallory Green', year: 2022, category: 'Artificial Intelligence', citations: 35 },
        { id: 8, title: 'Robotics in Manufacturing', authors: 'David Lee', year: 2018, category: 'Robotics', citations: 20 },
        { id: 9, title: 'Ethical Implications of AI', authors: 'Grace Adams', year: 2020, category: 'Ethics', citations: 12 },
        { id: 10, title: 'Big Data Analytics for Business', authors: 'Oliver Martinez', year: 2021, category: 'Data Science', citations: 45 },
        { id: 11, title: 'Autonomous Vehicles and AI', authors: 'Sophia Kim', year: 2022, category: 'Automotive Technology', citations: 22 },
        { id: 12, title: 'Advanced Algorithms for Data Mining', authors: 'Liam Taylor', year: 2019, category: 'Data Science', citations: 18 },
        { id: 13, title: 'Cybersecurity Threats and Mitigation', authors: 'Isabella Brown', year: 2021, category: 'Cybersecurity', citations: 28 },
        { id: 14, title: 'IoT and Smart Cities', authors: 'Ethan Wilson', year: 2022, category: 'Internet of Things', citations: 33 },
        { id: 15, title: 'Virtual Reality in Education', authors: 'Ava Moore', year: 2023, category: 'Education Technology', citations: 16 },
        { id: 16, title: 'AI-Powered Healthcare Diagnostics', authors: 'Mason Anderson', year: 2020, category: 'Healthcare', citations: 29 },
        { id: 17, title: 'Genetic Algorithms for Optimization', authors: 'Emma Thomas', year: 2021, category: 'Optimization', citations: 27 },
        { id: 18, title: 'Advanced Techniques in Computer Vision', authors: 'James Scott', year: 2022, category: 'Computer Vision', citations: 24 },
        { id: 19, title: 'Energy-Efficient Computing', authors: 'Olivia Harris', year: 2019, category: 'Energy Efficiency', citations: 19 },
        { id: 20, title: 'The Future of Augmented Reality', authors: 'Benjamin Clark', year: 2023, category: 'Augmented Reality', citations: 21 }
    ]
    ;

    if (query) {
        dummyPapers = dummyPapers.filter(dummyPaper => dummyPaper.title.toLowerCase().includes(query.toLowerCase()));
    }
    // Include saved status in the response
    const papersWithSavedStatus = dummyPapers.map(paper => ({
        ...paper,
        isSaved: savedPaperIds.includes(paper.id)
    }));
    console.log(papersWithSavedStatus);
    res.json(papersWithSavedStatus);
});

// Serve saved papers HTML
app.get('/saved-papers', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'saved_papers.html'));
});


// Handle save request
app.post('/save/:id', (req, res) => {
    const paperId = parseInt(req.params.id, 10);
    if (!savedPaperIds.includes(paperId)) {
        savedPaperIds.push(paperId);
    }
    res.json({ success: true });
});



app.get('/saved-papers-data', (req, res) => {
    // Dummy papers data
    const allPapers = [
        { id: 1, title: 'AI in Healthcare', authors: 'John Doe', year: 2021, category: 'Software', citations: 15 },
        { id: 2, title: 'Machine Learning Basics', authors: 'Jane Smith', year: 2020, category: 'Software', citations: 30 },
        { id: 3, title: 'Quantum Computing Advances', authors: 'Alice Johnson', year: 2022, category: 'Quantum Computing', citations: 25 },
        { id: 4, title: 'Data Privacy in the Cloud', authors: 'Bob Brown', year: 2019, category: 'Cybersecurity', citations: 40 },
        { id: 5, title: 'Neural Networks for Image Recognition', authors: 'Eve Davis', year: 2023, category: 'Artificial Intelligence', citations: 50 },
        { id: 6, title: 'Blockchain Technology Overview', authors: 'Charlie White', year: 2021, category: 'Blockchain', citations: 10 },
        { id: 7, title: 'Advancements in Natural Language Processing', authors: 'Mallory Green', year: 2022, category: 'Artificial Intelligence', citations: 35 },
        { id: 8, title: 'Robotics in Manufacturing', authors: 'David Lee', year: 2018, category: 'Robotics', citations: 20 },
        { id: 9, title: 'Ethical Implications of AI', authors: 'Grace Adams', year: 2020, category: 'Ethics', citations: 12 },
        { id: 10, title: 'Big Data Analytics for Business', authors: 'Oliver Martinez', year: 2021, category: 'Data Science', citations: 45 },
        { id: 11, title: 'Autonomous Vehicles and AI', authors: 'Sophia Kim', year: 2022, category: 'Automotive Technology', citations: 22 },
        { id: 12, title: 'Advanced Algorithms for Data Mining', authors: 'Liam Taylor', year: 2019, category: 'Data Science', citations: 18 },
        { id: 13, title: 'Cybersecurity Threats and Mitigation', authors: 'Isabella Brown', year: 2021, category: 'Cybersecurity', citations: 28 },
        { id: 14, title: 'IoT and Smart Cities', authors: 'Ethan Wilson', year: 2022, category: 'Internet of Things', citations: 33 },
        { id: 15, title: 'Virtual Reality in Education', authors: 'Ava Moore', year: 2023, category: 'Education Technology', citations: 16 },
        { id: 16, title: 'AI-Powered Healthcare Diagnostics', authors: 'Mason Anderson', year: 2020, category: 'Healthcare', citations: 29 },
        { id: 17, title: 'Genetic Algorithms for Optimization', authors: 'Emma Thomas', year: 2021, category: 'Optimization', citations: 27 },
        { id: 18, title: 'Advanced Techniques in Computer Vision', authors: 'James Scott', year: 2022, category: 'Computer Vision', citations: 24 },
        { id: 19, title: 'Energy-Efficient Computing', authors: 'Olivia Harris', year: 2019, category: 'Energy Efficiency', citations: 19 },
        { id: 20, title: 'The Future of Augmented Reality', authors: 'Benjamin Clark', year: 2023, category: 'Augmented Reality', citations: 21 }
    ]
    ;

    // Filter papers to include only those with IDs in the savedPaperIds list
    const savedPapers = allPapers.filter(paper => savedPaperIds.includes(paper.id));
    
    res.json(savedPapers);
});


app.delete('/delete-paper/:id', (req, res) => {
    const paperId = parseInt(req.params.id, 10);

    // Remove the paper ID from the savedPaperIds array
    const index = savedPaperIds.indexOf(paperId);
    if (index !== -1) {
        savedPaperIds.splice(index, 1);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
