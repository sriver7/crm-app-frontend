import { useState } from "react";

export function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);
    return [
        // Initial form fields state is saved in fields
        fields,
        function(event) {
            setValues({
                ...fields,
                [event.target.id]: event.target.value
            });
        }
    ];
}