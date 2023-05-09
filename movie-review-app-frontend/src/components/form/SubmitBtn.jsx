export default function SubmitBtn({children}) {
    return (
        <button type="submit" className="w-full p-1 text-secondary bg-white 
        rounded cursor-pointer transition hover:bg-opacity-90 font-semibold text-lg">
            {children}
        </button>
    )
}