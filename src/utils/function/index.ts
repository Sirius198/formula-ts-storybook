
export interface FunctionTree {
    id: number;
    name: string;
    parent: number;
}

export interface FunctionParameter {
    name: string;
    type: "number" | "date" | "text" | "boolean";
}

export interface FunctionItem {
    id: number;
    pid: number;
    name: string;
    desc: string;
    params: FunctionParameter[];
}

export const fnTree: FunctionTree[] = [
    { id: 1, name: 'Convert', parent: 0 },
    { id: 2, name: 'Date & Time', parent: 0 },
    { id: 3, name: 'Filter', parent: 0 },
    { id: 4, name: 'Info', parent: 0 },
    { id: 5, name: 'Logical', parent: 0 },
    { id: 6, name: 'Math', parent: 0 },

    // Level 2
    { id: 7, name: 'Angle', parent: 6 },
    { id: 8, name: 'Ceiling', parent: 6 },
    { id: 9, name: 'Convert', parent: 6 },
    { id: 10, name: 'Floor', parent: 6 },
    { id: 11, name: 'Random', parent: 6 },

    // Level 3
    { id: 12, name: 'Cosecant', parent: 7 },
    { id: 13, name: 'Cosine', parent: 7 },
    { id: 14, name: 'Sine', parent: 7 },
];

export const fnItems: FunctionItem[] = [
    {
        id: 1, name: 'ACOS', desc: 'Inverse Cosine', pid: 13, params: [
            { name: 'N1', type: 'number' },
            { name: 'D1', type: 'date' },
            { name: 'T1', type: 'text' },
            { name: 'B1', type: 'boolean' },
        ]
    },
    {
        id: 2, name: 'ACOSH', desc: 'Inverse Hyperbolic Cosine', pid: 13, params: [
            { name: 'N2', type: 'number' },
            { name: 'D2', type: 'number' },
            { name: 'T2', type: 'text' },
            { name: 'B2', type: 'boolean' },
        ]
    },
    {
        id: 3, name: 'COS', desc: 'Cosine of an Angle', pid: 13, params: [
            { name: 'N3', type: 'number' },
            { name: 'D3', type: 'date' },
            { name: 'T3', type: 'date' },
            { name: 'B3', type: 'boolean' },
        ]
    },
    {
        id: 4, name: 'COSH', desc: 'Hyperbolic cosine', pid: 13, params: [
            { name: 'N4', type: 'number' },
            { name: 'D4', type: 'date' },
            { name: 'T4', type: 'text' },
            { name: 'B4', type: 'text' },
        ]
    },
];