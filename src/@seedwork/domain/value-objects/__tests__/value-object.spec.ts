import { ValueObject } from '../value-object'

class StubValueObject extends ValueObject {}

describe('ValueObject unit Tests', () => {
    it('should set value', () => {
        const value = 'string value'
        let vo = new StubValueObject(value)
        expect(vo.value).toBe(value)

        vo = new StubValueObject({ prop1: 'value1' })
        expect(vo.value).toStrictEqual({ prop1: 'value1' })
    })

    it('should convert to a string', () => {
        const date = new Date()
        let arrange = [
            { received: null, expected: 'null' },
            { received: undefined, expected: 'undefined' },
            { received: '', expected: '' },
            { received: 'fake test', expected: 'fake test' },
            { received: 0, expected: '0' },
            { received: 1, expected: '1' },
            { received: 5, expected: '5' },
            { received: true, expected: 'true' },
            { received: false, expected: 'false' },
            { received: date, expected: date.toString() },
            {
                received: { prop: 'prop' },
                expected: JSON.stringify({ prop: 'prop' }),
            },
        ]

        arrange.forEach((value) => {
            const vo = new StubValueObject(value.received)
            expect(vo + '').toBe(value.expected)
        })
    })
})
