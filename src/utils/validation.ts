interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export const validate = (values: FormValues) => {
    const errors: Errors = {};

    if (values.firstName && values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (values.lastName && values.lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be at least 6 characters';
    }

    if (!values.confirmPassword && values.confirmPassword === '') {
        errors.confirmPassword = 'Required';
    } else if (values.confirmPassword && values.confirmPassword.length < 6) {
        errors.confirmPassword = 'Must be at least 6 characters';
    } else if (values.confirmPassword && values.confirmPassword !== values.password) {
        errors.confirmPassword = 'not matching';
    }

    return errors;
};
