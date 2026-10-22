export type OrderBoolean = 'false-true' | 'true-false';
export type OrderNumber = '0-9' | '9-0';
export type OrderString = 'a-z' | 'z-a';
export type OrderOfInvalidValue = 'last' | 'first';

type SordFieldExtractor<TItem, TValue> = (item: TItem)=> TValue | null | undefined;

export interface SortParams<TItem, TValue, TOrder> {
    readonly array: TItem[] | undefined | null;
    readonly order: TOrder;
    readonly orderOfInvalidValue?: OrderOfInvalidValue;
    readonly field: SordFieldExtractor<TItem, TValue>;
}