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