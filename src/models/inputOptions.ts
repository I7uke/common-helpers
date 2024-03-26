export interface InputOptions<Value, DefaultValue> {
    /**
    * Значение для проверки
    */
    readonly value: Value;
    /**
     * Значение по умолчанию, будет возвращено, если переданное значение не прошло проврку
     */
    readonly defaultValue?: DefaultValue;
}