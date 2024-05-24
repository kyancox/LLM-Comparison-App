export default function Thanks() {

    return (
        <div className="mt-3 flex flex-col justify-center items-center space-y-2">
            <div className="border rounded shadow p-4">
                <p className="text-center mb-2">Thank you for voting!</p>
                <button 
                    onClick={() => window.location.href = '/votes'} 
                    className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                >
                    Check out other votes here
                </button>
            </div>
        </div>
    )
}