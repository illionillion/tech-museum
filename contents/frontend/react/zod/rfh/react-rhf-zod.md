---
title: 【ReactHookForm✖️zod】 FormProviderで簡単フォーム実装"
description: 説明
keyword:
  - "react" # キーワード
---

---

title: "【ReactHookForm✖️zod】 FormProviderで簡単フォーム実装"
emoji: "💭"
type: "tech"
topics:

- "javascript"
- "react"
- "typescript"
  published: true
  published_at: "2024-05-04 06:11"

---

ReactHookForm の FormProvider と zod を用いてバリデーションやエラーメッセージの管理など実装していきます。

## 使用するライブラリ

https://www.npmjs.com/package/zod
https://www.npmjs.com/package/react-hook-form
https://www.npmjs.com/package/@hookform/resolvers

## FormProvider の実装

FormProvider を使うことで複数のフォームの状態やメソッドを管理しやすくなります。
zodResolver で後述する zodSchema の適応を行い、バリデーションやエラーメッセージの設定を可能にします。

```tsx
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

function App() {
  const methods = useForm({
    //zodResolverでスキーマを指定
    resolver: zodResolver(sampleFormSchema),
  })
  const { handleSubmit } = methods
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <InputField name="input" />
        <SelectField name="select" />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}
```

## スキーマの作成

ここで zod を使用してバリデーションやエラーメッセージを設定していきます。

```tsx
import { z } from "zod"

const sampleFormSchema = z.object({
  input: z.string().nonempty({
    message: "inputは必須です",
  }),
  select: z.string().nonempty({
    message: "selectは必須です",
  }),
})
```

## 各フィールドコンポーネントの作成

React Hook Form の useFormContext を使用すると、メソッドを呼び出したりフォーム全体で状態を共有できるようになります。
今回は register メソッドを使って props で受け取った key で form に値を渡していきます。

formState を利用して先程設定した message を取り出して error として表示させます。

### Select

```tsx
import { useFormContext } from "react-hook-form"

type Props = {
  name: string
}
function SelectField(props: Props) {
  const methods = useFormContext()
  return (
    <>
      <select {...methods.register(props.name)}>
        {["", "one", "two", "three"].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      {methods.formState.errors[props.name] && (
        <p>{methods.formState.errors[props.name]?.message as string}</p>
      )}
    </>
  )
}
```

### Input

```tsx
import { useFormContext } from "react-hook-form"

type Props = {
  name: string
}
function InputField(props: Props) {
  const methods = useFormContext()
  return (
    <div>
      <input {...methods.register(props.name)} />
      {methods.formState.errors[props.name] && (
        <p>{methods.formState.errors[props.name]?.message as string}</p>
      )}
    </div>
  )
}
```

## サンプルリポジトリ

https://github.com/taku10101/reacthookform-example

## 参考文献

https://react-hook-form.com/docs/formprovider

https://react-hook-form.com/docs/useformcontext

https://react-hook-form.com/docs/useformstate#useFormRef
