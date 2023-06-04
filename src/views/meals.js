import mealsList from '../components/mealsList.js'

export default {
    render: async () => {
        return `
            <section id="meals-list">${await mealsList.render()}</section>
         `
    },
    afterRender: async () => {
        await mealsList.afterRender()
    }
}
