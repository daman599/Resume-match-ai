export default function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-3 gap-1 px-2">
            {[1, 2, 3, 4, 5, 6].map((ele) => (
                <div key={ele} className="bg-[#2f2f2fa7] max-w-max rounded-xl animate-pulse border-1 border-[#362e2e]">
                </div>
            ))}
        </div>
    );
}