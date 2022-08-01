import { XIcon } from "@heroicons/react/solid"

/**
 * This component is optional for this stage.(Not used)
 * @param param0 
 * @returns 
 */

export const OptionalParamRemoveButton = ({...rest}) => {
    return (
        <button {...rest}>
            <XIcon className="w-4 h-4 mt-1.5 mr-2 rounded-full p-0.5 bg-stone-700 hover:bg-stone-600 text-white" />
        </button>
    )
}