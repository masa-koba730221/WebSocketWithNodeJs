
# Typescript環境構築メモ

## 1. モジュールのインストール

```
> npm init -y
> npm install tslint -g
> npm install typescript -g

> npm install --save-dev typescript ts-loader tslint tslint-loader tslint-config-airbnb
> npm i --save @types/node
> npm install --save express
> npm install --save-dev @types/express
> npm install tsc-watch --save-dev
```

## 2. tsconfig.jsonの作成

```bash
> tsc --init
```

## 3. tslint.jsonの作成

```bash
> tslint --init
```

## 4. tslit.jsonの編集

```json
{
    "defaultSeverity": "error",
    "extends": [
        "tslint-config-airbnb"
    ],
    "jsRules": {},
    "rules": {
        "max-line-length": [true, 120],
        "object-shorthand-properties-first": false,
        "radix": false,
        "ter-arrow-parens": false
    },
    "rulesDirectory": []
}
```

## 5. tsconfig.jsonの編集

```json
...
  "scripts": {
    "run": "tsc-watch --onSuccess 'node ./dist/server.js'",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```