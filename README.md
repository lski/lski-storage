Lski-StorageJS
==============

Simple javascript storage wrapper for the browser with optional expiry time.

Built into es module, cjs and umd formats, so supports everything from tree-shaking to running "as is" in the browser.

#### Install

You can install from github directly using npm or you can link to the file with a script tag in the browser:

<!-- You can either download dist/lski-storage.js manually or you and use a package manager as below.

```
npm install github:lski/lski-storage --save
// or
bower install --save https://github.com/lski/Lski-StorageJS.git
``` -->

## Usage

Store a value

```js
lski.storage.store('key', 'val');
```

Retrieve the value (null if not found)

```js
var val = lski.storage.store('key');
```

Delete a value

```js
lski.storage.store('key', null);
```

Store a value that expires that cant be retrieved after the specified time (Unix timestamp)

```js
lski.storage.store('key', 'val', Date.now() 3600);
```

## Browser support

See https://caniuse.com/#feat=namevalue-storage for full listing, as thats the underlying tech used. But it includes the following:

IE 8
FF 3.5
Chrome 4
Safari 4

#### Todo

Implement testing using a jest coupled with something like puppeteer, as its a wrapper over browser intrinsic objects

#### Dependencies

No package dependancies