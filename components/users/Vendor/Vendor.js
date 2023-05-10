import VendorNavbar from "../../templates/VendorNav";

const Vendor = (props) => {

    return (
        <div>
            <VendorNavbar />
            <div className="container">
                <h1>Welcome to home page of {localStorage.getItem("shop")}</h1>
            </div>
        </div>

    );
};

export default Vendor;