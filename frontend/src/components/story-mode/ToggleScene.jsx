export default function ToggleScene() {
    return (
        <div className="w-[25%] flex flex-col space-y-4 absolute right-[-220px] border border-white p-2 rounded-2xl">
            <div className="flex-1 rounded-xl overflow-hidden relative bg-[#424242] flex items-center justify-center p-2">
                <span className="text-white">Beginnings</span>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden relative bg-[#424242] flex items-center justify-center p-2">
                <span className="text-white">Temptations</span>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden relative bg-[#424242] flex items-center justify-center p-2">
                <span className="text-white">Consequences</span>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden relative bg-[#424242] flex items-center justify-center p-2">
                <span className="text-white">Redemption</span>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden relative bg-[#424242] flex items-center justify-center p-2">
                <span className="text-white">Legacy</span>
            </div>
        </div>)
}
