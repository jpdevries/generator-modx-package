generator-modx-package
======================

A yeoman generator for MODX Revolution packages.

## Getting Started
The MODX Package Generator installs like any other npm package. From your terminal, run:

```bash
npm install -g yo generator-modx-package
```

You can now create a new MODX package from any directory. For example:

```bash
cd ~/Desktop/
mkdir awesome-package && cd $_
yo modx-package
```

You'll be greated by a friendly fellow named yeoman and then be asked several questions. Choose your answers carefully and let's meet back here when you are through.

```bash
     _-----_
    |       |
    |--(o)--|   .--------------------------.
   `---------´  |    Welcome to Yeoman,    |
    ( _´U`_ )   |   ladies and gentlemen!  |
    /___A___\   '__________________________'
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
```

## Including Elements
For any elements you choose to include, you will find an associated directory within `core/components/awesome-package/` as well as a transport file in `_build/data`. Add your files within `core/components/awesome-package` and then reference them in the source array of the associated build file like so:
```php
$snippetsSource = array(
  /* put your snippets here */
   'myawesomesnippet' => array(
  	'description' => 'This is a really cool snippet located at core/components/awesome-package/elements/snippetes/myawesomesnippet.php'
  )
);
```

## Building Package
Assuming you answered yes when asked to create a config file, you're `_build/build.config.php` file should already be created. Simply execute `build.transport.php` like so to build your package:
```bash
php _build/build.transport.php
```

You'll find your package in the `core/packages` directory of your `MODX_BASE_PATH`.


