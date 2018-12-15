Lski-StorageJS
==============

Simple wrapper for storing data in the browser with optional expiry time. Built into es module, cjs and umd formats, so supports everything from tree-shaking to running "as is" in the browser.

### Reasoning

Basically you create a store, or stores, to contain data, those stores can either sit on top of localStorage, sessionStorage or cookies (depending on what type of store you want), so why not just use those directly?

- Stores accept different data types, whereas localStorage/sessionStorage/cookies only accept strings.
- All types of store accept an expiry time when setting a value, simulating the expiry time on cookies. This is useful for holding time sensitive data (like auth tokens).
- Each type of store provides a shared interface between them, so easy to switch.
- Stores can be typed (if using Typescript) so you know the data type of the value returned.
- It encapsulates getting/setting values so that keys dont have to be remembered and reducing magic strings.
- Stores can be passed easily, if needed, they are just an object.

### Install

You can install from github directly using npm:

```bash
npm i lski-storage
```

Or you can link to the file with a script tag in the browser:

```html
<script crossorigin src="https://unpkg.com/lski-storage/dist/lski-storage.min.js" />
```

### Usage

Create a store, with an optional namespace, below we create a new store, which sits on local storage. *__NB__ We could have choosen a store based on cookies or session storage as well. See [Options below](#options)*

```ts
import { local } from 'lski-storage';

// NB: Does not need to be a string it can be any type you want
const store = local<string>('aNamespace');
```

Then set a value, with an optional expiry time:

```js
// Sets a value with a expiry time in 1 second
store.set("my value", Date.now() + 1000);
```

Then we can access the value, if this is called before the expired time then `aValue` would equal "my value" otherwise is would be null
```js
// NB If using typescript myValue would be automatically a `string` type in this instance
// As the type was declared was set when creating the store
const myValue = store.get();
```

To clear (delete) a value early:
```js
store.clear();

// Or check the store has a value
store.has();
```

Sometimes you might want to know when a value will expire (if it still exists), use the data function which also returns the expiresAt value.

```js
const data = store.data();

// E.g.
// data.value -> ""
// data.expiresAt -> 1544891393670
```

### Options

There are 3 options available `local`, `session` and `cookie`. They all create stores that have the same interface (as shown above), they differ in their underlying usage, which can be used to your advantage:

Local sits on localStorage so if an expiry time is not supplied the value will remain available via the store until manually cleared.

Session however will be available until either the expiry time or the user session ends, whichever is earliest.

Cookie works like session in that if an expiry isnt given then it will expire naturally at the end of the session, but the advantage/disadvantage is it will get sent to the server on each request as well.


### Browser support

See https://caniuse.com/#feat=namevalue-storage for full listing, as thats the underlying tech used. But it includes the following:

- IE 8
- FF 3.5
- Chrome 4
- Safari 4
- Plus others

### Dependencies

No package dependancies

#### Todo

Implement testing using a jest coupled with something like puppeteer, as its a wrapper over browser intrinsic objects that are used underneath.