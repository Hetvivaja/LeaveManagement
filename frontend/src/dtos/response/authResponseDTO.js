export const parseLoginResponse=(data)=>({

    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user:{
        id: data.user.id,
        username : data.user.username,
        email    : data.user.email,
        active   : data.user.is_active,
        isAdmin  : data.user.is_admin,
    }
});