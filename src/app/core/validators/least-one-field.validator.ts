import { AbstractControl, ValidationErrors } from '@angular/forms';

export function leastOneFieldValidator(fieldNames: string[]) {
	return (control: AbstractControl): ValidationErrors | null => {
		const hasValue = fieldNames.some(fieldName => {
			const field = control.get(fieldName);
			return field && field.value && field.value > 0;
		});

		return hasValue ? null : {atLeastOneField: {fields: fieldNames}};
	};
}
