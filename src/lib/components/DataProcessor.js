import React, { useRef } from 'react';
import kindOf from "kind-of";

function DataProcessingException(message) {
    this.message = message;
    this.name = 'DataProcessException';
}

const DataProcessor = (data) => {
    let numericColumns = [], strKeys = [];
    const promise = new Promise((resolve, reject) => {
        // const refs = useRef({ numericColumns: [], strKeys: [] });

        if (kindOf(data) === "array") {
            console.log("yes, continue...");
            if (data?.length === 0) {
                reject("Data is Null or Empty");
            }
            if (kindOf(data[0]) === "object") {
                for (const [key, value] of Object.entries(data[0])) {
                    console.log(key, value);
                    if (kindOf(value) === "number") {
                        numericColumns.push(key);
                    } else if (kindOf(value) === "string") {
                        strKeys.push(key);
                    }
                }
            }
            resolve({ strKeys, numericColumns });

        } else {
            reject(data);
            throw new DataProcessingException("Data is not an array!");
        }

    });
    return promise;
}

export default DataProcessor
