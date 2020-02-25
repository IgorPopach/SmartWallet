interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    price: number;
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
    price?: string;
    category?: string;
    tag?: string;
    description?: string;
}

export const validate = ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    price,
    category,
    tag,
}: FormValues) => {
    const errors: Errors = {};

    if (firstName && firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (lastName && lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less';
    }

    if (!email) {
        errors.email = 'Please enter an email address';
    } else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address';
    }

    if (!password) {
        errors.password = 'Please enter password';
    } else if (password && password.length < 6) {
        errors.password = 'Must be at least 6 characters';
    }

    if (!confirmPassword && confirmPassword === '') {
        errors.confirmPassword = 'Please confirm password';
    } else if (confirmPassword && confirmPassword.length < 6) {
        errors.confirmPassword = 'Must be at least 6 characters';
    } else if (confirmPassword && confirmPassword !== password) {
        errors.confirmPassword = 'not matching';
    }

    if ((!price && price === null) || price === 0 || typeof price === 'string') {
        errors.price = 'Please enter a price';
    } else if (price && price.toString().length > 6) {
        errors.price = 'Wow... Easy!';
    }

    // if (!category || category === '') {
    //     errors.category = 'Please choose a category';
    // }

    if ((tag && tag.length < 3) || (tag && tag.length > 10)) {
        errors.tag = 'Must be at least 3 and less 10 characters';
    }

    return errors;
};
