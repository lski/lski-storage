Lski-StorageJS
==============

Simple javascript storage wrapper with optional expiry time.

Can either be used directly which places a 'storage' object into the global, or defines itself using AMD

#### Install

bower install --save https://github.com/lski/Lski-StorageJS.git

#### Usage

Store a value

    lski.storage.store('key', 'val');

Retrieve the value (null if not found)

    var val = lski.storage.store('key');

Delete a value

    lski.storage.store('key', null);

Store a value that expires that cant be retrieved after the specified time (Unix timestamp)

    lski.storage.store('key', 'val', { expires: Date.now() + 3600 })

#### Todo

- Is useable but I need to remove the dependency on localStorage for older browsers

#### Dependencies

- Currently localStorage
