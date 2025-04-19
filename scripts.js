document.addEventListener('DOMContentLoaded', () => {
    // Resource Library
    const resources = [
        { title: "Breathing Exercise", type: "video", description: "A guided breathing exercise to help you relax and reduce stress.", favorite: false, embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/enJyOTvEn4M?si=XRE9Y6z6rw6JzUBy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
        { title: "Understanding Anxiety", type: "video", description: "Learn about anxiety and how to manage it effectively.", favorite: false, embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/UR6ZUJsnV1E?si=Y_IPmsSUcwwydyp6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
        { title: "Mindfulness Meditation", type: "video", description: "A mindfulness meditation session to help you stay present and calm.", favorite: false, embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/ZToicYcHIOU?si=JbdQuL0BLL2fVRdM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
        { title: "Mental Health Awareness", type: "video", description: "An informative video about mental health awareness and its importance.", favorite: false, embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/y-ACcDIGi-c?si=AHxM1yvuXso_rSJ-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
        { title: "What is Mental Health?", type: "video", description: "A comprehensive explanation of mental health and its importance.", favorite: false, embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/G0zJGDokyWQ?si=qHRV6luzClgYC--x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
        { title: "Mental Health Wellness Tips", type: "video", description: "Practical tips for maintaining mental health and wellness.", favorite: false, embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/NQcYZplTXnQ?si=js1NaAF2s5dDQBh-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` },
    ];

    const resourceList = document.getElementById('resource-list');
    const searchInput = document.getElementById('search');
    const filterCategory = document.getElementById('filter-category');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = 6; // Set to 6 to display all videos on one page
    let currentPage = 1;

    // Display resources with pagination
    const displayResources = (filteredResources, page = 1) => {
        resourceList.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedResources = filteredResources.slice(start, end);

        if (paginatedResources.length === 0) {
            resourceList.innerHTML = '<p>No resources found. Try adjusting your search or filters.</p>';
            return;
        }

        paginatedResources.forEach((resource, index) => {
            const resourceItem = document.createElement('div');
            resourceItem.classList.add('resource-item');
            resourceItem.style.opacity = '0'; // Start with opacity 0 for fade-in effect
            resourceItem.style.transform = 'translateY(20px)'; // Start slightly below for slide-up effect
            resourceItem.innerHTML = `
                <h3>${resource.title}</h3>
                <div class="video-container">
                    ${resource.embedCode}
                </div>
                <p>${resource.description}</p>
                <button class="favorite-button" data-index="${start + index}">
                    ${resource.favorite ? '❤️' : '🤍'}
                </button>
            `;
            resourceList.appendChild(resourceItem);

            // Add fade-in and slide-up animation
            setTimeout(() => {
                resourceItem.style.opacity = '1';
                resourceItem.style.transform = 'translateY(0)';
            }, index * 100); // Stagger animations

            // Add favorite functionality
            resourceItem.querySelector('.favorite-button').addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                resources[index].favorite = !resources[index].favorite;
                e.target.textContent = resources[index].favorite ? '❤️' : '🤍';
                saveFavorites();
            });
        });

        // Update pagination buttons
        updatePagination(filteredResources.length, page);
    };

    // Save favorite resources to localStorage
    const saveFavorites = () => {
        localStorage.setItem('favoriteResources', JSON.stringify(resources.filter(resource => resource.favorite)));
    };

    // Update pagination buttons
    const updatePagination = (totalItems, currentPage) => {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.toggle('active', i === currentPage);
            button.addEventListener('click', () => {
                currentPage = i;
                filterResources();
            });
            pagination.appendChild(button);
        }
    };

    // Filter resources based on search and category
    const filterResources = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = filterCategory.value;
        const filteredResources = resources.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        displayResources(filteredResources, currentPage);
    };

    // Add event listeners for search and filter
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        filterResources();
    });
    filterCategory.addEventListener('change', () => {
        currentPage = 1;
        filterResources();
    });

    // Initial display of all resources
    displayResources(resources);

    // Chatbot Functionality
    const chatbot = document.getElementById('chatbot');
    const openChatbotButton = document.getElementById('open-chatbot');
    const closeChatbotButton = document.getElementById('close-chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendMessageButton = document.getElementById('send-message');

    openChatbotButton.addEventListener('click', () => {
        chatbot.style.display = 'block';
        chatbot.style.opacity = '0';
        chatbot.style.transform = 'translateY(20px)';
        setTimeout(() => {
            chatbot.style.opacity = '1';
            chatbot.style.transform = 'translateY(0)';
        }, 10);
    });

    closeChatbotButton.addEventListener('click', () => {
        chatbot.style.opacity = '0';
        chatbot.style.transform = 'translateY(20px)';
        setTimeout(() => {
            chatbot.style.display = 'none';
        }, 200);
    });

    const sendMessage = () => {
        const message = userInput.value.trim();
        if (message !== '') {
            // Display user message
            const userMessageElement = document.createElement('div');
            userMessageElement.classList.add('user');
            userMessageElement.textContent = `You: ${message}`;
            chatbotMessages.appendChild(userMessageElement);
            userInput.value = '';
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            // Simulate bot response (replace with actual API call)
            setTimeout(() => {
                const botMessageElement = document.createElement('div');
                botMessageElement.classList.add('bot');
                botMessageElement.textContent = `Serenity: I'm here to help! How can I assist you further?`;
                chatbotMessages.appendChild(botMessageElement);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1000);
        }
    };

    sendMessageButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Quizzes Section
    const anxietyQuiz = [
        {
            question: "How often do you feel nervous or anxious?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            points: [0, 1, 2, 3, 4]
        },
        {
            question: "Do you have trouble relaxing?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            points: [0, 1, 2, 3, 4]
        },
        {
            question: "Do you feel restless or on edge?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            points: [0, 1, 2, 3, 4]
        },
    ];

    const depressionQuiz = [
        {
            question: "How often do you feel sad or down?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            points: [0, 1, 2, 3, 4]
        },
        {
            question: "Do you have trouble sleeping or sleeping too much?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            points: [0, 1, 2, 3, 4]
        },
        {
            question: "Do you feel tired or have little energy?",
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
            points: [0, 1, 2, 3, 4]
        },
    ];

    const quizResults = document.getElementById('quiz-results');
    let currentQuiz = [];
    let userAnswers = [];

    const startQuiz = (quiz) => {
        currentQuiz = quiz;
        userAnswers = [];
        quizResults.innerHTML = '';
        displayQuestion(0);
    };

    const displayQuestion = (index) => {
        if (index >= currentQuiz.length) {
            showResults();
            return;
        }

        const question = currentQuiz[index];
        quizResults.innerHTML = `
            <h3>Question ${index + 1}</h3>
            <p>${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, i) => `
                    <button class="quiz-option" data-score="${question.points[i]}">${option}</button>
                `).join('')}
            </div>
        `;

        document.querySelectorAll('.quiz-option').forEach(button => {
            button.addEventListener('click', () => {
                userAnswers.push(parseInt(button.getAttribute('data-score')));
                displayQuestion(index + 1);
            });
        });
    };

    const showResults = () => {
        const totalScore = userAnswers.reduce((sum, score) => sum + score, 0);
        let feedback = '';
        let recommendations = [];

        if (totalScore <= 3) {
            feedback = "Your results suggest minimal symptoms. Keep practicing self-care!";
            recommendations = ["Practice mindfulness daily.", "Stay connected with loved ones."];
        } else if (totalScore <= 6) {
            feedback = "Your results suggest mild symptoms. Consider seeking support.";
            recommendations = ["Try relaxation techniques.", "Consider talking to a therapist."];
        } else if (totalScore <= 9) {
            feedback = "Your results suggest moderate symptoms. It may be helpful to talk to a professional.";
            recommendations = ["Reach out to a mental health professional.", "Join a support group."];
        } else {
            feedback = "Your results suggest severe symptoms. Please seek professional help.";
            recommendations = ["Contact a mental health professional immediately.", "Reach out to a trusted friend or family member."];
        }

        quizResults.innerHTML = `
            <h3>Quiz Results</h3>
            <p>${feedback}</p>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
            <button id="retake-quiz" class="cta-button">Retake Quiz</button>
        `;

        document.getElementById('retake-quiz').addEventListener('click', () => {
            startQuiz(currentQuiz);
        });
    };

    document.getElementById('start-anxiety-quiz').addEventListener('click', () => {
        startQuiz(anxietyQuiz);
    });

    document.getElementById('start-depression-quiz').addEventListener('click', () => {
        startQuiz(depressionQuiz);
    });
});