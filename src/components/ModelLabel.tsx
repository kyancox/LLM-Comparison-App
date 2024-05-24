import Image from "next/image"

interface ModelLabelProps {
    endpoint: string
    model: string
    selection: string
    setSelection: (value: string) => void
}

export default function ModelLabel({ endpoint, model, selection, setSelection }: ModelLabelProps) {

    return (
        <div
            className={`text-center p-4 border rounded cursor-pointer transition ${
                selection === endpoint ? "bg-blue-500 text-white " : "bg-white text-black"
            } hover:bg-blue-200`}
            onClick={() => {
                setSelection(endpoint)
                console.log(endpoint)
            }}
        >
            <Image src={`/${endpoint}-trans.png`} width={100} height={100} alt={`${endpoint} logo}`} />
            <div className="mt-2 font-medium ">{model}</div>
        </div>
    );
}