import { ValueObject } from '../value-object'

class StubValueObject extends ValueObject {}

describe('ValueObject unit Tests', () => {
    it('should set vakue', () => {
        const value = 'string value'
        let vo = new StubValueObject(value)
        expect(vo.value).toBe(value)

        vo = new StubValueObject({ prop1: 'value1' })
        expect(vo.value).toStrictEqual({ prop1: 'value1' })
    })
})
