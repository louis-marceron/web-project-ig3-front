import { getAllMeals } from '../services/apiService.js'

export default {
    render: async () => {
        const meals = await getAllMeals()
        const mealsList = meals.map(meal => createMeal(meal)).join('\n')
        return mealsList
    }
}

function createMeal(meal) {
    return `
    <div class="meal">
        <div class="texts">
            <h2>${meal.name}</h2>
            <p>${meal.description}</p>
        </div>
        <img src="${meal.image_url}" alt="${meal.name} logo" />
    </div>
  `
}
