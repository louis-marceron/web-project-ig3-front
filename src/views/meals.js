import mealsList from '../components/mealsList.js'

export default {
    render: async () => {
        return `
            <section id="meals">
            <div id="meals-list">${await mealsList.render()}</div>
            </section>
        `
    }
}
