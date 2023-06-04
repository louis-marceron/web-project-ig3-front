import { getMealConsumptions, getAllMeals } from '../services/apiService.js'
import deleteLocalStorage from '../utils/deleteLocalStorage.js'

export default {
    render: async () => {
        return `
            <section id="stats">
                <h1>7 derniers jours</h1>
                <h2 id="week-total-title">Total :</h2>
                <div id="week-total"></div>
                <h2 id="week-histogram-title">Plats consommés</h2>
                <div id="week-histogram"></div>
                <h1>30 derniers jours</h1>
                <h2 id="week-total-title">Total :</h2>
                <div id="month-total"></div>
                <h2 id="week-histogram-title">Plats consommés</h2>
                <div id="month-histogram"></div>
            </section>
        `
    },

    afterRender: async () => {
        let mealConsumptions
        let meals

        try {
            mealConsumptions = await getMealConsumptions(localStorage.getItem('userId'));
            meals = await getAllMeals();
        } catch (error) {
            deleteLocalStorage();
            window.location.href = '/';
        }

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

        document.getElementById('week-total').textContent = `${weekCarbonFootprint.toFixed(2)}g CO2e émis`;
        document.getElementById('month-total').textContent = `${monthCarbonFootprint.toFixed(2)}g CO2e émis`;

        const weekHistogram = getMealHistogram(weekConsumptions, meals);
        const monthHistogram = getMealHistogram(monthConsumptions, meals);

        let weekHistogramText = '';
        for (let mealName in weekHistogram) {
            weekHistogramText += `${mealName}: ${weekHistogram[mealName]}<br>`;
        }

        let monthHistogramText = '';
        for (let mealName in monthHistogram) {
            monthHistogramText += `${mealName}: ${monthHistogram[mealName]}<br>`;
        }

        document.getElementById('week-histogram').innerHTML = weekHistogramText;
        document.getElementById('month-histogram').innerHTML = monthHistogramText;
    }
}

const getMealHistogram = (consumptions, meals) => {
    const histogram = {};

    for (let consumption of consumptions) {
        const meal = meals.find(meal => meal.meal_id === consumption.meal_id);
        if (histogram[meal.name]) {
            histogram[meal.name]++;
        } else {
            histogram[meal.name] = 1;
        }
    }

    return histogram;
}