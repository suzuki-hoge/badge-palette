# Badge Palette

<img src="./doc/logo-border.png" alt="logo" width="150px">

GitHub のテキストエリアで [badge](https://shields.io/badges/static-badge) が挿入できるポップアップをひらく Chrome 拡張です。

## スクリーンショット

### 使用例

1️⃣ テキストエリア編集中に `Control + b` でポップアップをひらく

![capture1](./doc/select.png)

2️⃣ 色まで決まるととじるのでプレビューする

![capture2](./doc/preview.png)

### 設定

1️⃣ ブラウザ URL バー付近の Chrome 拡張アイコンをクリック

<img src="./doc/icon-guide.jpg" alt="icon" height="60px">

<img src="./doc/popup.png" alt="capture3" width="300px">

2️⃣ キーコンフィグを変更

任意のキーを設定する

3️⃣ 選択肢を編集

テキストと色を選択して追加

テキストによる一括編集も可能

<img src="./doc/bulk.png" alt="bulk" width="300px">

✏️ フォーマット

```
random-string:color-hex:text
```

🎨 サンプル

```
b83ab59d:eb144c:must
a316ae90:f78da7:should
07600fd1:fcb900:suggest
9fc06b2b:abb8c3:nits
c2fef737:7bdcb5:imo
25d6a61a:ff6900:ask
2614b25f:00D084:good
23234714:8ed1fc:tweet
```

## インストール

ストアには公開していません。ご利用はご自身の責任で行ってください。

1️⃣ 本番ビルドをダウンロード ( もしくは下部手順でビルド )

[suzuki-hoge/badge-palette/releases](https://github.com/suzuki-hoge/badge-palette/releases/tag/1.0.0)

2️⃣ 拡張機能ページ ( `chrome://extensions` ) をひらく

3️⃣ `デベロッパーモード` の `パッケージ化されていない拡張機能を読み込む` ボタンをクリック

![chrome](./doc/chrome-guide.jpg)

4️⃣ ダウンロードもしくはビルドした `dist` ディレクトリを選択

## 開発者向け

### 開発ビルド

開発サーバの起動と `dist` ディレクトリの作成

```
$ yarn dev
```

ホットリロードします。

開発サーバを起動していないと拡張機能は動作しません。

### 本番ビルド

`dist` ディレクトリの作成

```
$ yarn build
```
