---
title: ASP.NET Coreの使い方
description: ASP.NET Coreを使用した簡単なREST APIアプリケーション開発について解説します。C#プロジェクト作成からAPI作成までを解説します。
keyword:
    - "ASP.NET Core"
    - "C#"
    - "Webアプリケーション開発"
---

## ASP.NET Coreの使い方

### ASP.NET Coreとは？

ASP.NET Coreは、Microsoftが開発したクロスプラットフォームのWebアプリケーションフレームワークです。高パフォーマンスかつ軽量で、Linux、macOS、Windowsなど様々なプラットフォームで動作します。
Controller、Model、ViewのMVCパターンや軽量なMinimal APIなど、様々な開発スタイルに対応しています。

### ASP.NET Coreのセットアップ
今回は、Minimal APIを使用して簡単なREST APIアプリケーションを作成します。Minimal APIは、ASP.NET Core 6から導入された新しい開発スタイルで、コードの記述量が少なくなります。

1. .NET SDKのインストール - [.NET SDKのダウンロード](https://dotnet.microsoft.com/download)ページから最新のSDKをインストールします。
2. Minimal APIプロジェクトの作成
コマンドラインで以下のコマンドを実行します。
```bash
dotnet new web -o MinimalApiApp
cd MinimalApiApp
dotnet run
```

プロジェクトが起動し、ブラウザで http://localhost:5000 にアクセスできます。

### 基本的なルーティングの設定

Program.csファイルにエンドポイントを直接記述します。以下はシンプルな「Hello World」エンドポイントの例です。
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello, World!");

app.Run();
```

このように、MapGetメソッドを使用してHTTP GETリクエストに応答するエンドポイントを設定できます。他にもMapPost、MapPut、MapDeleteなどのメソッドが用意されています。

### エンドポイントの追加

クエリパラメータやルートパラメータを使って、さらに複雑なエンドポイントを追加することができます。

```csharp
app.MapGet("/greet/{name}", (string name) => $"Hello, {name}!");

app.MapPost("/square", (int number) => number * number);
```

- /greet/{name}では、URLの一部を変数として受け取り、nameを使って動的な応答を返します。
- /squareはPOSTリクエストを受け取り、JSONボディで送信された整数値を2乗して返します。

### 依存性注入 (DI)

Minimal APIでも依存性注入がサポートされています。サービスをProgram.csのbuilder.Servicesで登録し、エンドポイント内で利用できます。

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IMyService, MyService>();

var app = builder.Build();

app.MapGet("/service", (IMyService service) => service.GetMessage());
```
ここで、IMyServiceインターフェースとその実装MyServiceを依存性注入で使用しています。

### データベースとの連携

Entity Framework Coreを使ってデータベースと連携することも可能です。
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.MapGet("/products", async (MyDbContext db) => await db.Products.ToListAsync());
app.MapPost("/products", async (MyDbContext db, Product product) =>
{
    db.Products.Add(product);
    await db.SaveChangesAsync();
    return Results.Created($"/products/{product.Id}", product);
});
```
上記のコードは、GETリクエストで全てのProductを返し、POSTリクエストで新しいProductをデータベースに追加します。

### 認証と認可

Minimal APIでも認証と認可を設定できます。例えばJWTベースの認証を設定する場合、以下のように行います。
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://your-auth-server";
        options.Audience = "api";
    });

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/secure-data", () => "This is secure data").RequireAuthorization();
```
ここでは、JWT認証を設定し、/secure-dataエンドポイントに認可を要求しています。

### デプロイ方法

Minimal APIは、Docker、IIS、Azure、AWSなど、さまざまな環境に簡単にデプロイ可能です。Dockerを使う場合、プロジェクトフォルダにDockerfileを作成し、以下のように記述します。

```dockerfile
# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY MinimalApiApp/*.csproj ./MinimalApiApp/
RUN dotnet restore

# copy everything else and build app
COPY MinimalApiApp/. ./MinimalApiApp/
WORKDIR /source/MinimalApiApp
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "MinimalApiApp.dll"]
```

デプロイ先のプラットフォームに応じて、適切な設定を行いましょう。

### 終わりに

以上で、ASP.NET Coreの基本的な使い方について解説しました。Minimal APIを使うことで、簡潔なコードでREST APIを作成できます。ぜひ、実際に開発してみてください。
