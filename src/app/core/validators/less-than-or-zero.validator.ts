import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lessThanOrZeroValidator(otherControlName: string): ValidatorFn {
	return (control: AbstractControl): { [key: string]: boolean } | null => {
		if (!control.parent) {
			return null;
		}

		const thisValue = Number(control.value);
		const otherControl = control.parent.get(otherControlName);

		if (!otherControl) {
			return null;
		}

		const otherValue = Number(otherControl.value);

		if (thisValue === 0) {
			return null;
		}

		if (thisValue < otherValue) {
			return null;
		}

		return {'lessThanOrZero': true};
	};
}
