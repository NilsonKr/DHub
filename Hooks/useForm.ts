import { useState } from 'react';

export type Form = { [k: string]: string | number };

type Return = {
	form: Form;
	handleChange: (key: string, value: string) => void;
	cleanForm: () => void;
	validateEmptyForm: (keys: string[]) => boolean;
	resetForm: (newValues?: Form) => void;
};

export const useForm = (values: Form): Return => {
	const [form, setForm] = useState<Form>(values);

	const handleChange = (key: string, value: string) => {
		setForm(prev => ({ ...prev, [key]: value }));
	};

	const cleanForm = () => {
		setForm(values);
	};

	const validateEmptyForm = (keys: string[]) => {
		let isEmpty = false;

		keys.forEach(key => (Boolean(form[key]) === false ? (isEmpty = true) : null));

		return isEmpty;
	};

	const resetForm = (newValues?: Form) => {
		setForm(newValues ?? values);
	};

	return { form, handleChange, cleanForm, validateEmptyForm, resetForm };
};
