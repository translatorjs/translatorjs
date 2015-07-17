# translatorJS

i18n: Micro implementation of a translation system

The goal is to provide a very light plugin to handle translations. It is inspired on i18next-client

## Installation

```
npm install translatorjs
```

## Usage

```
var i18n = require('translatorjs');

i18n.init({
    translations: {
        dev: {
            hello: "Hello, World!",
            foo: {
                bar: "Fubar"
            },
            name: "Hello, __name__!"
        }
    }
});

i18n.t('hello'); // return "Hello, World!"
i18n.t('foo.bar'); // return "Fubar"
i18n.t('name', {name: "Dave"}); // return "Hello, Dave!"
```

## Support

With the support of [ARTACK WebLab GmbH](http://www.artack.ch)