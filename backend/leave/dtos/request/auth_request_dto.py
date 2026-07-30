from dataclasses import dataclass

@dataclass  
class LoginRequsetDTO:
    username:str
    password:str

    @staticmethod
    def from_requset(data):
        return LoginRequsetDTO(
            username = data.get('username', ''),
            password = data.get('password', ''),
        )
    def validate(self):
        errors=[]
        if not self.username:
            errors.append("Username is required.")
        if not self.password:
            errors.append("Password is required.")
        return errors

@dataclass
class SignupRequestDto:
    username:str
    passwork:str
    email:str
    first_name:str
    last_name:str

    @staticmethod
    def from_request(data):
        return SignupRequestDto(
            username   = data.get('username',   ''),
            password   = data.get('password',   ''),
            email      = data.get('email',      ''),
            first_name = data.get('first_name', ''),
            last_name  = data.get('last_name',  ''),
        )
    def validate(self):
        errors=[]
        if not self.username:
            errors.append('Username is required!')
        if not self.password:
            errors.append('Password is required!')
        if len(self.password) < 8:
            errors.append('Password must be at least 8 characters!')
        if not self.email:
            errors.append('Email is required!')
        if not self.first_name:
            errors.append('First name is required!')
        return errors