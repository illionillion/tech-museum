---
title: 技術記事サイトのTech.museumとは
description: Tech.museumとは何なのかや何が他の技術記事サイトと異なるのかについて解説します。
keyword:
  - 技術記事
  - アプトプット
  - Tech.museum
contributors:
  - id: 60034520
    login: illionillion
    avatar_url: "https://avatars.githubusercontent.com/u/60034520?v=4"
    html_url: "https://github.com/illionillion"
  - id: 56211510
    login: SEKI-YUTA
    avatar_url: "https://avatars.githubusercontent.com/u/56211510?v=4"
    html_url: "https://github.com/SEKI-YUTA"
latest_date: "2024-09-19"
slug: tech-museum/what-is-tech-museum
---

# 技術記事サイトのTech.museumとは

## いきなりですが、こんな経験はありませんか！？

- 参考にした技術記事が古くてやり方が変わっていた🥺
- 参考にした技術記事の内容が間違っていた😭

これらの問題を解決するために、私たちはOSS(Open Source Software)の仕組みを活用してみんなが著者であり、読者である技術記事サイト`Tech.museum`を開発しました。

## 従来の技術記事サイトの問題

- 記事の内容が古いままである
- 記事の内容が間違っている
- 勝手に記事が削除される
  etc...

## どうやって解決するのか？

- 記事の内容が古い
  OSS形式で記事を作成することで、誰でも記事を編集できるようになります。そのため、記事の内容が古くなっていた場合でも、気づいた人が新しい情報に更新することができます。

- 記事の内容が間違っている
  記事を投稿する際にプルリクエストを挟みレビューを受けることで、間違いを含んだ記事を公開してしまう可能性を抑えることができます。

- 勝手に記事が削除される
  中央集権ではなく、みんなが記事を作成・編集できるOSS形式でのオープンな運営することで、勝手に記事が削除されることを防ぎます。

## Tech.museumの優れている点

- 記事の質を保ちやすい
- 自分が書いた記事をレビューしてもらえる
- オープンな運営なので、記事が勝手に削除されるなどの事がおきない
- OSSコントリビュートの練習にもなる

## 記事投稿までの流れ

1. このリポジトリをフォークします。
2. フォークしたリポジトリをクローンします。
3. **記事を作成**
4. プルリクエストを作成
5. レビュー受け、必要があれば修正を行う
   3番以外は、従来のOSSへのコントリビュートと同じですね！
   ここでは3番の記事の作成について詳しく解説します。

### 記事の作成

Tech.museumでは記事の雛形を生成するコマンドラインツールが用意されているので、それを使って記事を作成します。

#### `pnpm run gen:article`コマンドを実行する

```
pnpm run gen:article
```

上記のコマンドをターミナルで実行すると以下のような出力がされます。
<img src="https://github.com/user-attachments/assets/9e1c50cd-3ddc-4591-b7b6-ada9a97c2b80">

#### 記事のトップカテゴリを選択する

上記の画像では、

- backend
- frontend
- git
- infra
- mobile
- tech-museum
  のカテゴリがあります。
  もし、これらのカテゴリに当てはまらない場合は、一番下にある`Create new folder`を選択して新しいトップカテゴリを作成します。
  今回の例では`mobile`を選択します。

#### 記事のサブカテゴリを選択する

<img src="https://github.com/user-attachments/assets/05a26f2f-49f8-42e6-9fbe-0ecb1fe9af9a">
先ほど選択したカテゴリの中のサブカテゴリが表示されます。
カテゴリをネストする事ができるので、当てはまるものがなければ`Create new folder`を選択して新しいサブカテゴリを作成する事ができます。
今回の例では、`android`を選択します。

#### 記事のタイトルを入力する

<img src="https://github.com/user-attachments/assets/ddb0eebf-c781-46d7-bf80-42b3c7ab8907">
そして`Create new markdown file`を選択して、記事のタイトルを入力します。
<img src="https://github.com/user-attachments/assets/04694465-df8d-4030-9d67-f5f756d11a78">
今回は記事のタイトルを`android-wear-os-basic`としています。

#### 生成した記事の雛形を編集

<img src="https://github.com/user-attachments/assets/9818e95b-511d-4d01-92ae-e3bfad8ffe1b">
生成された記事はこのようになっています。

`---`で囲まれた部分は、記事のメタ情報です。
メタ情報は以下のようになっています。

- title: 記事のタイトル(例：Android Wear OS開発の基本)
- description: スマートフォン向けの開発との違いを確認しつつ簡単なWearOSのアプリを開発します。
- keyword: 記事のキーワード(例：Android, WearOS, Kotlinなど複数可)

## まとめ

Tech.museumは従来の技術記事サイトの`情報が古い`や`間違っている`といった問題を解決する事ができます。
また、OSSの仕組みで記事を投稿するのでOSSコントリビュートの練習にもなる！
