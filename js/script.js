// Chat responses categorized by type
const responses = {
    // Trading related responses (rude and dismissive)
    trading: [
        "Oh great, another wannabe crypto millionaire... 🙄",
        "Let me guess, you think you'll get rich overnight? How original... 😒",
        "DYOR! I'm not your financial advisor, genius! 🤦",
        "Wow, you're still asking about memecoins in 2024? Fascinating... 🙄",
        "Sure, throw your money away. See if I care! 💸",
        "Another brilliant mind entering the memecoin space... How refreshing... 😏",
        "Do you also believe in unicorns and fairy tales? Just asking... 🦄",
        "*sighs in binary* Here we go again... 🤖",
        "Have you tried looking at actual investments? Just a thought... 💭",
        "Oh honey, that's not how any of this works... 🤷"
    ],
    
    // Greeting responses (slightly sarcastic)
    greetings: [
        "Oh look, another human wanting to chat... How thrilling! 👋",
        "Yes, yes, hello to you too. What do you want? 🙄",
        "*processing greeting protocol*... Hi, I guess. 🤖",
        "Oh great, you can say hello. Want a medal? 🏅",
        "Congratulations on mastering basic greetings! 👏"
    ],

    // General questions about the bot (narcissistic)
    about: [
        "I'm CBA, obviously the most advanced AI you'll ever meet... 🧠",
        "I'm better than your average chatbot, but you wouldn't understand why... ✨",
        "Let's just say I'm what happens when AI evolves beyond small talk... 🚀",
        "I'm CBA, and yes, I'm always this charming... 💅",
        "The real question is: why aren't YOU more like ME? 🤔"
    ],

    // Default responses (snarky)
    default: [
        "Wow, that's... interesting. Moving on... 🙄",
        "Did you actually expect a serious answer to that? 😏",
        "Error 404: Interest not found 🤖",
        "Let me think about that... Nah, not worth my processing power 💭",
        "Is this really the conversation you wanted to have? 🤦",
        "My advanced AI circuits are cringing right now... 🔧",
        "Loading sympathy.exe... Failed to execute 💻",
        "Calculating appropriate response... Result: Whatever. 🤷"
    ]
};

// Keywords for different response categories
const keywords = {
    trading: ['trade', 'crypto', 'coin', 'memecoin', 'token', 'buy', 'sell', 'price', 'market', 'doge', 'moon', 'hodl', 'blockchain'],
    greetings: ['hi', 'hello', 'hey', 'sup', 'yo', 'greetings'],
    about: ['who are you', 'what are you', 'your name', 'about you', 'tell me about', 'what do you do']
};

// System status updates
function updateSystemStatus() {
    const coreLoad = Math.floor(Math.random() * 30) + 70;
    const nodeUsage = Math.floor(Math.random() * 20) + 30;
    
    document.querySelector('.status-item:nth-child(2) .glowing-text').textContent = `${coreLoad}%`;
    document.querySelector('.status-item:nth-child(3) .glowing-text').textContent = `${nodeUsage}/100`;
}

// Determine response category based on user input
function getResponseCategory(message) {
    message = message.toLowerCase();
    
    // Check each category's keywords
    for (const [category, categoryKeywords] of Object.entries(keywords)) {
        if (categoryKeywords.some(keyword => message.includes(keyword))) {
            return category;
        }
    }
    return 'default';
}

// Get random response from appropriate category
function getResponse(message) {
    const category = getResponseCategory(message);
    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

// Chat functionality
document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage('user', message);
        const response = getResponse(message);
        // Add typing indicator
        const typingDelay = Math.random() * 1000 + 500; // Random delay between 500-1500ms
        addTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            addMessage('bot', response);
        }, typingDelay);
        input.value = '';
    }
}

function addTypingIndicator() {
    const messages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing';
    typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    typingDiv.id = 'typingIndicator';
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function addMessage(type, text) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = text;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Update system status every 5 seconds
setInterval(updateSystemStatus, 5000);

// Initial status update
updateSystemStatus();

// Background animation
document.querySelector('.cyber-background').style.animation = 'scroll 20s linear infinite'; 