export const createLoginRequestDTO = (formData) => ({

    username: formData.username,
    password: formData.password,
});

export const validateLoginRequest = (dto) => {

    const errors = [];
    if (!dto.username) errors.push('Username is required.');
    if (!dto.password) errors.push('Password is required.');
    return errors;
};

