import requests
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed



class Github():
    @staticmethod
    def exchange_code_for_token(code):
        params_payload={"client_id":"Ov23li25dFk4MVOWg3e6", "client_secret":"41559f93bbd93184db3734ee6f2a29e186c705e9", "code":code}
        get_access_token=requests.post("https://github.com/login/oauth/access_token", params=params_payload, headers={'Accept': 'application/json'})
        payload=get_access_token.json()
        token=payload.get('access_token')
        return token
        

    @staticmethod
    def get_github_user(access_token):
        try:
            headers={'Authorization': f'JWT {access_token}'}
            resp = requests.get('https://api.github.com/user', headers=headers)
            user_data=resp.json()
            return user_data
        except:
            raise AuthenticationFailed("invalid access_token", 401)