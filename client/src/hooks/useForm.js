import { useState } from 'react';

function useForm(initialState) {
    const [formData, setFormData] = useState(initialState);

    function updateFormData(key, value) {
        setFormData(formData => ({
            ...formData,
            [key]: value,
        }));
    }

    return [formData, updateFormData];
}

export default useForm;
