import { getAllMeals, consumeMeal } from '../services/apiService.js'
import deleteLocalStorage from '../utils/deleteLocalStorage.js'

export default {
    render: async () => {
        try {
        const meals = await getAllMeals()
        const mealsList = meals.map(meal => createMeal(meal)).join('\n')
        return mealsList
        } catch (error) {
            deleteLocalStorage();
            window.location.href = '/';
        }
    },

    afterRender: async () => {
        // Assign click handlers to all meal divs after the DOM has loaded
        const mealElements = document.querySelectorAll('.meal');
        mealElements.forEach(mealElement => {
            mealElement.addEventListener('click', () => {
                mealElement.classList.toggle('flipped');
            });

            // When clicking the confirm button, consume the meal and prevent the card from flipping back
            const confirmButton = mealElement.querySelector('.confirm-button');
            confirmButton.addEventListener('click', async (e) => {
                e.stopPropagation(); // prevent the click from bubbling up to the .meal element
                const mealId = mealElement.getAttribute('data-meal-id');
                const response = await consumeMeal(mealId, localStorage.getItem('userId'));
                if (response.error) {
                    alert(response.error);
                } else {
                    mealElement.classList.remove('flipped'); // flip the card back
                }
            });
        });
    }
}

function createMeal(meal) {
    return `
    <div class="meal" data-meal-id="${meal.meal_id}">
        <div class="meal-front">
            <div class="texts">
                <h2>${meal.name}</h2>
                <p>${meal.description}</p>
            </div>
            <img class="food-icon" src="${meal.image_url}" alt="${meal.name} logo" />
        </div>
        <div class="meal-back">
            <div class="confirm-message">
                <div class="refuse-button">
                    <img src="https://cdn.discordapp.com/attachments/940022815439085620/1112992966475259994/back.svg" class="back-arrow" alt="back arrow"/>
                </div>
                <button class="confirm-button">Consommer ce repas</button>
            </div>
        </div>
    </div>
  `
}
