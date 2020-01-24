# eslint-plugin-ember-linter

Ensures Discourse ember stays clean

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ember-linter`:

```
$ npm install eslint-plugin-ember-linter --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ember-linter` globally.

## Usage

Add `ember-linter` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ember-linter"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ember-linter/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





