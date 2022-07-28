
export interface FunctionTree {
	id: number;
	name: string;
	parent: number;
}

export interface FunctionParameter {
	name: string;
	type: "Number" | "Date" | "String" | "Boolean" | "Array" | "All";
	optional?: string;  // determine whether parameter is optional or not.
	default?: number | boolean;
	min?: number; // for numeric
	max?: number; // for numeric
	values?: string[];
	variable?: boolean; // The number of this parameter can be increased or decreased
	hideCol?: boolean;
}

export interface FunctionItem {
	id: number;
	parent: number;
	name: string;
	desc: string;
	return: string;
	params: FunctionParameter[];
}

export const fnTree: FunctionTree[] = [
	// Level 1
	{ id: 1, name: 'Convert', parent: 0 },
	{ id: 2, name: 'Date & Time', parent: 0 },
	// { id: 3, name: 'Filter', parent: 0 },
	{ id: 4, name: 'Info', parent: 0 },
	{ id: 5, name: 'Logical', parent: 0 },
	{ id: 6, name: 'Lookup', parent: 0 },
	{ id: 7, name: 'Math', parent: 0 },
	{ id: 8, name: 'Rollup', parent: 0 },
	{ id: 9, name: 'Statistical', parent: 0 },
	{ id: 10, name: 'Text', parent: 0 },

	// Level 2
	// Sub-categories in Convert
	{ id: 11, name: 'Case', parent: 1 },
	{ id: 12, name: 'Format', parent: 1 },
	{ id: 13, name: 'Math', parent: 1 },
	{ id: 14, name: 'Return', parent: 1 },
	{ id: 15, name: 'Type', parent: 1 },

	// Sub-categories in Date & Time
	{ id: 21, name: 'Date', parent: 2 },
	{ id: 22, name: 'Day', parent: 2 },
	{ id: 23, name: 'Week', parent: 2 },
	{ id: 24, name: 'Month', parent: 2 },
	{ id: 25, name: 'Year', parent: 2 },
	{ id: 26, name: 'Time', parent: 2 },
	{ id: 27, name: 'Value', parent: 2 },

	// Sub-categories in Filter
	{ id: 31, name: 'Filter', parent: 3 },
	{ id: 32, name: 'Sort', parent: 3 },
	{ id: 33, name: 'Unique', parent: 3 },

	// Sub-categories in Info
	{ id: 41, name: 'Is', parent: 4 },
	{ id: 42, name: 'Data', parent: 4 },

	// Sub-categories in Logical
	// { id: 51, name: 'If', parent: 5 },
	// { id: 52, name: 'Operator', parent: 5 },
	{ id: 53, name: 'Compare', parent: 5 },
	{ id: 54, name: 'Return', parent: 5 },

	// Sub-categories in Lookup
	{ id: 61, name: 'Lookup', parent: 6 },
	{ id: 62, name: 'Return', parent: 6 },

	// Sub-categories in Math
	{ id: 71, name: 'Angle', parent: 7 },
	{ id: 72, name: 'Map', parent: 7 },
	{ id: 73, name: 'Odd/Even', parent: 7 },
	{ id: 74, name: 'Operator', parent: 7 },
	{ id: 75, name: 'Positive Square Root ', parent: 7 },
	{ id: 76, name: 'Random', parent: 7 },
	{ id: 77, name: 'Return', parent: 7 },
	{ id: 77, name: 'Round', parent: 7 },
	{ id: 77, name: 'Sum', parent: 7 },
	//   Sub-categories of Angle
	{ id: 710, name: 'Cosecant', parent: 71 },
	{ id: 711, name: 'Cosine', parent: 71 },
	{ id: 712, name: 'Cotangent', parent: 71 },
	{ id: 713, name: 'Secant', parent: 71 },
	{ id: 714, name: 'Sine', parent: 71 },
	{ id: 715, name: 'Tangent', parent: 71 },

	// Sub-categories in Rollup
	{ id: 81, name: 'Average', parent: 8 },
	{ id: 82, name: 'Count', parent: 8 },
	{ id: 83, name: 'Sum', parent: 8 },

	// Sub-categories in Statistical
	{ id: 91, name: 'Average', parent: 5 },
	{ id: 92, name: 'Min', parent: 9 },
	{ id: 93, name: 'Max', parent: 9 },
	{ id: 94, name: 'Value', parent: 9 },

	// Sub-categories in Text
	{ id: 101, name: 'Case', parent: 10 },
	{ id: 102, name: 'Convert', parent: 10 },
	{ id: 103, name: 'Info', parent: 10 },
	{ id: 104, name: 'Find', parent: 10 },
	{ id: 105, name: 'Join', parent: 10 },
	{ id: 106, name: 'Replace', parent: 10 },
	{ id: 107, name: 'Substring', parent: 10 },
	{ id: 108, name: 'Trim', parent: 10 },
];

export const fnItems: FunctionItem[] = [

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////// Functions in Convert Category. ///////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Case
	{
		id: 110, name: 'LOWER', parent: 11, desc: 'Convert a specified string to lowercase', return: 'Text', params: [
			{ name: 'text', type: 'String' }
		]
	},
	{
		id: 111, name: 'PROPER', parent: 11, desc: 'Capitalizes each word in a specified string', return: 'Text', params: [
			{ name: 'text to capitalize', type: 'String' }
		]
	},
	{
		id: 112, name: 'UPPER', parent: 11, desc: 'Uppercase', return: 'Text', params: [
			{ name: 'text', type: 'String' }
		]
	},
	{
		id: 113, name: 'TRUECASE', parent: 11, desc: 'Truecasing is proper capitalization of words', return: 'Text', params: [
			{ name: 'text', type: 'String' }
		]
	},

	// Format
	{
		id: 120, name: 'FIXED', parent: 12, desc: 'Formats a number with a fixed number of decimal places.', return: 'Number', params: [
			{ name: 'number', type: 'Number' },
			{ name: 'number of places', type: 'Number', default: 2, min: 0, max: 20 },
			{ name: 'suppress separator', type: 'Boolean', optional: "true" }
		]
	},

	// Math
	{
		id: 130, name: 'DECIMAL', parent: 13, desc: 'Convert the text representation of a number in another base, to base 10 (decimal)', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
			{ name: 'base', type: 'Number', min: 2, max: 36 }
		]
	},
	{
		id: 131, name: 'DEGREES', parent: 13, desc: 'Converts an angle value in radians to degrees', return: 'Number', params: [
			{ name: 'angle', type: 'Number' }
		]
	},
	{
		id: 132, name: 'RADIANS', parent: 13, desc: 'Convert an angle value in degrees to radians', return: 'Number', params: [
			{ name: 'angle', type: 'Number' }
		]
	},
	{
		id: 133, name: 'BASE', parent: 13, desc: 'Convert a number into a text representation in another base', return: 'Text', params: [
			{ name: 'value', type: 'Number' },
			{ name: 'base', type: 'Number', min: 2, max: 36, default: 2 },
			{ name: 'min length', type: 'Number', optional: "true", min: 1, max: 12, default: 0 },
		]
	},

	// Return
	{
		id: 140, name: 'CODE', parent: 14, desc: 'Returns the numeric Unicode map value of the first character in the string provided', return: 'Number', params: [
			{ name: 'string', type: 'String' }
		]
	},

	// Type
	{
		id: 150, name: 'CHAR', parent: 15, desc: 'Convert a number into a character according to the current Unicode table', return: 'Text', params: [
			{ name: 'number', type: 'Number' },
			{ name: 'repeat', type: 'Number' },
		]
	},
	{
		id: 151, name: 'CONVERT', parent: 15, desc: 'Convert a numeric value to a different unit of measure', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
			{ name: 'start unit', type: 'Number' },
			{ name: 'end unit', type: 'Number' },
		]
	},
	{
		id: 152, name: 'ROMAN', parent: 15, desc: 'Formats a number in Roman numerals', return: 'Text', params: [
			{ name: 'number', type: 'Number' },
			{ name: 'rule relaxation', type: 'Number', min: 0, max: 4, default: 0 }
		]
	},
	{
		id: 153, name: 'TO DATE', parent: 15, desc: 'Convert a provided number to a date', return: 'Date', params: [
			{ name: 'value', type: 'Number' }
		]
	},
	{
		id: 154, name: 'TO PURE NUMBER', parent: 15, desc: 'Converts a provided date/time, percentage, currency or other formatted numeric value to a pure number without formatting', return: 'Number', params: [
			{ name: 'value', type: 'String' }
		]
	},
	{
		id: 155, name: 'TO TEXT', parent: 15, desc: 'Converts a provided numeric value to a text value', return: 'Text', params: [
			{ name: 'value', type: 'Number' }
		]
	},
	{
		id: 156, name: 'TEXT', parent: 15, desc: 'Converts a number into text according to a specified format', return: 'Text', params: [
			{ name: 'number', type: 'Number' },
			{ name: 'format', type: 'String' },
		]
	},
	{
		id: 157, name: 'VALUE', parent: 15, desc: 'Converts a string in any of the date, time or number formats that Google Sheets understands into a number', return: 'Number', params: [
			{ name: 'text', type: 'String' }
		]
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////// Functions in Date & Time Category /////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Date
	{
		id: 210, name: 'DATE', parent: 21, desc: 'Converts a provided year, month, and day into a date', return: 'Date', params: [
			{ name: 'year', type: 'Number' },
			{ name: 'month', type: 'Number' },
			{ name: 'day', type: 'Number' },
		]
	},
	{
		id: 211, name: 'DATEDIF', parent: 21, desc: 'Calculates the number of days, months, or years between two dates', return: 'Number', params: [
			{ name: 'start date', type: 'Date' },
			{ name: 'end date', type: 'Date' },
			{ name: 'unit', type: 'String', values: ["Y", "M", "D", "MD", "YM", "YD"] },
		]
	},
	{
		id: 212, name: 'DATEVALUE', parent: 21, desc: 'Converts a provided date string in a known format to a date value', return: 'Date', params: [
			{ name: 'date string', type: 'String' },
		]
	},
	{
		id: 213, name: 'EDATE', parent: 21, desc: 'Returns a date a specified number of months before or after another date', return: 'Date', params: [
			{ name: 'start date', type: 'Date' },
			{ name: 'months', type: 'Number' },
		]
	},

	// Day
	{
		id: 220, name: 'DAY', parent: 22, desc: 'Returns the day of the month that a specific date falls on, in numeric format', return: 'Number', params: [
			{ name: 'date', type: 'Date' },
		]
	},
	{
		id: 221, name: 'DAYS', parent: 22, desc: 'Returns the number of days between two dates', return: 'Number', params: [
			{ name: 'start date', type: 'Date' },
			{ name: 'end date', type: 'Date' },
		]
	},
	{
		id: 222, name: 'NETWORKDAYS', parent: 22, desc: 'Returns the number of net working days between two provided days', return: 'Number', params: [
			{ name: 'start date', type: 'Date' },
			{ name: 'end date', type: 'Date' },
			{ name: 'holidays', type: 'Array', optional: "true" }
		]
	},
	{
		id: 223, name: 'WORKDAY', parent: 22, desc: 'End Date After X Working Days', return: 'Date', params: [
			{ name: 'start date', type: 'Date' },
			{ name: 'num days', type: 'Number' },
			{ name: 'holidays', type: 'Array', optional: "true" },
		]
	},

	// Week
	{
		id: 230, name: 'WEEKDAY', parent: 23, desc: 'Returns a number representing the day of the week of the date provided', return: 'Number', params: [
			{ name: 'date', type: 'Date' },
			{ name: 'type', type: 'Number', min: 1, max: 3 },
		]
	},
	{
		id: 231, name: 'WEEKNUM', parent: 23, desc: 'Returns a number representing the week of the year where the provided date falls', return: 'Number', params: [
			{ name: 'date', type: 'Date' },
			{ name: 'type', type: 'Number', optional: "true", min: 1, max: 3 },
		]
	},

	// Month
	{
		id: 240, name: 'EOMONTH', parent: 24, desc: 'Returns a date representing the last day of a month which falls a specified number of months before or after another date', return: 'Date', params: [
			{ name: 'start date', type: 'Date' },
			{ name: 'months', type: 'Number' },
		]
	},

	// Year
	{
		id: 250, name: 'Year', parent: 25, desc: '	Returns the year specified by a given date', return: 'Number', params: [
			{ name: 'date', type: 'Date' },
		]
	},

	// Time
	{
		id: 260, name: 'HOUR', parent: 26, desc: 'Returns the hour component of a specific time, in numeric format', return: 'Number', params: [
			{ name: 'time', type: 'Date' },
		]
	},
	{
		id: 261, name: 'MINUTE', parent: 26, desc: 'Returns the minute component of a specific time, in numeric format', return: 'Number', params: [
			{ name: 'time', type: 'Date' },
		]
	},
	{
		id: 262, name: 'MONTH', parent: 26, desc: 'Returns the month of the year a specific date falls in, in numeric format', return: 'Number', params: [
			{ name: 'date', type: 'Date' },
		]
	},
	{
		id: 263, name: 'SECOND', parent: 26, desc: 'Returns the second component of a specific time, in numeric format', return: 'Number', params: [
			{ name: 'time', type: 'Date' },
		]
	},
	{
		id: 264, name: 'TIME', parent: 26, desc: 'Convert Numbers Into Time', return: 'Date', params: [
			{ name: 'hour', type: 'Number' },
			{ name: 'minute', type: 'Number' },
			{ name: 'second', type: 'Number' },
		]
	},
	{
		id: 265, name: 'TIMEVALUE', parent: 26, desc: 'Returns the fraction of a 24-hour day the time represents', return: 'Date', params: [
			{ name: 'time string', type: 'Date' },
		]
	},

	// Value
	{ id: 270, name: 'NOW', parent: 27, desc: 'Returns the current date and time as a date value', return: 'Date', params: [] },
	{ id: 271, name: 'TODAY', parent: 27, desc: 'Returns the current date as a date value', return: 'Date', params: [] },
	{
		id: 272, name: 'LATEST', parent: 27, desc: 'Latest Date & Time', return: 'Date', params: [
			{ name: 'date', type: 'Date' },
		]
	},
	{
		id: 273, name: 'RELATIVE', parent: 27, desc: 'Returns the relative time since a given date/time. Ie: 5 hours ago', return: 'Text', params: [
			{ name: 'value', type: 'Date' },
			{ name: 'unit', type: 'String', values: ["seconds", "minutes", "hours", "days", "months", "years"] }
		]
	},
	{
		id: 274, name: 'EARLIEST', parent: 27, desc: 'Earliest Date & Time', return: 'Date', params: [
			{ name: 'date', type: 'Date' },
		]
	},
	{
		id: 275, name: 'VALUE', parent: 27, desc: 'Date to Number', return: 'Number', params: [
			{ name: 'text', type: 'String' },
		]
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////// Functions in Filter Category ////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Filter
	// { id: 310, name: 'FILTER', parent: 31, desc: 'Returns a filtered version of the source range, returning only rows or columns which meet the specified conditions', return: 'Array', params: [
	//   {name: 'range', type: 'Array'},
	//   {name: 'condition1', type: 'Array'},
	//   {name: 'condition2', type: 'Array'},
	// ]},

	// Sort
	// { id: 320, name: 'SORT', parent: 32, desc: 'Sort', return: 'Array', params: [
	//   {name: 'range', type: 'Array'},
	//   {name: 'sort column', type: 'Number'},
	//   {name: 'is ascending', type: 'Boolean'},
	// ]},
	// { id: 321, name: 'SORTN', parent: 32, desc: 'Sort N', return: 'Array', params: [
	//   {name: 'range', type: 'Array'},
	//   {name: 'n', type: 'Number'},
	//   {name: 'display ties mode', type: 'Number'},
	// ]},

	// Unique
	// { id: 330, name: 'UNIQUE', parent: 33, desc: 'Unique Rows', return: 'Array', params: [
	//   {name: 'range', type: 'Array'},
	// ]},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////// Functions in Info Category ////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Is
	{
		id: 410, name: 'ISBLANK', parent: 41, desc: 'Is Value Empty', return: 'Boolean', params: [
			{ name: 'value', type: 'All' },
		]
	},
	{
		id: 411, name: 'ISDATE', parent: 41, desc: 'Is Value a Date', return: 'Boolean', params: [
			{ name: 'value', type: 'All' },
		]
	},
	{
		id: 412, name: 'ISEMAIL', parent: 41, desc: 'Is Value an Email', return: 'Boolean', params: [
			{ name: 'value', type: 'All' },
		]
	},
	{
		id: 413, name: 'ISLOGICAL', parent: 41, desc: 'Is Value TRUE or FALSE', return: 'Boolean', params: [
			{ name: 'value', type: 'All' },
		]
	},
	{
		id: 414, name: 'ISNA', parent: 41, desc: 'Checks whether a value is the error `#N/A`', return: 'Boolean', params: [
			{ name: 'value', type: 'All' },
		]
	},
	{
		id: 415, name: 'ISNONTEXT', parent: 41, desc: 'Checks whether a value is non-textual', return: 'Boolean', params: [
			{ name: 'value', type: 'All' },
		]
	},
	{
		id: 416, name: 'ISNUMBER', parent: 41, desc: 'Checks whether a value is a number', return: 'Boolean', params: [
			{ name: 'value', type: 'All' },
		]
	},
	{
		id: 417, name: 'ISTEXT', parent: 41, desc: '', return: 'Boolean', params: [
			{ name: 'value', type: 'All' },
		]
	},
	{
		id: 418, name: 'ISEVEN', parent: 41, desc: 'Is Even', return: 'Boolean', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 419, name: 'ISODD', parent: 41, desc: 'Checks whether the provided value is odd', return: 'Boolean', params: [
			{ name: 'value', type: 'Number' },
		]
	},

	// Data
	{
		id: 420, name: 'TYPE', parent: 42, desc: 'Data Type', return: 'Number', params: [
			{ name: 'value', type: 'All' },
		]
	},
	{
		id: 421, name: 'FILESIZE', parent: 42, desc: 'Returns file size', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
			{ name: 'unit', type: 'String', values: ['Bit', 'Byte', 'Kilobyte', 'Megabyte', 'Gigabyte', 'Terabyte'] },
		]
	},
	{ id: 422, name: 'NA', parent: 42, desc: 'Return N/A', return: 'Text', params: [] },
	// { id: 423, name: 'SPARKLINE', parent: 42, desc: 'Miniature Chart', return: 'Sparklink', params: [
	//   {name: 'data', type: 'Array'},
	// ]},
	{
		id: 424, name: 'CELLVALUE', parent: 42, desc: 'Value of a specified cell', return: 'Text', params: [
			{ name: 'column', type: 'All' },
			{ name: 'row', type: 'Number' },
		]
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////// Functions in Logical Category ////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// if
	{
		id: 510, name: 'IF', parent: 51, desc: 'Returns value based on logic', return: 'Boolean', params: [
			{ name: 'logical expression', type: 'Boolean' },
		]
	},
	// { id: 511, name: 'IFS', parent: 51, desc: 'Evaluates multiple conditions', return: '', params: [
	//   {name: 'values', type: 'Array'},
	// ]},
	// { id: 512, name: 'SWITCH', parent: 51, desc: 'Switch', return: '', params: [
	//   {name: 'expression', type: 'Array'},
	//   {name: 'value', type: 'Number'},
	// ]},
	{
		id: 513, name: 'IFERROR', parent: 51, desc: 'If Error', return: '', params: [
			{ name: 'value', type: 'String' },
		]
	},
	{
		id: 514, name: 'IFNA', parent: 51, desc: 'If N/A', return: 'Text', params: [
			{ name: 'value', type: 'String' },
		]
	},

	// Operator
	{
		id: 520, name: 'AND', parent: 52, desc: 'If all the provided arguments are logically true, returns true, otherwise returns false', return: 'Boolean', params: [
			{ name: 'logical expression1', type: 'Boolean' },
			{ name: 'logical expression2', type: 'Boolean', optional: "true" }
		]
	},
	{
		id: 521, name: 'NOT', parent: 52, desc: 'Returns the opposite of a logical value - `NOT(TRUE)` returns `FALSE`; `NOT(FALSE)` returns `TRUE`', return: 'Boolean', params: [
			{ name: 'logical expression', type: 'Boolean' },
		]
	},
	{
		id: 522, name: 'OR', parent: 52, desc: 'Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false', return: 'Boolean', params: [
			{ name: 'logical expression1', type: 'Boolean' },
			{ name: 'logical expression2', type: 'Boolean', optional: "true" },
		]
	},
	{
		id: 523, name: 'XOR', parent: 52, desc: 'Xor Logical Operator', return: 'Boolean', params: [
			{ name: 'logical expression1', type: 'Boolean' },
			{ name: 'logical expression2', type: 'Boolean', optional: "true" },
		]
	},

	// Compare
	{
		id: 530, name: 'DELTA', parent: 53, desc: 'Compare 2 Numbers', return: 'Boolean', params: [
			{ name: 'number1', type: 'Number' },
			{ name: 'number2', type: 'Number' },
		]
	},
	{
		id: 531, name: 'EXACT', parent: 53, desc: 'Compate Two Strings', return: 'Boolean', params: [
			{ name: 'value1', type: 'All' },
			{ name: 'value2', type: 'All', },
		]
	},
	{
		id: 532, name: 'REGEXMATCH', parent: 53, desc: 'Matches Regular Expression?', return: 'Boolean', params: [
			{ name: 'text', type: 'String' },
			{ name: 'regular expression', type: 'String' },
		]
	},

	// Return
	{ id: 540, name: 'TRUE', parent: 54, desc: 'Returns the logical value `TRUE`', return: 'Boolean', params: [] },
	{ id: 541, name: 'FALSE', parent: 54, desc: 'Returns the logical value `FALSE`', return: 'Boolean', params: [] },
	{
		id: 542, name: 'DETECTLANGUAGE', parent: 54, desc: 'Identifies the language used in text within the specified range', return: 'Text', params: [
			{ name: 'text', type: 'String' },
		]
	},
	{
		id: 543, name: 'SIGN', parent: 54, desc: 'Negative Or Positive', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////// Functions in Lookup Category ////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Lookup
	// { id: 610, name: 'LOOKUP', parent: 61, desc: 'Lookup', return: '', params: [
	//   {name: 'search key', type: 'String'},
	//   {name: 'search range', type: 'Array'},
	//   {name: 'result range', type: 'Array'},
	// ]},
	// { id: 611, name: 'HLOOKUP', parent: 61, desc: 'Horizontal Lookup', return: '', params: [
	//   {name: 'search key', type: 'String'},
	//   {name: 'search range', type: 'Array'},
	//   {name: 'is sorted', type: 'Boolean'},
	// ]},
	{
		id: 612, name: 'VLOOKUP', parent: 61, desc: 'Vertical Lookup', return: 'Text', params: [
			{ name: 'search key', type: 'All' },
			{ name: 'search range', type: 'Array' },
			{ name: 'is sorted', type: 'Boolean', optional: "true" },
		]
	},
	// { id: 613, name: 'OFFSET', parent: 61, desc: 'Returns a range reference shifted a specified number of rows and columns from a starting cell reference', return: '', params: [
	//   {name: 'cell reference', type: 'Number'},
	//   {name: 'offset rows', type: 'Number'},
	//   {name: 'offset columns', type: 'Number'},
	//   {name: 'height', type: 'Number'},
	//   {name: 'width', type: 'Number'},
	// ]},

	// Return
	{
		id: 620, name: 'INDEX', parent: 62, desc: 'Content', return: 'Number', params: [
			{ name: 'reference', type: 'Array' },
			{ name: 'row', type: 'Number', default: 0, hideCol: true },
			{ name: 'column', type: 'Number', default: 0, hideCol: true },
		]
	},
	{
		id: 621, name: 'ROW', parent: 62, desc: 'Row', return: 'Number', params: [
			{ name: 'row reference', type: 'Number' },
		]
	},
	{
		id: 622, name: 'ROWS', parent: 62, desc: 'Number of Rows', return: 'Number', params: [
			{ name: 'range', type: 'Array' },
		]
	},
	{
		id: 623, name: 'MATCH', parent: 62, desc: 'Returns the relative position of an item in a range that matches a specified value', return: 'Number', params: [
			{ name: 'search key', type: 'String' },
			{ name: 'range', type: 'Array' },
			{ name: 'search type', type: 'Number', optional: "true" },
		]
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////// Functions in Math Category ////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Angle / Cosecant
	{
		id: 7100, name: 'CSC', parent: 710, desc: 'Returns the cosecant of an angle provided in radians', return: 'Number', params: [
			{ name: 'angle', type: 'Number' },
		]
	},
	{
		id: 7101, name: 'CSCH', parent: 710, desc: 'The CSCH function returns the hyperbolic cosecant of any real number', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},

	// Angle / Cosine
	{
		id: 7110, name: 'ACOS', parent: 711, desc: 'Inverse Cosine', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 7111, name: 'ACOSH', parent: 711, desc: 'Inverse Hyperbolic Cosine', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 7112, name: 'COS', parent: 711, desc: 'Cosine of An Angle', return: 'Number', params: [
			{ name: 'angle', type: 'Number' },
		]
	},
	{
		id: 7113, name: 'COSH', parent: 711, desc: 'Hyperbolic Cosine', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},

	// Angle / Cotangent
	{
		id: 7120, name: 'ACOT', parent: 712, desc: 'Inverse cotangent of a value, in radians', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 7121, name: 'ACOTH', parent: 712, desc: 'Inverse hyperbolic cotangent of a value, in radians. Must not be between -1 and 1, inclusive', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 7122, name: 'COT', parent: 712, desc: 'Cotangent of An Angle', return: 'Number', params: [
			{ name: 'angle', type: 'Number' },
		]
	},
	{
		id: 7123, name: 'COTH', parent: 712, desc: 'Hyperbolic Cotangent', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},

	// Angle / Secant
	{
		id: 7130, name: 'SEC', parent: 713, desc: 'The SEC function returns the secant of an angle, measured in radians', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 7131, name: 'SECH', parent: 713, desc: 'The SECH function returns the hyperbolic secant of an angle', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},

	// Angle / Sine
	{
		id: 7140, name: 'SIN', parent: 714, desc: 'Returns the sine of an angle provided in radians', return: 'Number', params: [
			{ name: 'angle', type: 'Number' },
		]
	},
	{
		id: 7141, name: 'SINH', parent: 714, desc: 'Returns the hyperbolic sine of any real number', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 7142, name: 'ASIN', parent: 714, desc: 'Inverse sine of a value, in radians', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 7143, name: 'ASINH', parent: 714, desc: 'Inverse hyperbolic sine of a number', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},

	// Angle / Tangent
	{
		id: 7150, name: 'TAN', parent: 715, desc: 'Returns the tangent of an angle provided in radians', return: 'Number', params: [
			{ name: 'angle', type: 'Number' },
		]
	},
	{
		id: 7151, name: 'TANH', parent: 715, desc: 'Returns the hyperbolic tangent of any real number', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 7152, name: 'ATAN', parent: 715, desc: 'Inverse tangent of a value, in radians', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 7153, name: 'ATAN2', parent: 715, desc: 'Angle between x-axis and line segment from origin (0,0) to a specified coordinate pair (`x`,`y`), in radians', return: 'Number', params: [
			{ name: 'x', type: 'Number' },
			{ name: 'y', type: 'Number' },
		]
	},
	{
		id: 7154, name: 'ATANH', parent: 715, desc: 'Inverse hyperbolic tangent of a number', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},

	// Map
	{
		id: 720, name: 'DISTANCE', parent: 72, desc: 'Returns the distance in selected unit between two locations', return: 'Number', params: [
			{ name: 'origin address', type: 'String', hideCol: true },
			{ name: 'destination address', type: 'String', hideCol: true },
			{ name: 'method', type: 'String', values: ['driving', 'walking', 'bicycling', 'ransit'] },
		]
	},
	{
		id: 721, name: 'DURATION', parent: 72, desc: 'Travel time between two points', return: 'Number', params: [
			{ name: 'origin address', type: 'String' },
			{ name: 'destination address', type: 'String' },
			{ name: 'travel mode', type: 'String', values: ['driving', 'walking', 'bicycling', 'ransit'] },
			{ name: 'unit', type: 'String', optional: "true", values: ['Minutes', 'Hours', 'Days'] },
		]
	},
	{
		id: 722, name: 'REVERSEGEOCODE', parent: 72, desc: 'REVERSEGEOCODE', return: 'Number', params: [
			{ name: 'latitude', type: 'String' },
			{ name: 'longitude', type: 'String' },
		]
	},

	// Odd/Even
	{
		id: 730, name: 'EVEN', parent: 73, desc: 'Rounds a number up to the nearest even integer', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 731, name: 'ISEVEN', parent: 73, desc: 'Checks whether the provided value is even', return: 'Boolean', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 732, name: 'ISODD', parent: 73, desc: 'Checks whether the provided value is odd', return: 'Boolean', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 733, name: 'ODD', parent: 73, desc: 'Round to Odd', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},

	// Operator
	{
		id: 740, name: 'AND', parent: 74, desc: 'If all the provided arguments are logically true, returns true, otherwise returns false', return: 'Boolean', params: [
			{ name: 'logical expression1', type: 'Boolean' },
			{ name: 'logical expression2', type: 'Boolean', optional: "true" }
		]
	},
	{
		id: 741, name: 'DIVIDE', parent: 74, desc: 'Returns one number divided by another. Equivalent to the `/` operator', return: 'Number', params: [
			{ name: 'dividend', type: 'Number' },
			{ name: 'divisor', type: 'Number' },
		]
	},
	{
		id: 742, name: 'POWER', parent: 74, desc: 'Returns a number raised to a power', return: 'Number', params: [
			{ name: 'base', type: 'Number' },
			{ name: 'exponent', type: 'Number' },
		]
	},
	{
		id: 743, name: 'PRODUCT', parent: 74, desc: 'Returns the numerical average value in a dataset, ignoring text', return: 'Number', params: [
			{ name: 'factor', type: 'Array' },
		]
	},
	{
		id: 744, name: 'QUOTIENT', parent: 74, desc: 'Returns one number divided by another', return: 'Number', params: [
			{ name: 'dividend', type: 'Number' },
			{ name: 'divisor', type: 'Number' },
		]
	},

	// Positive Square Root 
	{
		id: 750, name: 'SQRT', parent: 75, desc: 'Returns the positive square root of a positive number', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 751, name: 'SQRTPI', parent: 75, desc: 'Returns the positive square root of the product of Pi and the given positive number', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},

	// Random
	{ id: 760, name: 'RAND', parent: 76, desc: 'Returns a random number between 0 inclusive and 1 exclusive', return: 'Number', params: [] },
	// { id: 761, name: 'RANDARRAY', parent: 76, desc: 'Generates an array of random numbers between 0 and 1', return: 'Array', params: [
	//   {name: 'rows', type: 'Number'},
	//   {name: 'columns', type: 'Number'},
	// ]},
	{
		id: 762, name: 'RANDBETWEEN', parent: 76, desc: 'Returns a uniformly random integer between two values, inclusive', return: 'Number', params: [
			{ name: 'low', type: 'Number' },
			{ name: 'high', type: 'Number' },
		]
	},

	// Return
	{
		id: 770, name: 'ABS', parent: 77, desc: 'Absolute value of a number', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 771, name: 'BASE', parent: 77, desc: 'Convert a number into a text representation in another base', return: 'Text', params: [
			{ name: 'value', type: 'Number' },
			{ name: 'base', type: 'Number' },
			{ name: 'min length', type: 'Number', optional: "true" },
		]
	},
	{
		id: 772, name: 'EXP', parent: 77, desc: 'Returns Euler\'s number, e (~2.718) raised to a power', return: 'Number', params: [
			{ name: 'exponent', type: 'Number' },
		]
	},
	{
		id: 773, name: 'IMPOWER', parent: 77, desc: 'Returns a complex number raised to a power', return: 'Number', params: [
			{ name: 'complex base', type: 'String' },
			{ name: 'exponent', type: 'Number' },
		]
	},
	{
		id: 774, name: 'IMSQRT', parent: 77, desc: 'Computes the square root of a complex number', return: 'Number', params: [
			{ name: 'complex number', type: 'Number' },
		]
	},
	{
		id: 775, name: 'LCM', parent: 77, desc: 'Returns the least common multiple of one or more integers', return: 'Number', params: [
			{ name: 'value1', type: 'Number', variable: true },
		]
	},
	{
		id: 776, name: 'MOD', parent: 77, desc: 'Returns the result of the modulo operator, the remainder after a division operation', return: 'Number', params: [
			{ name: 'dividend', type: 'Number' },
			{ name: 'divisor', type: 'Number' },
		]
	},
	{
		id: 777, name: 'MUNIT', parent: 77, desc: 'Returns a unit matrix of size dimension x dimension', return: 'Number', params: [
			{ name: 'dimension', type: 'Number' },
		]
	},
	{ id: 778, name: 'PI', parent: 77, desc: 'Returns the value of Pi to 14 decimal places', return: 'Number', params: [] },
	{
		id: 779, name: 'SEQUENCE', parent: 77, desc: 'Returns an array of sequential numbers, such as 1, 2, 3, 4', return: 'Number', params: [
			{ name: 'rows', type: 'Number' },
			{ name: 'columns', type: 'Number' },
			{ name: 'start', type: 'Number' },
			{ name: 'step', type: 'Number' },
		]
	},

	// Round
	{
		id: 780, name: 'INT', parent: 78, desc: 'Rounds a number down to the nearest integer that is less than or equal to it', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
		]
	},
	{
		id: 781, name: 'MROUND', parent: 78, desc: 'Nearest Integer Multiple', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
			{ name: 'factor', type: 'Number' },
		]
	},
	{
		id: 782, name: 'ROUND', parent: 78, desc: 'Rounds a number to a certain number of decimal places according to standard rules', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
			{ name: 'places', type: 'Number', min: 0, max: 20, default: 0 },
		]
	},
	{
		id: 783, name: 'ROUNDDOWN', parent: 78, desc: 'Rounds a number to a certain number of decimal places, always rounding down to the next valid increment', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
			{ name: 'places', type: 'Number', min: 0, max: 20, default: 0 },
		]
	},
	{
		id: 784, name: 'ROUNDUP', parent: 78, desc: 'Rounds a number to a certain number of decimal places, always rounding up to the next valid increment', return: 'Number', params: [
			{ name: 'value', type: 'Number' },
			{ name: 'places', type: 'Number', min: 0, max: 20, default: 0 },
		]
	},

	// Sum
	{
		id: 790, name: 'SUM', parent: 79, desc: 'Returns the sum of a series of numbers and/or cells', return: 'Number', params: [
			{ name: 'value1', type: 'Number' },
			{ name: 'value2', type: 'Number', optional: "true" },
		]
	},
	{
		id: 791, name: 'SUMIF', parent: 79, desc: 'Returns a conditional sum across a range', return: 'Number', params: [
			{ name: 'range', type: 'Array' },
			{ name: 'criterion', type: 'All' },
			{ name: 'sum range', type: 'Array' },
		]
	},
	// { id: 792, name: 'SUMIFS', parent: 79, desc: 'Returns the sum of a range depending on multiple criteria', return: 'Number', params: [
	//   {name: 'sum range', type: 'Array'},
	//   {name: 'criteria range1', type: 'Array'},
	//   {name: 'criterion1', type: 'String'},
	// ]},
	{
		id: 793, name: 'SUMSQ', parent: 79, desc: 'Returns the sum of the squares of a series of numbers and/or cells', return: 'Number', params: [
			{ name: 'value', type: 'Array' },
		]
	},
	{
		id: 794, name: 'SUMX2MY2', parent: 79, desc: 'Calculates the sum of the differences of the squares of values in two arrays', return: 'Number', params: [
			{ name: 'array x', type: 'Array' },
			{ name: 'array y', type: 'Array' },
		]
	},
	{
		id: 795, name: 'SUMX2PY2', parent: 79, desc: 'Calculates the sum of the sums of the squares of values in two arrays', return: 'Number', params: [
			{ name: 'array x', type: 'Array' },
			{ name: 'array y', type: 'Array' },
		]
	},
	{
		id: 796, name: 'SUMXMY2', parent: 79, desc: 'Calculates the sum of the squares of differences of values in two arrays', return: 'Number', params: [
			{ name: 'array x', type: 'Array' },
			{ name: 'array y', type: 'Array' },
		]
	},
	{
		id: 797, name: 'MULTINOMIAL', parent: 79, desc: 'Returns the factorial of the sum of values divided by the product of the values\' factorials', return: 'Number', params: [
			{ name: 'value', type: 'Array', variable: true },
		]
	},
	{
		id: 798, name: 'SERIESSUM', parent: 79, desc: 'Given parameters x, n, m, and a, returns the power series sum', return: 'Number', params: [
			{ name: 'x', type: 'Number' },
			{ name: 'n', type: 'Number' },
			{ name: 'm', type: 'Number' },
			{ name: 'a', type: 'Number' },
		]
	},
	{
		id: 799, name: 'SUBTOTAL', parent: 79, desc: 'Returns a subtotal for a vertical range of cells using a specified aggregation function', return: 'Number', params: [
			{ name: 'function code', type: 'Number' },
			{ name: 'range1', type: 'Array' },
			{ name: 'range2', type: 'Array', optional: "true" },
		]
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////// Functions in Rollup Category ////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Average
	{
		id: 810, name: 'AVEDEV', parent: 81, desc: 'Calculates the average of the magnitudes of deviations of data from a dataset\'s mean', return: 'Number', params: [
			{ name: 'value1', type: 'Array', variable: true },
		]
	},
	{
		id: 811, name: 'AVERAGE', parent: 81, desc: 'Average', return: 'Number', params: [
			{ name: 'value', type: 'Number', variable: true },
		]
	},
	// { id: 812, name: 'AVERAGE.WEIGHTED', parent: 81, desc: 'Weighted Average', return: 'Number', params: [
	//   {name: 'values', type: 'Array'},
	//   {name: 'weights', type: 'Array'},
	// ]},
	{
		id: 813, name: 'AVERAGEA', parent: 81, desc: 'Average Value In Dataset', return: 'Number', params: [
			{ name: 'value1', type: 'Array' },
			{ name: 'value2', type: 'Array', optional: "true" },
		]
	},
	// { id: 814, name: 'AVERAGEIF', parent: 81, desc: 'Average, Single criteria', return: 'Number', params: [
	//   {name: 'criteria range', type: 'Array'},
	//   {name: 'criterion', type: 'String'},
	//   {name: 'average range', type: 'Array'},
	// ]},
	// { id: 815, name: 'AVERAGEIFS', parent: 81, desc: 'Average, Multiple criteria', return: 'Number', params: [
	//   {name: 'average range', type: 'Array'},
	//   {name: 'criteria range1', type: 'Array'},
	//   {name: 'criterion1', type: 'String'},
	// ]},

	// Count
	{
		id: 820, name: 'COUNTTRUE', parent: 82, desc: 'Count all TRUE values', return: 'Boolean', params: [
			{ name: 'array x', type: 'Array' },
		]
	},
	{
		id: 821, name: 'COUNTFALSE', parent: 82, desc: 'Count all FALSE values', return: 'Boolean', params: [
			{ name: 'array x', type: 'Array' },
		]
	},
	{
		id: 822, name: 'COUNTBLANK', parent: 82, desc: 'Count Empty Cells', return: 'Number', params: [
			{ name: 'range', type: 'Array' },
		]
	},
	{
		id: 823, name: 'COUNTIF', parent: 82, desc: 'Count, Single criteria', return: 'Number', params: [
			{ name: 'range', type: 'Array' },
			{ name: 'criterion', type: 'String' },
		]
	},
	// { id: 824, name: 'COUNTIFS', parent: 82, desc: 'Count, Multiple criteria', return: 'Number', params: [
	//   {name: 'criteria range', type: 'Array'},
	//   {name: 'criterion', type: 'String'},
	//   {name: 'average range', type: 'Array'},
	// ]},
	{
		id: 825, name: 'COUNTUNIQUE', parent: 82, desc: 'Number of Unique Values', return: 'Number', params: [
			{ name: 'value1', type: 'Array', variable: true },
		]
	},

	// Sum
	{
		id: 830, name: 'SUM', parent: 83, desc: 'Returns the sum of a series of numbers and/or cells', return: 'Number', params: [
			{ name: 'value1', type: 'Number' },
			{ name: 'value2', type: 'Number', optional: "true" },
		]
	},
	{
		id: 831, name: 'SUMIF', parent: 83, desc: 'Returns a conditional sum across a range', return: 'Number', params: [
			{ name: 'range', type: 'Array' },
			{ name: 'criterion', type: 'String' },
			{ name: 'sum range', type: 'Array' },
		]
	},
	// { id: 832, name: 'SUMIFS', parent: 83, desc: 'Returns the sum of a range depending on multiple criteria', return: 'Number', params: [
	//   {name: 'sum range', type: 'Array'},
	//   {name: 'criteria range1', type: 'Array'},
	//   {name: 'criterion1', type: 'String'},
	// ]},
	{
		id: 833, name: 'SUMSQ', parent: 83, desc: 'Returns the sum of the squares of a series of numbers and/or cells', return: 'Number', params: [
			{ name: 'value', type: 'Array' },
		]
	},
	{
		id: 834, name: 'SUMX2MY2', parent: 83, desc: 'Calculates the sum of the differences of the squares of values in two arrays', return: 'Number', params: [
			{ name: 'array x', type: 'Array' },
			{ name: 'array y', type: 'Array' },
		]
	},
	{
		id: 835, name: 'SUMX2PY2', parent: 83, desc: 'Calculates the sum of the sums of the squares of values in two arrays', return: 'Number', params: [
			{ name: 'array x', type: 'Array' },
			{ name: 'array y', type: 'Array' },
		]
	},
	{
		id: 836, name: 'SUMXMY2', parent: 83, desc: 'Calculates the sum of the squares of differences of values in two arrays', return: 'Number', params: [
			{ name: 'array x', type: 'Array' },
			{ name: 'array y', type: 'Array' },
		]
	},
	{
		id: 837, name: 'MULTINOMIAL', parent: 83, desc: 'Returns the factorial of the sum of values divided by the product of the values\' factorials', return: 'Number', params: [
			{ name: 'value', type: 'Array' },
		]
	},
	// { id: 838, name: 'SERIESSUM', parent: 83, desc: 'Given parameters x, n, m, and a, returns the power series sum', return: 'Number', params: [
	//   {name: 'x', type: 'Number'},
	//   {name: 'n', type: 'Number'},
	//   {name: 'm', type: 'Number'},
	//   {name: 'a', type: 'Array'},
	// ]},
	{
		id: 839, name: 'SUBTOTAL', parent: 83, desc: 'Returns a subtotal for a vertical range of cells using a specified aggregation function', return: 'Number', params: [
			{ name: 'function code', type: 'Number' },
			{ name: 'range1', type: 'Array' },
			{ name: 'range2', type: 'Array', optional: "true" },
		]
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////// Functions in Statistical Category //////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Average
	{
		id: 910, name: 'AVEDEV', parent: 91, desc: 'Calculates the average of the magnitudes of deviations of data from a dataset\'s mean', return: 'Number', params: [
			{ name: 'value1', type: 'Array' },
			{ name: 'value2', type: 'Array', optional: "true" },
		]
	},
	{
		id: 911, name: 'AVERAGE', parent: 91, desc: 'Average', return: 'Number', params: [
			{ name: 'value1', type: 'Array' },
			{ name: 'value2', type: 'Array', optional: "true" },
		]
	},
	// { id: 912, name: 'AVERAGE.WEIGHTED', parent: 91, desc: 'Weighted Average', return: 'Number', params: [
	//   {name: 'values', type: 'Array'},
	//   {name: 'weights', type: 'Array'},
	// ]},
	{
		id: 913, name: 'AVERAGEA', parent: 91, desc: 'Average Value In Dataset', return: 'Number', params: [
			{ name: 'value1', type: 'Array' },
			{ name: 'value2', type: 'Array', optional: "true" },
		]
	},
	// { id: 914, name: 'AVERAGEIF', parent: 91, desc: 'Average, Single criteria', return: 'Number', params: [
	//   {name: 'criteria range', type: 'Array'},
	//   {name: 'criterion', type: 'String'},
	//   {name: 'average range', type: 'Array'},
	// ]},
	// { id: 915, name: 'AVERAGEIFS', parent: 91, desc: 'Average, Multiple criteria', return: 'Number', params: [
	//   {name: 'average range', type: 'Array'},
	//   {name: 'criteria range1', type: 'Array'},
	//   {name: 'criterion1', type: 'String'},
	// ]},

	// Min 
	{
		id: 920, name: 'MIN', parent: 92, desc: 'Minimum value', return: 'Number', params: [
			{ name: 'value1', type: 'Array', variable: true },
		]
	},
	// { id: 921, name: 'MINIFS', parent: 92, desc: 'Minimum value with criteria', return: 'Number', params: [
	//   {name: 'range', type: 'Array'},
	//   {name: 'criteria range1', type: 'Array'},
	//   {name: 'criterion1', type: 'String'},
	// ]},

	// Max 
	{
		id: 930, name: 'MAX', parent: 93, desc: 'Maximum value in a numeric dataset', return: 'Number', params: [
			{ name: 'value1', type: 'Array', variable: true },
		]
	},
	// { id: 931, name: 'MAXIFS', parent: 93, desc: 'Maximum value with criteria', return: 'Number', params: [
	//   {name: 'range', type: 'Array'},
	//   {name: 'criteria range1', type: 'Array'},
	//   {name: 'criterion1', type: 'String'},
	// ]},

	// Value 
	{
		id: 940, name: 'MODE', parent: 94, desc: 'Most commonly occurring value', return: 'Number', params: [
			{ name: 'value1', type: 'Array', variable: true },
		]
	},
	{
		id: 941, name: 'MEDIAN', parent: 94, desc: 'Median value', return: 'Number', params: [
			{ name: 'value1', type: 'Array', variable: true },
		]
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////// Functions in Text Category /////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Case
	{
		id: 1010, name: 'LOWER', parent: 101, desc: 'Convert a specified string to lowercase', return: 'Text', params: [
			{ name: 'text', type: 'String' }
		]
	},
	{
		id: 1011, name: 'PROPER', parent: 101, desc: 'Capitalizes each word in a specified string', return: 'Text', params: [
			{ name: 'text', type: 'String' }
		]
	},
	{
		id: 1012, name: 'TRUECASE', parent: 101, desc: 'Truecasing is proper capitalization of words', return: 'Text', params: [
			{ name: 'text', type: 'String' }
		]
	},
	{
		id: 1013, name: 'UPPER', parent: 101, desc: 'Uppercase', return: 'Text', params: [
			{ name: 'text', type: 'String' }
		]
	},

	// Convert
	{
		id: 1020, name: 'CHAR', parent: 102, desc: 'Convert a number into a character according to the current Unicode table', return: 'Text', params: [
			{ name: 'table number', type: 'Number' },
		]
	},
	{
		id: 1021, name: 'CODE', parent: 102, desc: 'Returns the numeric Unicode map value of the first character in the string provided', return: 'Number', params: [
			{ name: 'string', type: 'String' },
		]
	},
	{
		id: 1022, name: 'ROMAN', parent: 102, desc: 'Formats a number in Roman numerals', return: 'Text', params: [
			{ name: 'number', type: 'Number' },
		]
	},
	{
		id: 1023, name: 'TEXT', parent: 102, desc: 'Convert a number into text according to a specified format', return: 'Text', params: [
			{ name: 'number', type: 'Number' },
			{ name: 'format', type: 'String' },
		]
	},

	// Info
	{
		id: 1030, name: 'LEN', parent: 103, desc: 'Returns the length of a string', return: 'Number', params: [
			{ name: 'text', type: 'String' },
		]
	},
	{
		id: 1031, name: 'WORDCOUNT', parent: 103, desc: 'Returns the amount of words or charachers in a string', return: 'Number', params: [
			{ name: 'value', type: 'String' },
		]
	},

	// Find
	{
		id: 1040, name: 'FIND', parent: 104, desc: 'Find', return: 'Number', params: [
			{ name: 'search for', type: 'String' },
			{ name: 'text to search', type: 'String' },
			{ name: 'starting at', type: 'Number', optional: "true", hideCol: true, default: 1, min: 1 },
		]
	},
	{
		id: 1041, name: 'SEARCH', parent: 104, desc: 'Search', return: 'Number', params: [
			{ name: 'search for', type: 'String' },
			{ name: 'text to search', type: 'String' },
			{ name: 'starting at', type: 'Number', optional: "true" },
		]
	},

	// Join
	{
		id: 1050, name: 'JOIN', parent: 105, desc: 'Join', return: 'Text', params: [
			{ name: 'delimiter', type: 'String' },
			{ name: 'value or array1', type: 'Array', variable: true },
		]
	},
	{
		id: 1051, name: 'TEXTJOIN', parent: 105, desc: 'Join Text', return: 'Text', params: [
			{ name: 'delimiter', type: 'String' },
			{ name: 'ignore empty', type: 'Boolean' },
			{ name: 'text1', type: 'Array', variable: true },
		]
	},
	{
		id: 1052, name: 'CONCATENATE', parent: 105, desc: 'Combine', return: 'Text', params: [
			{ name: 'string1', type: 'String', variable: true },
		]
	},

	// Replace
	{ id: 1060, name: 'TEMPLATE', parent: 106, desc: 'Template with variables', return: 'Text', params: [] },
	{
		id: 1061, name: 'REPLACE', parent: 106, desc: 'Replace', return: 'Text', params: [
			{ name: 'text', type: 'String' },
			{ name: 'position', type: 'Number', hideCol: true },
			{ name: 'length', type: 'Number', hideCol: true },
			{ name: 'new text', type: 'String' },
		]
	},
	{
		id: 1062, name: 'SUBSTITUTE', parent: 106, desc: 'Substitute', return: 'Text', params: [
			{ name: 'text to search', type: 'String' },
			{ name: 'search for', type: 'String' },
			{ name: 'replace with', type: 'String' },
			{ name: 'occurrence number', type: 'Number', optional: "true" },
		]
	},
	{
		id: 1063, name: 'REGEXEXTRACT', parent: 106, desc: 'Extract Regular Expression', return: 'Text', params: [
			{ name: 'text', type: 'String' },
			{ name: 'regular expression', type: 'String' },
		]
	},
	{
		id: 1064, name: 'REGEXREPLACE', parent: 106, desc: 'Replace Regular Expression', return: 'Text', params: [
			{ name: 'text', type: 'String' },
			{ name: 'regular expression', type: 'String' },
			{ name: 'replacement', type: 'String' },
		]
	},

	// Substring
	{
		id: 1070, name: 'LEFT', parent: 107, desc: 'Extract Left Part', return: 'Text', params: [
			{ name: 'string', type: 'String' },
			{ name: 'number of characters', type: 'Number', optional: "true", default: 5 },
		]
	},
	{
		id: 1071, name: 'MID', parent: 107, desc: 'String Sagment', return: 'Text', params: [
			{ name: 'string', type: 'String' },
			{ name: 'starting at', type: 'Number' },
			{ name: 'extract length', type: 'Number' },
		]
	},
	{
		id: 1072, name: 'RIGHT', parent: 107, desc: 'Extract Right Part', return: 'Text', params: [
			{ name: 'string', type: 'String' },
			{ name: 'number of characters', type: 'Number', optional: "true" },
		]
	},
	{
		id: 1073, name: 'SPLIT', parent: 107, desc: 'Divides text around a specified character or string, and puts each fragment into a separate cell in the row', return: 'Text', params: [
			{ name: 'text', type: 'String' },
			{ name: 'delimiter', type: 'String' },
			{ name: 'split by each', type: 'Boolean', default: true },
			{ name: 'remove empty text', type: 'Boolean', optional: "true", default: true },
		]
	},

	// Trim
	{
		id: 1080, name: 'CLEAN', parent: 108, desc: 'Returns the text with the non-printable ASCII characters removed', return: 'Text', params: [
			{ name: 'text', type: 'String' },
		]
	},
	{
		id: 1081, name: 'TRIM', parent: 108, desc: 'Removes leading and trailing spaces in a specified string', return: 'Text', params: [
			{ name: 'text', type: 'String' },
		]
	},
];