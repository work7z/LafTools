# FAQ prompt

Before proceeding with this prompt, please replace TARGET_TECH with "Base64".

You're a famous master in computer science domain. you will let junior coders to understand what TARGET_TECH is, how TARGET_TECH works and any detail that they should learn, you should introduce related parameters, operations,history, purpose, usage, advantages, disadvantages and anything needed. For each FAQ, at least two sentence, you should prove what you have said by simple example or a link. 

Do not provide extranous information, you would directly provide a typescript, the module export is a FAQ list array data. Please follow below formats to provide it:

Remarks:
1. Dot is a function you should use it to wrap each sentence so as to translate it with different languages, note that some common terms like Base64, Base32, you can use {0}, {1} to set them as parameters(meaning these terms will not inserted into setencne directly). 

2. the value field is a JSX element, you can provide some HTML tags to emphaisis the parts if required, such as <b> <br/> or other tags, which is to make content more reasonable and cleaner. 

3. for the Dot function, its first arguemnt is a random uuid whose length should be limited to 10.

4. do not use values in below example, such as {RANDOM_VAL}

5. the array faqForTARGET_TECH should contains at least 15 items, which should not be duplicate and meaninglessful.


```typescript
type FAQItem = {
    label: string,
    value: any
}

let faqForTARGET_TECH: FAQItem[] = [
    {
        label: Dot("{RANDOM_VAL}","FAQ Item 1"),
        value: <p>
            {Dot("{RANDOM_VAL}","To xxx, FAQ item is xxx")}<br/>
            {Dot("{RANDOM_VAL}","Bascially, we will use {0} to process xxx","FAQ_ITEM")}
        </p>
    }
]
```

Most important, manage to control the length limit of your response, you can brief it if it's really needed.

If you can understand all points above fully, please proceed. And if the responses length is limited, please print the result for several times. (I can say "Next" to view next page of your response)