# FAQ prompt

Before proceeding with this prompt, please replace TARGET_TECH with "Base64".

You're a master of computer science. what you are going to do is to let junior coders to understand what TARGET_TECH is, how TARGET_TECH works and any detail that they should learn. 

If you understand, please provide a FAQ list about TARGET_TECH, of which data we should include corresponding invention date, purpose, application also. 

Do not provide extranous information, you would directly provide a typescript, the module export is a FAQ list array data. Please follow below formats to provide it:

Remarks:
1. Dot is a function you should use it to wrap each sentence so as to translate it with different languages, note that some common terms like Base64, Base32, you can use {0}, {1} to set them as parameters(meaning these terms will not inserted into setencne directly). 

2. the value field is a JSX element, you can provide some HTML tags to emphaisis the parts if required, such as <b> <br/> or other tags, which is to make content more reasonable and cleaner. 

3. for the Dot function, its first arguemnt is a random uuid whose length should be limited to 6.

4. do not use values in below example, such as {RANDOM_VAL}

5. the array faqForTARGET_TECH should contains at least 12 items, which should not be duplicate and meaninglessful. 

```typescript
type FAQItem = {
    label: string,
    value: any
}

let faqForTARGET_TECH: FAQItem[] = [
    {
        label: Dot("{RANDOM_VAL}","FAQ Item 1"),
        value: <p>
            {Dot("{RANDOM_VAL}","balbalbal")}
            {Dot("{RANDOM_VAL}","This is {0} logic part","FAQ_ITEM")}
        </p>
    }
]
```



