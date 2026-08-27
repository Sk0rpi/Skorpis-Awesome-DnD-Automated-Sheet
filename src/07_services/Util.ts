type Constructor<T> = new (data: any) => T;
export function fillRecord<T>( rawRecord: Record<string, any>, ClassConstructor: Constructor<T>): Record<string, T> {
    if (!rawRecord) return;

    const finalRecord: Record<string, T> = {};

    for (const [key, raw] of Object.entries(rawRecord)) {
        finalRecord[key] = new ClassConstructor(raw);
    }

    return finalRecord;
}

export function fillObject<T>(
    rawObject: Record<string, any> | undefined,
    ClassConstructor: Constructor<T>
): T {
    return new ClassConstructor(rawObject ?? {});
}
