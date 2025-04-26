import Style from "./Destinations.module.css"
import Abuja from "../../Assets/Abuja.jpg"
import AkwaIbom from "../../Assets/Akwa Ibom.jpg"
import CrossRivers from "../../Assets/Cross rivers.jpg"
import Kaduna from "../../Assets/Kaduna.jpg"
import Kano from "../../Assets/Kano.jpg"
import Lagos from "../../Assets/Lagos.jpg"
import Rivers from "../../Assets/Rivers State.jpg"
import Enugu from "../../Assets/Enugu_GRA_golf_estate.jpg"

const ShoppingGrid = () =>{
    return(
        <>
        <div className={Style.shopping}>
        <div className={Style.box}>
        <div className={Style.boximg}>
            <img src={Abuja} alt="Abuja" />
            </div>
            <p>ABUJA</p>
        </div>
        <div className={Style.box}>
        <div className={Style.boximg}>
            <img src={AkwaIbom} alt="Akwa Ibom" />
            </div>
            <p>AKWA IBOM</p>
        </div>
        <div className={Style.box}>
        <div className={Style.boximg}>
            <img src={CrossRivers} alt="Cross Rivers" />
            </div>
            <p>CROSS RIVERS</p>
        </div>
        <div className={Style.box}>
        <div className={Style.boximg}>
            <img src={Kaduna} alt="Kaduna" />
            </div>
            <p>KADUNA</p>
        </div>
        <div className={Style.box}>
        <div className={Style.boximg}>
            <img src={Kano} alt="Kano" />
            </div>
            <p>KANO</p>
        </div>
        <div className={Style.box}>
        <div className={Style.boximg}>
            <img src={Lagos} alt="Lagos" />
            </div>
            <p>LAGOS</p>
        </div>
        <div className={Style.box}>
        <div className={Style.boximg}>
            <img src={Rivers} alt="Rivers" />
            </div>
            <p>RIVERS</p>
        </div>
        <div className={Style.box}>
        <div className={Style.boximg}>
            <img src={Enugu} alt="Enugu" />
            </div>
            <p>ENUGU</p>
        </div>
        </div>
        </>
    )
}

export default ShoppingGrid;