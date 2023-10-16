# ReliantAI takehome test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

You can provide a `userId` in the `constants` file under the `utilities` folder for the user you want to use.

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Notes

This is not a complete project, it's just a showcase for a home test exercise to showcase how I would solve some issues and showcase a basic architecture for the project. 

### Frameworks used:
 * React
 * Redux with redux-toolkit
 * material-ui
 * axios

### Project information

I didn't use `.env` file since this is a home test, there is a `constants` file with variables that should be in an environment file instead

In the reducers files you will see
```js
state.loading = true;
```
Which normally is bad since we are mutating the state, but we are using `redux-toolkit` which uses `immer` underneath so we are allowed to mutate the state since it's going to use `draft` states.

## Architecture
I'm using next to none local state in this application. 
Everything in the `UI` is driven from the global state using `redux`.

Side effects are managed by async thunks as you can see in any file in the `actions` folder under store.

Basically we have dumb components being fed data thought the store and all the logic is contained into the actions files. If the project was bigger in scope or complexity this architecture can work but actions will need to be split into 2 categories, one to control the UI and data transformations and another for flows.

Additionally testing becomes very easy with this approach, `UI` testing is done without needing any complex logic or setup since all the components are dumb
Testing the logic again its straightforward with the logic split into small pieces in actions.

### Error management
We are using `createAsyncThunk` for our side effects, that means that in our `slices` in the reducers files we have a listener for the state of the action.
for example:
```js
builder.addCase(fetchVersionedTablesById.pending, (state) => {
  ...  
})
```
With this approach we can catch any exeptions in our actions where we do all the business logic like this
```js
builder.addCase(fetchVersionedTablesById.rejected, (state) => {
```
So we don't need to `try - catch` our `api` calls.
