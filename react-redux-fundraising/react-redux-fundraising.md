### Instructions

You will be building a fundraising application using Redux in React!

![React Redux Fundraising Final Screenshot](https://s3.amazonaws.com/horizon-production/images/react-redux-fundraising-final-screenshot.png)

### Getting Set Up

From your challenges directory, run the following:

```sh
et get react-redux-fundraising
cd react-redux-fundraising
yarn install
bundle install
yarn start
```

Then in another terminal tab run:

```sh
rake db:drop db:create db:migrate db:seed
rails s
```

If you go to [localhost:3000](http://localhost:3000), there will be nothing on the
page except a top bar and a header "Existing Causes", and there should be no errors in your console.

## Meets Expectations Requirements

The application right now is a work in progress. After reviewing the provided code, fulfill the following user stories using your knowledge of Redux in React. You should not need to change anything in the `components` folder to do so, only in `containers` and `modules`.

### Step 1. List Causes

```no-highlight
As a potential donor
I want to view a list of existing causes
So I can see my options for donating
```

Acceptance Criteria:

* Right now, the `CausesIndexContainer` is trying to map an array of `CauseTile`s to the page, but does not have any data to work with.
* There should be a `getCauses` action creator within the `causes` module that fetches the existing causes from `/api/v1/causes.json`.
* Upon successfully fetching the data, `getCauses` should dispatch an action which stores the fetched causes in the `causeList` array in state.
* By `connect`ing the `CausesIndexContainer`, you should be able to load the fetched causes onto the page. Once your component is connected, follow the comments in order to use Redux to populate your page!

### Step 2. View Cause Detail

```no-highlight
As a potential donor
I want to view a cause's details
So I can learn more about the cause
```

* Currently, the `CausesIndexContainer` is defining a `handleSelect` function for each `CauseTile` that isn't doing anything.
* A `selectCause` action creator should be added within the `causes` module that updates the `selectedCauseId` in the store.
* This function should be set up inside the `handleSelect` function to successfully update the `selectedCauseId` for each cause.
* Once the state is updating properly, it should conditionally render the `CauseShowContainer` on the page. Comment in the code on lines 15-24 of the `CausesPageContainer`, and make sure this conditional statement has access to any data from the store that it needs!

### Step 3. View Cause Donations

```no-highlight
As a potential donor
I want to view the existing donations for a cause
So that I can see how successful the fundraising is thus far
```

* The `CauseShowContainer` is currently trying to map an array of `DonationTile`s to the page, but does not have any data to work with.
* There should be a `getDonations` action creator within the `donations` module that fetches the applicable donations from `/api/v1/causes/${causeId}/donations.json`.
* Upon successfully fetching the data, `getDonations` should store the donations within the `donationList` in state.
* These donations should then be populated on the page.

### Step 4. Contribute to a Cause

```no-highlight
As a decided donor
I want to add a new donation
So I can contribute to causes I care about
```

* Currently, the `NewDonationFormContainer` is nested within the `CauseShowContainer`, and conditionally rendering the form to our page.
* In the `donations` module, there is a `handleFieldChange` action creator. Utilize this action creator to add event listeners to the fields of the new donation form which update the store properly. *Hint:* Pay attention to what is being passed into `handleFieldChange` as an argument!
* Notice that the `value` of the input fields is already being populated with the values from our store, via `mapStateToProps`
* Using the code provided, fill in the `postDonation` action creator so that it runs a `POST` fetch to `/api/v1/causes/${selectedCauseId}/donations.json`.
* Hook up `postDonation` so that it successfully runs upon the form being submitted.
* This new donation should be added to the page without reloading.

## Exceeds Expectations Requirements

Our application is working, but there are a number of things we can do to improve our user experience and ensure that our app continues to work as expected. Implement the following user stories:

```no-highlight
As a donor
I want the new donation form to clear when I submit it
So that I can continue to make more donations easily
```

* Right now, when a user submits a new donation, the form does not clear.
* Write an action creator in the `donations` module to clear the form.
* Implement this action creator such that it clears the form each time it is submitted.

```no-highlight
As a user
I want to know if there was a loading error
So I don't sit there wondering why I can't use the site
```

* Currently our application has asynchronous fetching without any error handling!
* Update any thunk action creators to handle for errors in fetch.
* Use the `AlertMessage` component to display an error on the page in the event of a failed fetch call.

```no-highlight
As a developer
I want to include tests for my Redux code
So that I know everything is continuing to work as expected
```

### Additional Requirements for Exceeding Expectations

* Running `yarn test` should result in feedback as follows:

  ```no-highlight
  Test Suites: 2 passed, 2 total
  Tests:       2 passed, 2 total
  ```

* Fully unit test the Redux code related to the `donations` module in the spec files provided.
* Be sure to test all vanilla action creators, thunk action creators, and your reducer!
