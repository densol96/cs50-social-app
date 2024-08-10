import { useSelector } from "react-redux"

function AppLayout() {

    const fullName = useSelector(state => state.auth.user.fullName);

    return (
        <div>
            HELLO, {fullName}!
        </div> 
    )
}

export default AppLayout
