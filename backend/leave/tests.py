from django.contrib.auth.models import User
from rest_framework.test import APIClient, APITestCase

from leave.models import Leave


class AuthenticationAndAccessTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.employee = User.objects.create_user(
            username='employee', password='safe-password-123', email='employee@example.com'
        )
        self.other_employee = User.objects.create_user(
            username='other', password='safe-password-123', email='other@example.com'
        )
        self.admin = User.objects.create_user(
            username='admin', password='safe-password-123', email='admin@example.com', is_staff=True
        )

    def test_signup_creates_an_employee_and_returns_tokens(self):
        response = self.client.post('/api/auth/signup/', {
            'username': 'new-user',
            'password': 'safe-password-123',
            'email': 'new-user@example.com',
            'first_name': 'New',
            'last_name': 'User',
            'department': 'engineering',
        }, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertTrue(response.data['access_token'])
        self.assertFalse(response.data['user']['is_admin'])
        self.assertEqual(response.data['user']['department'], 'engineering')
        self.assertTrue(User.objects.filter(username='new-user').exists())

    def test_employee_cannot_view_another_employees_leave(self):
        leave = Leave.objects.create(
            employee=self.other_employee,
            leave_type='casual',
            start_date='2026-10-01',
            end_date='2026-10-02',
            reason='Personal work',
        )
        self.client.force_authenticate(self.employee)

        response = self.client.get(f'/api/leaves/{leave.id}/')

        self.assertEqual(response.status_code, 403)

    def test_admin_can_update_user_at_frontend_route(self):
        self.client.force_authenticate(self.admin)

        response = self.client.patch(
            f'/api/admin/users/{self.employee.id}/', {'is_active': False}, format='json'
        )

        self.assertEqual(response.status_code, 200)
        self.employee.refresh_from_db()
        self.assertFalse(self.employee.is_active)
