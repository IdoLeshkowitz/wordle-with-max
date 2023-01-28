import {useAppSelector} from "../redux/hooks";

const Modals= ()=>{
    const {activeModal} = useAppSelector(state =>state.overlays)
    if (!activeModal) return Sideba
}