function Homework(props) {

    return (
        <>
            <div className="row mb-3 mt-3">
                <div className="col-sm-1">
                    <div className="py-1">
                        {props.message.id}
                    </div>
                </div>
                <div className="col-sm-1">
                    <div className="py-1">
                        {props.message.user_id}
                    </div>
                </div>
            </div>
            <div className="row mb-3 mt-3">
                <div className="col-sm">
                    <div className="py-2">
                        {props.message.text}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homework;  