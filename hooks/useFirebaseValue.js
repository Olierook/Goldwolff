import { useEffect, useState } from "react";
import { useDb } from "./../context/dbContext";


export const useFirebaseValue = (string, defaultValue) => {
    const { db, ref, set, onValue } = useDb();
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const thisRef = ref(db, string);

        onValue(thisRef, (e) => {
            const data = e.val();
            if (JSON.stringify(data) !== JSON.stringify(value)) {
                console.log({ data, value });
                setValue(data);
            }
        });
    })




    const updateValue = (v) => {
        set(thisRef, v);
    };

    return [value, updateValue];
};

/*Shortcuts for common usage
export const useVideo = () => useValue("video");
export const useSomthingNested = () => useValue("config/something");
export const useSomethingVariabellyNested = (variable) => useValue(`${variable}/something`);
*/