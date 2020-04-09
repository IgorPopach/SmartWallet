interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    value: number;
    category: string;
    tag: string;
    description: string;
}

interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    value?: string;
    category?: string;
    tag?: string;
    description?: string;
}

const validateUser = (errors: Errors, { firstName, lastName }: FormValues) => {
    if (firstName && firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }
    if (lastName && lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less';
    }
};

const validateEmail = (errors: Errors, { email }: FormValues) => {
    if (email === undefined) {
        return;
    }
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address';
    }
    if (!email) {
        errors.email = 'Please enter an email address';
    }
};

const validatePassword = (errors: Errors, { password }: FormValues) => {
    if (password === undefined) {
        return;
    }
    if (password && password.length < 6) {
        errors.password = 'Must be at least 6 characters';
    }
    if (!password) {
        errors.password = 'Please enter password';
    }
};

const validateConfirmPassword = (errors: Errors, { confirmPassword, password }: FormValues) => {
    if (confirmPassword === undefined) {
        return;
    }
    if (confirmPassword && confirmPassword.length < 6) {
        errors.confirmPassword = 'Must be at least 6 characters';
    } else if (confirmPassword && confirmPassword !== password) {
        errors.confirmPassword = 'not matching';
    }
    if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm password';
    }
};

const validatePrice = (errors: Errors, { value }: FormValues) => {
    if (value === undefined) {
        return;
    }
    if (!value || value === null || value === 0 || typeof value === 'string') {
        errors.value = 'Please enter a price';
    }
    if (value && value.toString().length > 6) {
        errors.value = 'Wow... Easy!';
    }
};

const validateCategory = (errors: Errors, { category }: FormValues) => {
    if (category === undefined) {
        return;
    }
    if (!category) {
        errors.category = 'Please choose a category';
    }
};

const validateTag = (errors: Errors, { tag }: FormValues) => {
    if (tag === undefined) {
        return;
    }
    if ((tag && tag.length < 3) || (tag && tag.length > 10)) {
        errors.tag = 'Must be at least 3 and less 10 characters';
    }
};

export const validate = (values: FormValues) => {
    const errors: Errors = {};

    validateUser(errors, values);

    validateEmail(errors, values);

    validatePassword(errors, values);

    validateConfirmPassword(errors, values);

    validatePrice(errors, values);

    validateCategory(errors, values);

    validateTag(errors, values);

    return errors;
};
