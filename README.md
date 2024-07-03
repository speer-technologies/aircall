## Summary

The goal of this test is to make you code a small ReactJS app. We have prepared a skeleton app for you, but feel free to change anything (CSS files, HTML structure, JS structure, etc) to suit your needs.

The app should have the following features:
- **Activity Feed** - simple list of calls
- **Activity Detail** - detail of a call
- **Archive** - the final user should be able to archive (and unarchive) a call. Archived calls will no longer be displayed on the Activity Feed and should have a separate Archived Tab.
- A button to archive all calls in the activity feed
- A button to unarchive all calls in the archived calls tab

Show us what you can do in 48 hours. You will be assessed on the following parameters: 
- Focus on design sense (Pay attention to the UI/UX and transitions)
- React Best Practices
- Code Readability and Maintainability

## Submission Requirements
After you're done with the assignment, please submit a link to the **GitHub/Bitbucket repository** (make sure it's public) with your code **AND** a deployment link where our recruiters can interact with the live version. You can use freely available tools like **Netlify, Vercel, Render, etc** to deploy your React application.

Your repository name should be the first 8 digits of a UUID. A random UUID can be generated from any site like this one: https://www.uuidgenerator.net/version4. This is to prevent malicious actors from plagiarizing your submission by searching for it on GitHub, since your repository is public.

For example: Your respository name here will be `036b1c95` and the repository URL that you submit will look like: `https://github.com/<your-username>/036b1c95`
<img width="782" alt="Screenshot 2024-01-10 at 10 07 47 PM" src="https://github.com/speer-technologies/aircall/assets/66385959/64fd4b89-e288-4e31-ad62-0949a686088a">

Once done, the assessment (along with other details) must be submitted on the following Google Form and NOT via email: https://forms.gle/itbJiaZ1TjToL45D8

**Note:** Submissions that fail to comply with any of the above submission requirements will be removed from any further consideration.

To give you an example/reference, here's what the app could look like:


![app](https://user-images.githubusercontent.com/630714/29357034-763d7216-8276-11e7-8bcb-e77d9645dfcc.png)

## Installation

We're using [yarn](https://yarnpkg.com) here (but you can use npm):

```
yarn install
yarn start
```

**Note**: Please make sure to run the app in Node 16.

## API documentation

### Routes

Here is the base URL of the API: https://aircall-backend.onrender.com <br>

The API is hosted on a free server, which is why the first time you call the API it might throw an error. The server goes to sleep if there hasn't been any activity for a while, but after 30-60 seconds of making the first call, it should work as expected. Please reach out to us in case it doesn't.

- **GET** - BASE_URL/activities: get calls to display in the Activity Feed
- **GET** - BASE_URL/activities/<call_id> retrieve a specific call details
- **PATCH** - BASE_URL/activities/<call_id> update a call. The only field updatable is `is_archived (bool)`. You'll need to send a JSON in the request body:
```
{
  is_archived: true
}
```
- **PATCH** - BASE_URL/reset: Reset all calls to initial state (usefull if you archived all calls).

### Call object

- **id** - unique ID of call
- **created_at** - creation date
- **direction** - `inbound` or `outbound` call
- **from** - caller's number
- **to** - callee's number
- **via** - Aircall number used for the call
- **duration** - duration of a call (in seconds)
- **is_archived** - call is archived or not
- **call_type** - can be a `missed`, `answered` or `voicemail` call.
