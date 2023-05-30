import mealsList from '../components/mealsList.js'

export default {
    render: async () => {
        return `
            <section id="meals">
            <h1>Repas-type</h1>
            <div id="meals-list">${await mealsList.render()}</div>
            </section>
        `
    }
}