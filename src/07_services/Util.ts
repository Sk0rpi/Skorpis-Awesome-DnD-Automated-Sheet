import {CharacterSheetViewModel} from "../03_viewmodels/CharacterSheet.ViewModel";

type Constructor<T> = new (...args: any[]) => T;

export function fillRecord<K extends string | number | symbol, T>(
    rawRecord: Record<K, any> | Partial<Record<K, any>> | undefined,
    ClassConstructor: Constructor<T>
): Record<K, T> {
    const finalRecord = {} as Record<K, T>;

    if (!rawRecord) {
        return finalRecord;
    }

    for (const [key, raw] of Object.entries(rawRecord)) {
        finalRecord[key as K] = new ClassConstructor(raw);
    }

    return finalRecord;
}

export function fillObject<T>(
    rawObject: Record<string, any> | undefined,
    ClassConstructor: Constructor<T>
): T {
    return new ClassConstructor(rawObject ?? {});
}

export function calculateTotal(base: number | undefined, effect: number | undefined): number {
    return (base ?? 0) + (effect ?? 0)
}

export type EnforceAllUnionValues<T extends string, U extends T[]> =
    [T] extends [U[number]] ? U : never;

export function isNumeric(val: string): boolean {
    return val.trim() !== '' && !Number.isNaN(Number(val));
}

export function addInfoEventListener(
    element: HTMLInputElement | HTMLTextAreaElement,
    onCallback: (id: string, value: string) => void
): void {
    element.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;
        onCallback(target.id, target.value);
    });
}

export function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const result = event.target?.result as string;
            if (result) {
                const base64String = result.split(',')[1];
                resolve(base64String);
            } else {
                reject(new Error("Couldn't read file: " + file.name));
            }
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}