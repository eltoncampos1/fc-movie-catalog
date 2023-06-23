import { UniqueEntityId } from './../../../@seedwork/domain/value-objects/unique-entity-id.vo'
import { Category, CategoryProperties } from './category'
import { omit } from 'lodash'

describe('Category Tests', () => {
    test('Constructor of category', () => {
        let category = new Category({ name: 'Movie' })
        let props = omit(category.props, 'created_at')

        expect(props).toStrictEqual({
            name: 'Movie',
            description: null,
            is_active: true,
        })

        expect(category.props.created_at).toBeInstanceOf(Date)

        let created_at = new Date()

        category = new Category({
            name: 'Movie',
            description: 'some description',
            is_active: false,
        })
        expect(category.props).toStrictEqual({
            name: 'Movie',
            description: 'some description',
            is_active: false,
            created_at,
        })

        category = new Category({
            name: 'Movie',
            description: 'other description',
        })
        expect(category.props).toMatchObject({
            name: 'Movie',
            description: 'other description',
        })

        category = new Category({
            name: 'Movie',
            is_active: true,
        })
        expect(category.props).toMatchObject({
            name: 'Movie',
            is_active: true,
        })

        category = new Category({
            name: 'Movie',
            created_at,
        })
        expect(category.props).toMatchObject({
            name: 'Movie',
            created_at,
        })
    })

    test('id prop', () => {
        type CategoryData = {
            props: CategoryProperties
            id?: UniqueEntityId
        }
        const data: CategoryData[] = [
            { props: { name: 'Movie' } },
            { props: { name: 'Movie' }, id: null },
            { props: { name: 'Movie' }, id: undefined },
            {
                props: { name: 'Movie' },
                id: new UniqueEntityId(),
            },
        ]

        data.forEach((el) => {
            const category = new Category(el.props, el.id)
            expect(category.id).not.toBeNull()
            expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
        })
    })

    test('getter and setter of name prop', () => {
        const category = new Category({ name: 'Movie' })
        expect(category.name).toBe('Movie')

        category['name'] = 'other category'
        expect(category.name).toBe('other category')
    })

    test('getter and setter of description prop', () => {
        let category = new Category({
            name: 'Movie',
        })
        expect(category.description).toBeNull()

        category = new Category({
            name: 'Movie',
            description: 'Some description',
        })
        expect(category.description).toBe('Some description')

        category = new Category({
            name: 'Movie',
        })

        category['description'] = 'other description'
        expect(category.description).toBe('other description')

        category['description'] = undefined
        expect(category.description).toBeNull()
    })

    test('getter and setter of is_active prop', () => {
        let category = new Category({ name: 'Movie' })

        expect(category.is_active).toBeTruthy()

        category = new Category({ name: 'Movie', is_active: true })
        expect(category.is_active).toBeTruthy()

        category = new Category({ name: 'Movie', is_active: false })
        expect(category.is_active).toBeFalsy()
    })

    test('getter and setter of created_at prop', () => {
        let category = new Category({ name: 'Movie' })

        expect(category.created_at).toBeInstanceOf(Date)
        let created_at = new Date()
        category = new Category({ name: 'Movie', created_at })

        expect(category.created_at).toBe(created_at)
    })

    it('should update a category', () => {
        const category = new Category({ name: 'Movie' })
        category.update('Documentary', 'some descripton')
        expect(category.name).toBe('Documentary')
        expect(category.description).toBe('some descripton')
    })

    it('should activate and deactivate a category', () => {
        const category = new Category({ name: 'Movie', is_active: false })
        expect(category.is_active).toBe(false)
        category.activate()
        expect(category.is_active).toBe(true)
        category.deactivate()
        expect(category.is_active).toBe(false)
    })
})
