import { getMealConsumptions, getAllMeals } from '../services/apiService.js'
import getCookie from '../utils/getCookie.js';

export default {
    render: async () => {
        return `
            <section id="stats">
                <h1>Statistiques</h1>
                <div id="week-average"></div>
                <div id="month-average"></div>
            </section>
        `
    },

    afterRender: async () => {

        const mealConsumptions = await getMealConsumptions(getCookie('userId'));
        const meals = await getAllMeals();

        console.log(mealConsumptions);

        const aWeekAgo = new Date();
        aWeekAgo.setDate(aWeekAgo.getDate() - 7);

        const aMonthAgo = new Date();
        aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);

        const weekConsumptions = mealConsumptions.filter(consumption =>
            new Date(consumption.consumption_date) >= aWeekAgo
        );

        const monthConsumptions = mealConsumptions.filter(consumption =>
            new Date(consumption.consumption_date) >= aMonthAgo
        );

        const weekCarbonFootprint = weekConsumptions.reduce((total, consumption) => {
            const meal = meals.find(meal => meal.meal_id === consumption.meal_id);
            return total + meal.carbon_footprint;
        }, 0);

        const monthCarbonFootprint = monthConsumptions.reduce((total, consumption) => {
            const meal = meals.find(meal => meal.meal_id === consumption.meal_id);
            return total + meal.carbon_footprint;
        }, 0);

        const weekAverage = weekCarbonFootprint / weekConsumptions.length;
        const monthAverage = monthCarbonFootprint / monthConsumptions.length;

        document.getElementById('week-average').textContent = `Moyenne de l'empreinte carbone de la semaine dernière : ${weekAverage.toFixed(2)}`;
        document.getElementById('month-average').textContent = `Moyenne de l'empreinte carbone du mois dernier : ${monthAverage.toFixed(2)}`;
    }
}
