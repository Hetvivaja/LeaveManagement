import os
import django

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'leave_management.settings'
)
django.setup()

from django.contrib.auth.models import User

username = os.environ.get('ADMIN_USERNAME')
password = os.environ.get('ADMIN_PASSWORD')
email    = os.environ.get('ADMIN_EMAIL')

if not username or not password:
    print("⚠️ Skipping: ADMIN credentials not set!")
else:
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(
            username = username,
            password = password,
            email    = email or ''
        )
        print(f"✅ Superuser '{username}' created!")
    else:
        print(f"ℹ️ Superuser '{username}' already exists!")