# リンク取得

リンク取得は表示中の Web ページのリンクをプレーンテキスト形式、HTML 形式、Markdown 形式、Textile 形式で取得できる Chrome 拡張機能である。

Chromium 系の Web ブラウザで使用できる。

## インストール

[リンク取得 - Chrome ウェブストア](https://chromewebstore.google.com/detail/%E3%83%AA%E3%83%B3%E3%82%AF%E5%8F%96%E5%BE%97/jjojpplkebencpghmklalgeiemcapkpe)

## ビルド

```bash
$ npm i
$ npm run build
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
