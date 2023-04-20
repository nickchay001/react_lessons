export type FielValidatorType = (value: string) => string | undefined


export const required: FielValidatorType = (value) => {
    if (value) return undefined;
    return "Field is required";
}

export const maxLengthCreator = (maxLength:number):FielValidatorType => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}
