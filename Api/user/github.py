import requests
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

class Github:
    @staticmethod
    def exchange_code_for_token(code):
        params_payload = {
            "client_id": "Ov23likU81Y6vJxr6Y2Z",  # Ensure this is correct
            "client_secret": "9fe45609d2723938829af37d6d9ec7c8503c17e4",  # Ensure this is correct
            "code": code
        }
        headers = {'Accept': 'application/json'}
        
        response = requests.post("https://github.com/login/oauth/access_token", params=params_payload, headers=headers)
        if response.status_code != 200:
            raise AuthenticationFailed(f"Failed to get access token from GitHub. Status Code: {response.status_code}")
        
        payload = response.json()
        
        # Handle case where GitHub returns an error in the response
        if "error" in payload:
            raise AuthenticationFailed(f"GitHub error: {payload.get('error_description', 'Unknown error')}")
        
        token = payload.get('access_token')
        if not token:
            raise AuthenticationFailed("Failed to get access token.")
        
        return token

    @staticmethod
    def get_github_user(access_token):
        try:
            headers = {'Authorization': f'Bearer {access_token}'}
            resp = requests.get('https://api.github.com/user', headers=headers)
            
            # Check if the response is successful
            if resp.status_code != 200:
                raise AuthenticationFailed(f"GitHub API Error: {resp.status_code} - {resp.text}")

            # Parse the user data as JSON
            user_data = resp.json()

            # Check if the parsed data is a dictionary
            if not isinstance(user_data, dict):
                raise AuthenticationFailed("Unexpected response format from GitHub user endpoint")

            # Check if email is provided, if not, request it from the GitHub emails API
            email = user_data.get('email')
            if not email:
                # Fetch emails from the GitHub emails endpoint
                email_resp = requests.get('https://api.github.com/user/emails', headers=headers)

                # Check if the response is successful
                if email_resp.status_code != 200:
                    raise AuthenticationFailed(f"GitHub API Email Error: {email_resp.status_code} - {email_resp.text}")

                email_data = email_resp.json()

                # Log the email response to see the data returned
                print("Email Data:", email_data)

                # Get the first verified and primary email, if available
                email = next((item['email'] for item in email_data if item['primary'] and item['verified']), None)

            # If no email is available, raise an error
            if not email:
                raise AuthenticationFailed("No verified email found in GitHub account.")
            
            # Log user data and return it
            print("User Data:", user_data)
            return user_data

        except Exception as e:
            raise AuthenticationFailed(f"Invalid access token or other error: {e}", 401)

