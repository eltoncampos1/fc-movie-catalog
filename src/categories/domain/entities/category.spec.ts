import { Category, CategoryProperties } from './category'

describe('Category Tests', () => {
    test('Constructor of category', () => {
        const props: CategoryProperties = {
            name: 'Movie',
            description: 'One description',
            is_active: true,
            created_at: new Date(),
        }
        const category = new Category(props)
        expect(category.name).toBe(props.name)
        expect(category.description).toBe(props.description)
        expect(category.is_active).toBeTruthy()
        expect(category.created_at).toBe(props.created_at)
        expect(category.props).toStrictEqual(props)
    })
})
