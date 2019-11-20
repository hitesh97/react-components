### Examples

Empty component to represent an empty state (e.g., in a list) and allow the user to perform an action (e.g., create an item).

```js
initialState = {};

const icon = (
  <svg height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path
      fill="currentColor"
      d="M567.938 243.908L462.25 85.374A48.003 48.003 0 0 0 422.311 64H153.689a48 48 0 0 0-39.938 21.374L8.062 243.908A47.994 47.994 0 0 0 0 270.533V400c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V270.533a47.994 47.994 0 0 0-8.062-26.625zM162.252 128h251.497l85.333 128H376l-32 64H232l-32-64H76.918l85.334-128z"
    />
  </svg>
);

<EmptyPlaceholder
  icon={icon}
  primaryText="The list is empty"
  secondaryText="Start by creating your first entry"
  action={
    <Button
      primary
      style={{ width: "100px" }}
      label="Add entry"
      onClick={() => {}}
    />
  }
/>;
```