from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError

def register_social_user(provider, email, first_name, last_name):
    """
    This function checks if a user exists in the database.
    If the user exists, it will return the existing user.
    If the user does not exist, it will create a new user and associate it with the social provider.
    """
    # Check if the user already exists based on email
    try:
        user = User.objects.get(email=email)
        print(f"User {user.email} already exists.")
        return {"email": user.email, "first_name": user.first_name, "last_name": user.last_name, "provider": provider}
    except User.DoesNotExist:
        # Create a new user if they don't exist
        print(f"Creating a new user: {email}, {first_name} {last_name} via {provider}")
        
        user = User.objects.create(
            username=email,  # Set username to email or you can generate a unique one
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=None  # No password is needed for social login users
        )
        
        # You may want to save additional social-specific details in another model/table if needed.
        # Example: Save provider data in a separate `SocialAccount` model.
        # SocialAccount.objects.create(user=user, provider=provider)

        # Return the newly created user details
        return {"email": user.email, "first_name": user.first_name, "last_name": user.last_name, "provider": provider}

    except Exception as e:
        # Handle any unexpected exceptions
        print(f"An error occurred while registering the user: {str(e)}")
        raise ValidationError("An error occurred while registering the user.")
