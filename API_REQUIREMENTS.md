# API Requirements for Family Healthcare Dashboard App

Based on the dashboard design and functionality, here are the required API endpoints that need to be built for the backend:

## Authentication & User Management

### 1. User Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user profile

### 2. Family Members Management
- `GET /api/family/members` - Get all family members
- `POST /api/family/members` - Add new family member
- `PUT /api/family/members/:id` - Update family member
- `DELETE /api/family/members/:id` - Remove family member
- `GET /api/family/members/:id/profile` - Get specific member profile

## Session Management

### 3. Therapy Sessions
- `GET /api/sessions/upcoming` - Get upcoming sessions for family member
- `GET /api/sessions/history` - Get session history
- `POST /api/sessions` - Schedule new session
- `PUT /api/sessions/:id` - Update session details
- `DELETE /api/sessions/:id` - Cancel session
- `GET /api/sessions/:id/details` - Get detailed session information

### 4. Session Types & Therapy Programs
- `GET /api/therapy-types` - Get available therapy types (ABA, Speech, etc.)
- `GET /api/programs/:memberId` - Get therapy programs for member

## Daily Tracking & Progress

### 5. Mood Tracking
- `GET /api/mood/:memberId/current` - Get current mood score
- `POST /api/mood/:memberId` - Record mood entry
- `GET /api/mood/:memberId/history` - Get mood history
- `PUT /api/mood/:entryId` - Update mood entry

### 6. Progress Tracking
- `GET /api/progress/:memberId/current` - Get current progress status
- `POST /api/progress/:memberId` - Record progress update
- `GET /api/progress/:memberId/history` - Get progress history
- `GET /api/progress/:memberId/goals` - Get therapy goals and milestones

### 7. Daily Activities
- `GET /api/activities/:memberId/today` - Get today's activities
- `POST /api/activities/:memberId` - Record activity
- `PUT /api/activities/:activityId` - Update activity
- `GET /api/activities/:memberId/meals` - Get meal tracking
- `POST /api/activities/:memberId/meals` - Record meal

### 8. Care Instructions & Notes
- `GET /api/care-notes/:memberId/current` - Get current care instructions
- `POST /api/care-notes/:memberId` - Add care note
- `GET /api/care-notes/:memberId/bring-items` - Get items to bring list
- `POST /api/care-notes/:memberId/bring-items` - Add item to bring

## Care Team Management

### 9. Care Team
- `GET /api/care-team/:memberId` - Get care team members
- `POST /api/care-team/:memberId` - Add care team member
- `PUT /api/care-team/:teamMemberId` - Update care team member
- `DELETE /api/care-team/:teamMemberId` - Remove care team member
- `GET /api/care-team/:teamMemberId/profile` - Get care team member profile

### 10. Communication
- `GET /api/messages/:memberId` - Get messages/communications
- `POST /api/messages/:memberId` - Send message to care team
- `GET /api/feedback/:memberId` - Get feedback history
- `POST /api/feedback/:memberId` - Submit feedback

## Insurance & Billing

### 11. Insurance Management
- `GET /api/insurance/:memberId` - Get insurance information
- `PUT /api/insurance/:memberId` - Update insurance details
- `GET /api/insurance/:memberId/coverage` - Get coverage details

### 12. Billing & Payments
- `GET /api/billing/:memberId/statements` - Get billing statements
- `GET /api/billing/:memberId/payments` - Get payment history
- `POST /api/billing/:memberId/payments` - Process payment
- `GET /api/billing/:memberId/outstanding` - Get outstanding balances

## Notifications & Reminders

### 13. Notifications
- `GET /api/notifications/:userId` - Get user notifications
- `POST /api/notifications/:userId/mark-read` - Mark notifications as read
- `PUT /api/notifications/:userId/preferences` - Update notification preferences

### 14. Reminders
- `GET /api/reminders/:memberId` - Get reminders
- `POST /api/reminders/:memberId` - Create reminder
- `PUT /api/reminders/:reminderId` - Update reminder
- `DELETE /api/reminders/:reminderId` - Delete reminder

## Data Models

### User
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "parent|caregiver|admin",
  "familyId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Family Member
```json
{
  "id": "string",
  "name": "string",
  "dateOfBirth": "date",
  "avatar": "string",
  "therapyPrograms": ["string"],
  "careTeam": ["string"],
  "familyId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Session
```json
{
  "id": "string",
  "memberId": "string",
  "therapyType": "string",
  "scheduledDate": "datetime",
  "duration": "number",
  "status": "scheduled|completed|cancelled",
  "therapistId": "string",
  "notes": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Mood Entry
```json
{
  "id": "string",
  "memberId": "string",
  "score": "number",
  "maxScore": "number",
  "emoji": "string",
  "notes": "string",
  "recordedAt": "datetime",
  "recordedBy": "string"
}
```

### Progress Entry
```json
{
  "id": "string",
  "memberId": "string",
  "sessionId": "string",
  "progressLevel": "excellent|good|moderate|minimal",
  "goals": ["string"],
  "achievements": ["string"],
  "notes": "string",
  "recordedAt": "datetime",
  "recordedBy": "string"
}
```

## Authentication & Security

- Use JWT tokens for authentication
- Implement role-based access control (RBAC)
- Ensure HIPAA compliance for healthcare data
- Use HTTPS for all API communications
- Implement rate limiting and request validation
- Log all access to sensitive healthcare data

## Additional Considerations

1. **Real-time Updates**: Consider WebSocket connections for real-time updates on session status, messages, etc.
2. **File Uploads**: APIs for uploading documents, images, and reports
3. **Data Export**: APIs for exporting data for reports and external systems
4. **Integration**: APIs for integrating with external healthcare systems, insurance providers, etc.
5. **Analytics**: APIs for generating reports and analytics on progress, attendance, etc.

This API structure provides a comprehensive backend for the family healthcare dashboard application, supporting all the features shown in the design mockup.
