export default class Estimate {
    participant: string;
    estimates: EstimateValue;
}

export enum EstimateValue {
    XS, S, M, L, XL, XXL
}