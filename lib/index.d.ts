/// <reference types="node" />

import * as stream from 'stream'

export = stringify

declare function stringify(callback?: stringify.Callback): stringify.Stringifier
declare function stringify(options: stringify.Options, callback?: stringify.Callback): stringify.Stringifier
declare function stringify(input: stringify.Input, callback?: stringify.Callback): stringify.Stringifier
declare function stringify(input: stringify.Input, options?: stringify.Options, callback?: stringify.Callback): stringify.Stringifier
declare namespace stringify {
    type Callback = (err?: null | Error, output?: string) => void

    type RowDelimiter = string | 'auto' | 'unix' | 'mac' | 'windows' | 'ascii' | 'unicode'

    type Cast<T> = (value: T, context: CastingContext) => string

    type PlainObject<T> = Record<string, T>

    type Input = any[]

    interface ColumnOption {
        key: string
        header?: string
    }

    interface CastingContext {
        readonly column?: number | string;
        readonly header: boolean;
        readonly index: number;
        readonly records: number;
    }

    interface Options {
        /**
         * List of fields, applied when `transform` returns an object
         * order matters
         * read the transformer documentation for additionnal information
         * columns are auto discovered in the first record when the user write objects
         * can refer to nested properties of the input JSON
         * see the "header" option on how to print columns names on the first line
         */
        columns?: string[] | PlainObject<string> | ColumnOption[]

        /**
         * Set the field delimiter, one character only, defaults to a comma.
         */
        delimiter?: string

        /**
         * Add the value of "options.rowDelimiter" on the last line, default to true.
         */
        eof?: boolean

        /**
         * Defaults to the escape read option.
         */
        escape?: string

        /**
         * Display the column names on the first line if the columns option is provided or discovered.
         */
        header?: boolean

        /**
         * The quote characters, defaults to the ", an empty quote value will preserve the original field.
         */
        quote?: string

        /**
         * Boolean, default to false, quote all the non-empty fields even if not required.
         */
        quoted?: boolean

        /**
         * Boolean, no default, quote empty fields? If specified, overrides quotedString for empty strings.
         */
        quotedEmpty?: boolean

        /**
         * Boolean, default to false, quote all fields of type string even if not required.
         */
        quotedString?: boolean

        /**
         * String used to delimit record rows or a special value
         * special values are 'auto', 'unix', 'mac', 'windows', 'ascii', 'unicode'
         * defaults to 'auto' (discovered in source or 'unix' if no source is specified).
         */
        rowDelimiter?: RowDelimiter

        /**
         * Key-value object which defines custom cast for certain data types
         */
        cast?: {
            boolean?: Cast<boolean>
            date?: Cast<Date>
            number?: Cast<number>
            /**
             * Custom formatter for generic object values
             */
            object?: Cast<Record<string, any>>
        }
    }

    class Stringifier extends stream.Transform {
        constructor(options: Options)
    }
}
