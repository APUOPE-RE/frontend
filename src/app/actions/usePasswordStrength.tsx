import { useEffect, useState } from "react";

export const usePasswordStrength = (password: string) => {
	const [passwordStrength, setPasswordStrength] = useState<{
		length: boolean;
		number: boolean;
		uppercase: boolean;
		special: boolean;
	}>({
		length: false,
		number: false,
		uppercase: false,
		special: false,
	});

	useEffect(() => {
		if (password) {
			const lengthValid = password.length >= 8 && password.length <= 20;
			const numberValid = /\d/.test(password);
			const uppercaseValid = /[A-Z]/.test(password);
			const specialValid = /[@$!%*?&()#^]/.test(password);

			setPasswordStrength({
				length: lengthValid,
				number: numberValid,
				uppercase: uppercaseValid,
				special: specialValid,
			});
		} else {
			setPasswordStrength({
				length: false,
				number: false,
				uppercase: false,
				special: false,
			});
		}
	}, [password]);

	return passwordStrength;
};
