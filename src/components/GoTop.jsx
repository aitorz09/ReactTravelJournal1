
const GoTop = () => {
    return (
        <button
            style={{
                position: "fixed",
                top: "92vh",
                right: "5vw",
                backgroundColor: "rgba(255,255,255,0.5)",
                zIndex: "10000"
            }}
            onClick={
                () => window.scrollTo(0, 0)
            }
        >
            Go Top
        </button>
    )
}

export default GoTop
