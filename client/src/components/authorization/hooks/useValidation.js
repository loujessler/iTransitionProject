import { useState } from 'react';

function useValidation() {
    const [errors, setErrors] = useState('');

    async function validate(fields, validators) {
        let isValid = true;
        let newErrors = {};

        for (const [field, validator] of Object.entries(validators)) {
            const value = fields[field];
            let errors = await validator(value);
            if (errors.length) {
                newErrors[field] = errors[0];
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    }

    return [errors, setErrors, validate];
}

export default useValidation;
