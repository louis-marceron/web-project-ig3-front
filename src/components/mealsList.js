import { getAllMeals, consumeMeal } from '../services/apiService.js'
import getCookie from '../utils/getCookie.js'

export default {
    render: async () => {
        const meals = await getAllMeals()
        const mealsList = meals.map(meal => createMeal(meal)).join('\n')
        return mealsList
    },

    afterRender: async () => {
        // Assign click handlers to all meal divs after the DOM has loaded
        const mealElements = document.querySelectorAll('.meal');
        mealElements.forEach(mealElement => {
            mealElement.addEventListener('click', async () => {
                const mealId = mealElement.getAttribute('data-meal-id');
                const response = await consumeMeal(mealId, getCookie('userId'));
                if (response.error) {
                    alert(response.error);
                } 
            });
        });
    }
}

function createMeal(meal) {
    return `
    <div class="meal" data-meal-id="${meal.meal_id}">
        <div class="texts">
            <h2>${meal.name}</h2>
            <p>${meal.description}</p>
        </div>
        <img src="${meal.image_url}" alt="${meal.name} logo" />
    </div>
  `
}
