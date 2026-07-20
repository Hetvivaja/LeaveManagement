from dataclasses import dataclass

@dataclass  
class LoginRequsetDTO:
    username:str
    password:str

    @staticmethod
    def from_requset(self):
        return LoginRequsetDTO(
            username = self.get('username', ''),
            password = self.get('password', ''),
        )
    def validate(self):
        errors=[]
        if not self.username:
            errors.append("Username is required.")
        if not self.password:
            errors.append("Password is required.")
        return errors