import mealsList from '../components/mealsList.js'

export default {
    render: async () => {
        return `
            <div id="meals-list">${await mealsList.render()}</div>
         `
    },
    afterRender: async () => {
        await mealsList.afterRender()
    }
}
