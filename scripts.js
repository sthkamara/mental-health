document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Resource Library with articles and podcasts
    const resources = [
        // Videos (your existing content)
        { 
            title: "Breathing Exercise", 
            type: "video", 
            description: "A guided breathing exercise to help you relax and reduce stress.", 
            favorite: false, 
            embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/enJyOTvEn4M?si=XRE9Y6z6rw6JzUBy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` 
        },
        { 
            title: "Understanding Anxiety", 
            type: "video", 
            description: "Learn about anxiety and how to manage it effectively.", 
            favorite: false, 
            embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/UR6ZUJsnV1E?si=Y_IPmsSUcwwydyp6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` 
        },
        { 
            title: "Mindfulness Meditation", 
            type: "video", 
            description: "A mindfulness meditation session to help you stay present and calm.", 
            favorite: false, 
            embedCode: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/ZToicYcHIOU?si=JbdQuL0BLL2fVRdM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` 
        },
        
        // Articles
        { 
            title: "10 Ways to Reduce Stress Daily", 
            type: "article", 
            description: "Practical strategies to incorporate stress reduction into your everyday life.", 
            favorite: false, 
            url: "https://www.helpguide.org/articles/stress/stress-management.htm", 
            author: "Jane Smith" 
        },
        { 
            title: "Understanding Depression: A Comprehensive Guide", 
            type: "article", 
            description: "Learn about the signs, symptoms, and treatments for depression.", 
            favorite: false, 
            url: "https://www.nimh.nih.gov/health/topics/depression", 
            author: "National Institute of Mental Health" 
        },
        { 
            title: "The Science of Mindfulness", 
            type: "article", 
            description: "How mindfulness practices change your brain and improve mental health.", 
            favorite: false, 
            url: "https://www.mindful.org/the-science-of-mindfulness/", 
            author: "David Johnson" 
        },
        
        // Podcasts - Updated with correct embed codes
        { 
            title: "The Happiness Lab", 
            type: "podcast", 
            description: "Yale professor Dr. Laurie Santos reveals what psychological research says about happiness.", 
            favorite: false, 
            embedCode: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/show/3i5TCKhc6GY42pOWkpWveG?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
            host: "Dr. Laurie Santos" 
        },
        { 
            title: "The Mental Illness Happy Hour", 
            type: "podcast", 
            description: "Honest conversations about mental health struggles with comedians and artists.", 
            favorite: false, 
            embedCode: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/show/1ax4naBUwDvyB1YDRugdZo?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
            host: "Paul Gilmartin" 
        },
        { 
            title: "Ten Percent Happier", 
            type: "podcast", 
            description: "Dan Harris explores meditation after his on-air panic attack.", 
            favorite: false, 
            embedCode: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/6JyVD4vP80nDBvFkatUteL?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
            host: "Dan Harris" 
        }
        
    ]; 

    // Rest of your code remains exactly the same...
    const resourceList = document.getElementById('resource-list');
    const searchInput = document.getElementById('search');
    const filterCategory = document.getElementById('filter-category');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = 6;
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
            resourceItem.style.opacity = '0';
            resourceItem.style.transform = 'translateY(20px)';
            
            // Different HTML structure based on resource type
            if (resource.type === 'video') {
                resourceItem.innerHTML = `
                    <div class="resource-header">
                        <span class="resource-type-badge video">Video</span>
                        <h3>${resource.title}</h3>
                    </div>
                    <div class="video-container">
                        ${resource.embedCode}
                    </div>
                    <p>${resource.description}</p>
                    <button class="favorite-button" data-index="${start + index}">
                        ${resource.favorite ? '❤️' : '🤍'}
                    </button>
                `;
            } else if (resource.type === 'article') {
                resourceItem.innerHTML = `
                    <div class="resource-header">
                        <span class="resource-type-badge article">Article</span>
                        <h3>${resource.title}</h3>
                    </div>
                    <div class="article-preview">
                        <p>${resource.description}</p>
                        <p class="author">By ${resource.author}</p>
                        <a href="${resource.url}" target="_blank" class="read-article">Read Article →</a>
                    </div>
                    <button class="favorite-button" data-index="${start + index}">
                        ${resource.favorite ? '❤️' : '🤍'}
                    </button>
                `;
            } else if (resource.type === 'podcast') {
                resourceItem.innerHTML = `
                    <div class="resource-header">
                        <span class="resource-type-badge podcast">Podcast</span>
                        <h3>${resource.title}</h3>
                    </div>
                    <div class="podcast-container">
                        ${resource.embedCode}
                    </div>
                    <p>${resource.description}</p>
                    <p class="host">Hosted by ${resource.host}</p>
                    <button class="favorite-button" data-index="${start + index}">
                        ${resource.favorite ? '❤️' : '🤍'}
                    </button>
                `;
            }
            
            resourceList.appendChild(resourceItem);

            setTimeout(() => {
                resourceItem.style.opacity = '1';
                resourceItem.style.transform = 'translateY(0)';
            }, index * 100);

            resourceItem.querySelector('.favorite-button').addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                resources[index].favorite = !resources[index].favorite;
                e.target.textContent = resources[index].favorite ? '❤️' : '🤍';
                saveFavorites();
            });
        });

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
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm) || 
                                 resource.description.toLowerCase().includes(searchTerm);
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

    // Rest of your existing code (chatbot, quizzes) remains the same...
}); 

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

    // const sendMessage = () => {
    //     const message = userInput.value.trim();
    //     if (message !== '') {
    //         // Display user message
    //         const userMessageElement = document.createElement('div');
    //         userMessageElement.classList.add('user');
    //         userMessageElement.textContent = `You: ${message}`;
    //         chatbotMessages.appendChild(userMessageElement);
    //         userInput.value = '';
    //         chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    //         // Simulate bot response (replace with actual API call)
    //         setTimeout(() => {
    //             const botMessageElement = document.createElement('div');
    //             botMessageElement.classList.add('bot');
    //             botMessageElement.textContent = `Serenity: I'm here to help! How can I assist you further?`;
    //             chatbotMessages.appendChild(botMessageElement);
    //             chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    //         }, 1000);
    //     }
    // };

    const sendMessage = async () => {
        const message = userInput.value.trim();
        console.log("user input", message); // display user input in console
        if (message !== '') {
            // Display user message
            const userMessageElement = document.createElement('div');
            userMessageElement.classList.add('user');
            userMessageElement.textContent = `${message}`;
            chatbotMessages.appendChild(userMessageElement);
            userInput.value = '';
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            console.log('[Debug] Displayed user message'); // Log user message

            // Show loading indicator
            const loadingElement = document.createElement('div');
            loadingElement.classList.add('bot');
            loadingElement.textContent = `...`;
            chatbotMessages.appendChild(loadingElement);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            console.log('[Debug] Displayed loading indicator'); // Log loading indicator

            // Make API call to backend
            try {
                console.log('[Debug] Sending POST request to backend...');
                const response = await fetch('https://public-endpoint.onrender.com/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                    mode: 'cors',
                });

                console.log('[Debug] Response status:', response.status); // Log response status
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }

                const data = await response.json();
                console.log('[Debug] Response JSON:', data); // Log response JSON
                const botReply = data.text || 'Sorry, I could not process your request.';

                chatbotMessages.removeChild(loadingElement);
                const botMessageElement = document.createElement('div');
                botMessageElement.classList.add('bot');
                botMessageElement.textContent = `Serenity: ${botReply}`;
                chatbotMessages.appendChild(botMessageElement);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                console.log('[Debug] Displayed bot reply');

            } catch (error) {
                console.error('Error:', error);
                chatbotMessages.removeChild(loadingElement);
                const botMessageElement = document.createElement('div');
                botMessageElement.classList.add('bot');
                botMessageElement.textContent = `Serenity: Oops, something went wrong. Please try again.`;
                chatbotMessages.appendChild(botMessageElement);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
        } else {
            console.warn('[Warning] Empty message, ignoring send.');
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
    {
        question: "Do you avoid certain places or situations because they make you anxious?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you experience sudden feelings of panic or fear?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you overthink plans or scenarios in an attempt to avoid anxiety?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel irritable or easily annoyed when you're anxious?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you find it hard to stop worrying about things?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel tense or physically uncomfortable in your body?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you ruminate on past conversations or events?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel overwhelmed by daily tasks or responsibilities?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you use distractions (e.g., TV, phone) to avoid dealing with anxiety?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you wake up feeling anxious without a clear reason?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like something bad is going to happen?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you have difficulty controlling your worry?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you avoid social interactions because of fear or discomfort?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like your anxiety interferes with your daily life?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you experience physical symptoms like sweating, trembling, or a racing heart when you’re anxious?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you worry excessively about what others think of you?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you have trouble concentrating due to anxiety?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    }
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
    {
        question: "Have you lost interest in activities you used to enjoy?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel worthless or guilty about things that aren’t your fault?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you have difficulty concentrating or making decisions?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you notice changes in your appetite or weight without trying?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like you’re moving or thinking slower than usual?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel restless or agitated more than usual?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you have thoughts of death or suicide?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel disconnected from friends and family?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like nothing will ever get better?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you cry frequently or unexpectedly?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you struggle to find joy in everyday moments?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like a burden to others?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you isolate yourself from social interactions?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like you’ve lost your sense of purpose?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel physically heavy or weighed down emotionally?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you avoid responsibilities because you feel overwhelmed?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like you’re just going through the motions of life?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    }
];

const stressQuiz = [
    {
        question: "How often do you feel overwhelmed by your responsibilities?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you find it hard to relax or unwind at the end of the day?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like there’s never enough time to get everything done?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you experience headaches, muscle tension, or stomach issues due to stress?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel irritable or angry more often than usual?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you have trouble focusing on tasks because of stress?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like you’re constantly rushing or under pressure?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like you’re juggling too many things at once?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you use unhealthy coping mechanisms (e.g., alcohol, overeating) to deal with stress?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like your stress is affecting your relationships?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like you can’t say “no” to additional responsibilities?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like you’re always anticipating problems or worst-case scenarios?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel exhausted or burned out from stress?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you have trouble sleeping because of racing thoughts?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like you’re not meeting your own expectations?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like you don’t have control over your life?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like stress is affecting your physical health?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you avoid making decisions because of stress?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like you’re unable to enjoy leisure time?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    },
    {
        question: "Do you feel like stress is interfering with your work or school performance?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        points: [0, 1, 2, 3, 4]
    }  
];

// Quiz Logic
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

    const progressPercentage = ((index + 1) / currentQuiz.length) * 100;

    const question = currentQuiz[index];
    quizResults.innerHTML = `
        <h3>Question ${index + 1} of ${currentQuiz.length}</h3>
        <div class="progress-bar" style="width: ${progressPercentage}%;"></div>
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

    if (totalScore <= 20) {
        feedback = "Your results suggest minimal symptoms. Keep practicing self-care!";
        recommendations = ["Practice mindfulness daily.", "Stay connected with loved ones."];
    } else if (totalScore <= 40) {
        feedback = "Your results suggest mild symptoms. Consider seeking support.";
        recommendations = ["Try relaxation techniques.", "Consider talking to a therapist."];
    } else if (totalScore <= 60) {
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

// Dynamically Initialize Quizzes
const quizzes = {
    'anxiety-quiz': anxietyQuiz,
    'depression-quiz': depressionQuiz,
    'stress-quiz': stressQuiz, 
};

Object.keys(quizzes).forEach(quizId => {
    document.getElementById(`start-${quizId}`).addEventListener('click', () => {
        startQuiz(quizzes[quizId]);
    });
}); 