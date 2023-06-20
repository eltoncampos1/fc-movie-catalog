import { InvalidUUIDError } from '../errors/invalid-uuid.error'
import { UniqueEntityId } from './unique-entity-id.vo'

describe('UniqueEntityId unit Tests', () => {
    it('should throw error when uuid is invalid', () => {
        const validateSpy = jest.spyOn(
            UniqueEntityId.prototype as any,
            'validate'
        )
        expect(() => new UniqueEntityId('fake id')).toThrow(
            new InvalidUUIDError()
        )
        expect(validateSpy).toHaveBeenCalled()
    })
})
