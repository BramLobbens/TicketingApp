# TicketingApp Projectwerk (2020-2021)

## Progress
### `'api'` Features To-do list:
- [x] 🎨 Changes: Update ~~Patch~~ (edit: Put) api on ticket status change
- [x] 🔒 Security: Revise password restrictions
- [x] ➕ Feature: Add default 'Member' role
- [x] 🎨 Changes: Change implementation of Authorization via HttpOnly Cookie
- [x] 🎨 Changes: Delegate signout to api controller

### `'ticket-app'` Features To-do list:
- [x] ➕Feature: Ticket replies
- [x] ➕Feature: 'My Tickets' component view
- [x] 🐛Bugfix: Persistance of tickets and replies upon user deletion
- [x] ➕Feature: Ticket assignee selection
- [x] ➕Feature: Ticket status update selection for ticket issuer
- [x] ➕Feature: Display password validation check upon signup
- [x] ➕Feature: Show relevant error/succes messages to user
- [x] 🎨 Changes: Changes to API calls and error handling in code
- [x] 🎨 Changes: Change signout implementation
- [ ] ~~Update display of username if user deleted~~ &rarr; __*under revision*__
- [ ] Update nav bar routing on user sign in
- [ ] Update nav bar display on user sign in

Component|Error Handling|Redirects
---|---|---
SignupForm|✅|✅
SigninForm|✅|✅
ReplyForm| ✅|🚧
TicketForm|🚧|🚧

## About

1. [to-come-soon](#to-do)

### to-do

## Deployment

(Work in Progress)

in `ticketingapp\api` run
```
dotnet run
```

in `ticketingapp\ticket-app` run
```
yarn start
```
or
```
npm start
```
