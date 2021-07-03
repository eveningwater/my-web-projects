const body = document.body;
const counters = [
    {
        class: "fa-youtube",
        value: 5000,
        text: "YouTube Subscribers"
    },
    {
        class: "fa-facebook",
        value: 7500,
        text: "Facebook Fans"
    },
    {
        class: "fa-twitter",
        value: 12000,
        text: "Twitter Followers"
    }
];
function updateCounterHandler() {
    const counters_elements = document.querySelectorAll('.counter');
    counters_elements.forEach(element => {
        element.textContent = '0';
        const updateCounter = () => {
            const value = +element.getAttribute('data-count');
            const textContent = +element.textContent;
            const increment = value / 100;
            if (textContent < value) {
                element.textContent = `${Math.ceil(increment + textContent)}`;
                setTimeout(updateCounter, 10);
            } else {
                element.textContent = value;
            }
        }
        updateCounter();
    });
}
function createTemplate() {
    counters.forEach(counter => {
        const counter_element = document.createElement('div');
        counter_element.classList.add("counter-container");
        counter_element.innerHTML = `
            <i class="fab fa-3x ${counter.class}"></i>
            <div class="counter" data-count="${counter.value}"></div>
            <span>${counter.text}</span>
        `;
        body.insertBefore(counter_element,body.firstElementChild);
    });
    updateCounterHandler();
}
window.onload = () => createTemplate();