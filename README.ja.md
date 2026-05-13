[English](./README.md) | 日本語

# リンク取得

リンク取得は現在のページのURLとタイトルをMarkdownやHTMLなどの形式でクリップボードにコピーする。

Chromium系のWebブラウザで使用できる。

## インストール

[リンク取得 - Chrome ウェブストア](https://chromewebstore.google.com/detail/%E3%83%AA%E3%83%B3%E3%82%AF%E5%8F%96%E5%BE%97/jjojpplkebencpghmklalgeiemcapkpe)

## ビルド

```bash
$ npm i
$ npm run zip
```

`.output`ディレクトリに成果物が格納される。

## 動作確認観点

- `npm run zip`に成功すること
- 拡張機能をインストールできること
- リンクが表示されること
- リンクをコピーできること
- クエリパラメータの設定を無効にしたとき、リンクからクエリパラメータが省略されること
- リンクの一覧を取得できること
- リンクの一覧をコピーできること
- ページ内のリンクを右クリックしたとき、リンクをコピーできること
- Webブラウザの言語を英語に変えたとき、UIが英語になること
