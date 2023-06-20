import { validate as validateUUID } from 'uuid'

import { InvalidUUIDError } from '../errors/invalid-uuid.error'
import { UniqueEntityId } from './unique-entity-id.vo'

function spyValidateMethod() {
    return jest.spyOn(UniqueEntityId.prototype as any, 'validate')
}

describe('UniqueEntityId unit Tests', () => {
    it('should throw error when uuid is invalid', () => {
        const validateSpy = spyValidateMethod()
        expect(() => new UniqueEntityId('fake id')).toThrow(
            new InvalidUUIDError()
        )
        expect(validateSpy).toHaveBeenCalled()
    })

    it('should accept a uuid passed in constructor', () => {
        const uuid = '8653512d-7657-4cf9-aaa1-7597116d0a5b'
        const vo = new UniqueEntityId(uuid)

        const validateSpy = spyValidateMethod()

        expect(vo.id).toBe(uuid)
        expect(validateSpy).toHaveBeenCalled()
    })

    it('should generate an uuid if no id is passed on constructor', () => {
        const vo = new UniqueEntityId()

        const validateSpy = spyValidateMethod()

        expect(validateUUID(vo.id)).toBeTruthy()
        expect(validateSpy).toHaveBeenCalled()
    })
})
